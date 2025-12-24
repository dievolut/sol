-- Create the participants table
-- Note: Re-run this if you are starting fresh, or alter existing table
drop table if exists public.participants;

create table public.participants (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  phone text not null unique,
  email text,
  referral_id text default ('GIFT-' || substr(md5(random()::text), 1, 6)) unique,
  referred_by text,
  points integer default 0
);

-- Enable Row Level Security (RLS)
alter table public.participants enable row level security;

-- Create policies (modify as needed for security)
create policy "Allow public insert"
  on public.participants for insert
  with check (true);

create policy "Allow public read"
  on public.participants for select
  using (true);

-- Create policy for update (e.g. updating points)
create policy "Allow public update"
  on public.participants for update
  using (true);
