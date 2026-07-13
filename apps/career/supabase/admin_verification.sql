-- Add verified status to employer profiles
ALTER TABLE public.employer_profiles ADD COLUMN IF NOT EXISTS is_verified boolean NOT NULL DEFAULT false;

-- Add index to speed up filtering on verification status
CREATE INDEX IF NOT EXISTS employer_profiles_is_verified_idx ON public.employer_profiles (is_verified);
