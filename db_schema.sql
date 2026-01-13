-- Create Tools Table
create table tools (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    tag_line text,
    description text,
    category text,
    -- 'writing', 'slides', 'design', 'productivity', 'coding', 'research'
    url text,
    icon_name text,
    -- String to identify which icon to render on frontend
    has_free_tier boolean default true,
    content jsonb -- For bilingual support: { "en": {...}, "ar": {...} }
);
-- Create Prompts Table
create table prompts (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    category text,
    -- 'study', 'writing', 'coding', 'design', 'slides', 'productivity', 'research'
    content jsonb -- { "en": { "title": "...", "text": "...", "tag": "..." }, "ar": { ... } }
);
-- Enable Row Level Security
alter table tools enable row level security;
alter table prompts enable row level security;
-- Policies for Tools
create policy "Public tools are viewable by everyone." on tools for
select using (true);
create policy "Admins can insert tools." on tools for
insert with check (auth.role() = 'authenticated');
create policy "Admins can update tools." on tools for
update using (auth.role() = 'authenticated');
create policy "Admins can delete tools." on tools for delete using (auth.role() = 'authenticated');
-- Policies for Prompts
create policy "Public prompts are viewable by everyone." on prompts for
select using (true);
create policy "Admins can insert prompts." on prompts for
insert with check (auth.role() = 'authenticated');
create policy "Admins can update prompts." on prompts for
update using (auth.role() = 'authenticated');
create policy "Admins can delete prompts." on prompts for delete using (auth.role() = 'authenticated');