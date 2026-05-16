-- BforC Careers initial backend schema.
-- Run this in the Supabase SQL editor when you are ready to connect the app.

create extension if not exists "pgcrypto";

create table if not exists public.employer_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  company_name text not null,
  slug text unique not null,
  sector text not null default 'Social Impact',
  location text not null default 'India',
  description text,
  logo_url text,
  women_friendly_rating numeric(2, 1) not null default 0,
  women_friendly boolean not null default false,
  open_roles integer not null default 0,
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid references public.employer_profiles(id) on delete set null,
  company_name text not null,
  title text not null,
  description text,
  location text not null default 'Remote',
  is_remote boolean not null default false,
  salary_min integer not null default 0,
  salary_max integer not null default 0,
  job_type text not null default 'Full-time'
    check (job_type in ('Full-time', 'Part-time', 'Contract', 'Volunteer')),
  tags text[] not null default '{}',
  women_friendly boolean not null default false,
  status text not null default 'active'
    check (status in ('draft', 'active', 'paused', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.seeker_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text not null,
  title text,
  location text,
  phone text,
  linkedin_url text,
  website_url text,
  skills text[] not null default '{}',
  experience_summary text,
  education_summary text,
  resume_url text,
  profile_strength integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.saved_jobs (
  seeker_id uuid not null references public.seeker_profiles(id) on delete cascade,
  job_id uuid not null references public.jobs(id) on delete cascade,
  saved_at timestamptz not null default now(),
  primary key (seeker_id, job_id)
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  seeker_id uuid not null references public.seeker_profiles(id) on delete cascade,
  status text not null default 'submitted'
    check (status in ('submitted', 'reviewing', 'shortlisted', 'rejected', 'withdrawn')),
  cover_note text,
  applied_at timestamptz not null default now(),
  unique (job_id, seeker_id)
);

alter table public.employer_profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.seeker_profiles enable row level security;
alter table public.saved_jobs enable row level security;
alter table public.applications enable row level security;

create policy "Public can read verified employer profiles"
  on public.employer_profiles
  for select
  using (is_verified = true);

create policy "Public can read active jobs"
  on public.jobs
  for select
  using (status = 'active');

create policy "Employers can manage their own profile"
  on public.employer_profiles
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Employers can manage their jobs"
  on public.jobs
  for all
  using (
    exists (
      select 1
      from public.employer_profiles
      where employer_profiles.id = jobs.employer_id
        and employer_profiles.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.employer_profiles
      where employer_profiles.id = jobs.employer_id
        and employer_profiles.user_id = auth.uid()
    )
  );

create policy "Seekers can manage their own profile"
  on public.seeker_profiles
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Seekers can manage their saved jobs"
  on public.saved_jobs
  for all
  using (
    exists (
      select 1
      from public.seeker_profiles
      where seeker_profiles.id = saved_jobs.seeker_id
        and seeker_profiles.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.seeker_profiles
      where seeker_profiles.id = saved_jobs.seeker_id
        and seeker_profiles.user_id = auth.uid()
    )
  );

create policy "Seekers can manage their applications"
  on public.applications
  for all
  using (
    exists (
      select 1
      from public.seeker_profiles
      where seeker_profiles.id = applications.seeker_id
        and seeker_profiles.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.seeker_profiles
      where seeker_profiles.id = applications.seeker_id
        and seeker_profiles.user_id = auth.uid()
    )
  );

create index if not exists jobs_status_created_at_idx
  on public.jobs (status, created_at desc);

create index if not exists jobs_search_idx
  on public.jobs using gin (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(company_name, '') || ' ' || coalesce(description, ''))
  );

create index if not exists employer_profiles_slug_idx
  on public.employer_profiles (slug);
