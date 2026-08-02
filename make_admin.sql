-- Run this to make all current users admins (for testing)
UPDATE public.profiles
SET role = 'admin';
