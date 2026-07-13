-- Phase 6: Razorpay Payments Database
-- Run this in the Supabase SQL Editor

-- ============================================================
-- PAYMENTS TABLE
-- ============================================================

create table if not exists public.payments (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  amount              integer not null, -- amount in smallest currency unit (e.g. paise)
  currency            text not null default 'INR',
  status              text not null default 'created'
                        check (status in ('created', 'authorized', 'captured', 'refunded', 'failed')),
  razorpay_order_id   text unique,
  razorpay_payment_id text unique,
  razorpay_signature  text,
  metadata            jsonb default '{}'::jsonb,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Auto-update updated_at
drop trigger if exists payments_updated_at on public.payments;
create trigger payments_updated_at
  before update on public.payments
  for each row execute function public.touch_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.payments enable row level security;

-- Users can read their own payments
drop policy if exists "Users can read own payments" on public.payments;
create policy "Users can read own payments"
  on public.payments for select
  using (auth.uid() = user_id);

-- Only service role can insert / update (via webhooks or backend APIs)

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists payments_user_id_idx on public.payments (user_id);
create index if not exists payments_order_id_idx on public.payments (razorpay_order_id);
create index if not exists payments_payment_id_idx on public.payments (razorpay_payment_id);
