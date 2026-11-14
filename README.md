# InterviewPrep

A dark, responsive interview-practice dashboard inspired by the supplied screenshots.

## Run

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Included flows

- Dashboard with sessions, average score, answers and streak cards
- Interview setup for job title, stack, level and question count
- 20-question practice session with previous/next navigation
- Browser text-to-speech for reading questions
- Local session scoring and persistence using localStorage
- Progress/history page
- Topic browser
- Notes page with local persistence
- Supabase email/password sign-up and sign-in
- Responsive sidebar and mobile layout

## Authentication setup

Create a Supabase project, then add its project URL and anon/public key to
`interviewprep-site/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

In Supabase Authentication settings, enable email sign-ups and add
`http://localhost:3000/auth/callback` to the allowed redirect URLs. Signed-out
visitors are sent to `/login`; a successful sign-in opens the dashboard.
