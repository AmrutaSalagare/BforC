-- Add verification_requested_at to employer profiles
ALTER TABLE public.employer_profiles ADD COLUMN IF NOT EXISTS verification_requested_at timestamptz DEFAULT NULL;

-- Add index to speed up admin sorting for verification requests
CREATE INDEX IF NOT EXISTS employer_profiles_verification_requested_at_idx ON public.employer_profiles (verification_requested_at);
