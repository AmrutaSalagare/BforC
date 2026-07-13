-- Phase 2: Subscriptions Database & Enforcement
-- Run this in the Supabase SQL Editor

-- ============================================================
-- SUBSCRIPTION TIERS (source of truth for limits)
-- ============================================================

-- Seeker tiers
-- free:    10 applications / year
-- starter: 50 applications / year
-- premium: 100 applications / year

-- Employer tiers (future Razorpay integration)
-- free:       3 active job postings
-- growth:    15 active job postings
-- enterprise: unlimited active job postings

-- ============================================================
-- SUBSCRIPTIONS TABLE
-- ============================================================

create table if not exists public.subscriptions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null unique references auth.users(id) on delete cascade,
  role            text not null check (role in ('seeker', 'employer')),
  tier            text not null default 'free',
  status          text not null default 'active'
                    check (status in ('active', 'cancelled', 'expired', 'past_due')),
  -- Quota tracking (reset annually at period_end)
  applications_used   integer not null default 0,  -- seekers: applications submitted this period
  jobs_posted_used    integer not null default 0,  -- employers: active job slots used (computed)
  -- Billing period
  period_start    timestamptz not null default now(),
  period_end      timestamptz not null default (now() + interval '1 year'),
  -- Razorpay integration (wired up in Phase 6)
  razorpay_subscription_id  text,
  razorpay_customer_id      text,
  -- Audit
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists subscriptions_updated_at on public.subscriptions;
create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.touch_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.subscriptions enable row level security;

-- Users can read their own subscription
drop policy if exists "Users can read own subscription" on public.subscriptions;
create policy "Users can read own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Only service role (or future admin) can insert / update
-- (subscriptions are managed server-side, never by the client)

-- ============================================================
-- AUTO-CREATE FREE SUBSCRIPTION ON SIGNUP
-- This trigger fires when a new user is confirmed in auth.users.
-- ============================================================

create or replace function public.create_default_subscription()
returns trigger language plpgsql security definer
set search_path = public
as $$
declare
  v_role text;
begin
  -- Read role from user_metadata
  v_role := coalesce(new.raw_user_meta_data->>'role', 'seeker');

  insert into public.subscriptions (user_id, role, tier, status)
  values (new.id, v_role, 'free', 'active')
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_subscription on auth.users;
create trigger on_auth_user_created_subscription
  after insert on auth.users
  for each row execute function public.create_default_subscription();

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists subscriptions_user_id_idx on public.subscriptions (user_id);
create index if not exists subscriptions_status_tier_idx on public.subscriptions (status, tier);
