-- ============================================================
-- Karmicup — MVP Schema
-- Paste this into the Supabase SQL editor and run it.
-- ============================================================

-- user_info: extends Supabase auth.users with app-level data
create table user_info (
  id         uuid primary key references auth.users(id) on delete cascade,
  name       text        not null,
  email      text        not null,
  points     integer     not null default 0,
  created_at timestamptz not null default now()
);

-- reddit_accounts: Reddit accounts connected by a user
create table reddit_accounts (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid        not null references user_info(id) on delete cascade,
  username        text        not null,
  reddit_user_id  text        not null unique,
  created_at      timestamptz not null default now()
);

-- user_submissions: Reddit posts/comments submitted for community engagement
create table user_submissions (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid        not null references user_info(id) on delete cascade,
  reddit_account_id  uuid        references reddit_accounts(id) on delete set null,
  type               text        not null check (type in ('post', 'comment')),
  subreddit          text        not null,
  title              text        not null,
  reddit_url         text        not null,
  context            text,
  upvotes_received   integer     not null default 0,
  comments_received  integer     not null default 0,
  status             text        not null default 'active' check (status in ('active', 'completed')),
  created_at         timestamptz not null default now()
);

-- Indexes for common queries
create index on reddit_accounts (user_id);
create index on user_submissions (user_id);
create index on user_submissions (status);
