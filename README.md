# SkillSwap+

SkillSwap+ is a skill-sharing platform where people can discover mentors, offer and request skills, exchange tokens, schedule learning sessions, and rate completed sessions.

The application is built with **Next.js, TypeScript, Supabase, TanStack Query, Zustand, Tailwind CSS, React Hook Form, Zod/Yup, and Lucide React**.

---

## ✨ Core Features

- 🔐 Authentication and protected routes
- 👤 User profiles with bio, avatar, role, and account status
- 🧠 Offer skills and request skills
- 🔎 Skill and mentor discovery
- ⭐ Mentor ratings and reviews
- 🤝 Swap request workflow
- 🪙 Token-based skill exchange
- 📅 Mentor availability management
- 🗓️ Session scheduling and My Bookings
- ▶️ Start and complete swap sessions
- 💳 Wallet and token transaction history
- 🖼️ Skill image uploads through Supabase Storage
- 🛡️ Admin dashboard and user management
- 📊 Admin skill and session management
- 📱 Responsive, polished UI

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 16.3.2**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React**
- **React Calendar**

### State & Data

- **TanStack Query v5** — server state, caching, mutations, invalidation
- **Zustand** — lightweight client-side discovery/filter state

### Forms & Validation

- **React Hook Form**
- **Zod / Yup**

### Backend

- **Supabase**
  - PostgreSQL
  - Supabase Auth
  - Row Level Security (RLS)
  - RPC functions
  - Supabase Storage

---

## 🏗️ High-Level Architecture

```text
┌──────────────────────────────────────────────┐
│                  SkillSwap+                  │
├──────────────────────────────────────────────┤
│                Next.js Frontend              │
│                                              │
│  Pages → Components → Hooks → Lib Functions  │
│                     │                        │
│             TanStack Query / Zustand         │
└─────────────────────┬────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────┐
│                  Supabase                    │
├──────────────────────────────────────────────┤
│ Auth │ PostgreSQL │ RLS │ RPC │ Storage      │
└──────────────────────────────────────────────┘
```

The frontend handles presentation and client state, while Supabase provides authentication, persistent data, secure database access, server-side business operations through RPCs, and image storage.

---

## 📁 Important Project Structure

A simplified structure:

```text
File Tree: skillswap
Generated on: 9/17/2026, 3:47:48 PM
Root path: d:\NextJs_Project\skillswap

────────────────────────────────────────────────────────────────────────────────

├── 📁 public/
│   ├── 📁 images/
│   │   ├── 🖼️ Collaborative-learning-environment.png
│   │   ├── 🖼️ HomePageHero.png
│   │   ├── 🖼️ Icon.svg
│   │   ├── 🖼️ community1.png
│   │   ├── 🖼️ community2.png
│   │   └── 🖼️ og-image.png
│   ├── 🖼️ file.svg
│   ├── 🖼️ globe.svg
│   ├── 🖼️ iconv1.svg
│   ├── 🖼️ iconv2.svg
│   ├── 🖼️ iconv3.svg
│   ├── 🖼️ image.png
│   ├── 🖼️ next.svg
│   ├── 🖼️ og-image.png
│   ├── 🖼️ vercel.svg
│   └── 🖼️ window.svg
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 (auth)/
│   │   │   ├── 📁 login/
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📁 signup/
│   │   │       └── 📄 page.tsx
│   │   ├── 📁 (user)/
│   │   │   ├── 📁 about/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 availability/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 bookings/
│   │   │   │   ├── 📁 [swapId]/
│   │   │   │   │   ├── 📄 BookingDateSelector.tsx
│   │   │   │   │   ├── 📄 BookingStepIndicator.tsx
│   │   │   │   │   ├── 📄 BookingSummary.tsx
│   │   │   │   │   ├── 📄 BookingTimeSelector.tsx
│   │   │   │   │   ├── 📄 SessionOptionCard.tsx
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 community/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 contact/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 dashboard/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 feature/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 help/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 how-it-works/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 mentors/
│   │   │   │   ├── 📁 [authUserId]/
│   │   │   │   │   ├── 📄 MentorProfileClient.tsx
│   │   │   │   │   ├── 📄 opengraph-image.tsx
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📄 MentorsClient.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 pricing/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 privacy/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 requests/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 sessions/
│   │   │   ├── 📁 skills/
│   │   │   │   ├── 📁 [skillName]/
│   │   │   │   │   ├── 📄 SkillDetailsClient.tsx
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 success-stories/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 swaps/
│   │   │   │   ├── 📁 [swapId]/
│   │   │   │   │   ├── 📁 session/
│   │   │   │   │   │   └── 📄 page.tsx
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 terms/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 wallet/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📄 layout.tsx
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 admin/
│   │   │   ├── 📁 dashboard/
│   │   │   │   ├── 📁 session-management/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 skill-management/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 user-management/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📄 layout.tsx
│   │   ├── 📁 api/
│   │   │   ├── 📁 livekit/
│   │   │   │   └── 📁 token/
│   │   │   │       └── 📄 route.ts
│   │   │   └── 📁 payments/
│   │   │       └── 📁 razorpay/
│   │   │           ├── 📁 create-order/
│   │   │           │   └── 📄 route.ts
│   │   │           ├── 📁 verify/
│   │   │           │   └── 📄 route.ts
│   │   │           └── 📁 webhook/
│   │   │               └── 📄 route.ts
│   │   ├── 📁 profile/
│   │   │   └── 📄 page.tsx
│   │   ├── 📄 error.tsx
│   │   ├── 📄 global-error.tsx
│   │   ├── 🎨 globals.css
│   │   ├── 📄 layout.tsx
│   │   ├── 📄 loading.tsx
│   │   ├── 📄 not-found.tsx
│   │   ├── 📄 provider.tsx
│   │   ├── 📄 robotics.ts
│   │   └── 📄 sitemap.ts
│   ├── 📁 components/
│   │   ├── 📁 admin/
│   │   │   ├── 📁 sessions/
│   │   │   │   ├── 📄 AdminSessionsSkeleton.tsx
│   │   │   │   ├── 📄 SessionDetailsModal.tsx
│   │   │   │   ├── 📄 SessionFilters.tsx
│   │   │   │   ├── 📄 SessionStats.tsx
│   │   │   │   └── 📄 SessionsTable.tsx
│   │   │   ├── 📄 AdminAddSkillModal.tsx
│   │   │   └── 📄 AdminUsersPage.tsx
│   │   ├── 📁 community&stories/
│   │   │   └── 📄 StorySection.tsx
│   │   ├── 📁 dashboard/
│   │   │   └── 📄 DashboardSessionCalendar.tsx
│   │   ├── 📁 lib/
│   │   │   └── 📄 confirmToast.tsx
│   │   ├── 📁 mentors/
│   │   │   ├── 📄 MentorCard.tsx
│   │   │   ├── 📄 MentorGridSkeleton.tsx
│   │   │   ├── 📄 MentorProfile.tsx
│   │   │   ├── 📄 SessionOptionsManager.tsx
│   │   │   └── 📄 SwapRequestModal.tsx
│   │   ├── 📁 notifications/
│   │   │   ├── 📄 NotificationBell.tsx
│   │   │   └── 📄 NotificationDropdown.tsx
│   │   ├── 📁 requests/
│   │   │   └── 📄 SwapRequestCard.tsx
│   │   ├── 📁 skills/
│   │   │   ├── 📄 FeaturedCurators.tsx
│   │   │   ├── 📄 LoadMoreButton.tsx
│   │   │   ├── 📄 RecommendedSkills.tsx
│   │   │   ├── 📄 SkillCard.tsx
│   │   │   ├── 📄 SkillDetails.tsx
│   │   │   ├── 📄 SkillFilter.tsx
│   │   │   ├── 📄 SkillGrid.tsx
│   │   │   └── 📄 SkillSearch.tsx
│   │   ├── 📁 swaps/
│   │   │   ├── 📄 RateMentorModal.tsx
│   │   │   ├── 📄 ReScheduleSessionForm.tsx
│   │   │   ├── 📄 ReScheduleSessionHeader.tsx
│   │   │   ├── 📄 ReScheduleSessionReview.tsx
│   │   │   ├── 📄 RescheduleSessionModal.tsx
│   │   │   ├── 📄 ScheduleSessionAvailability.tsx
│   │   │   ├── 📄 ScheduleSessionConfirmation.tsx
│   │   │   ├── 📄 ScheduleSessionHeader.tsx
│   │   │   ├── 📄 ScheduleSessionModal.tsx
│   │   │   ├── 📄 ScheduleSessionOptions.tsx
│   │   │   ├── 📄 ScheduleSessionUtils.tsx
│   │   │   ├── 📄 SwapCard.tsx
│   │   │   ├── 📄 SwapCardHeader.tsx
│   │   │   ├── 📄 SwapCardStatusContent.tsx
│   │   │   ├── 📄 SwapCardUser.tsx
│   │   │   └── 📄 rescheduleSessionUtils.ts
│   │   ├── 📁 ui/
│   │   │   ├── 📄 button.tsx
│   │   │   ├── 📄 magic-card.tsx
│   │   │   └── 📄 table.tsx
│   │   ├── 📁 wallet/
│   │   │   ├── 📄 RazorpayCheckout.tsx
│   │   │   ├── 📄 TokenBalanceCard.tsx
│   │   │   ├── 📄 TokenPackages.tsx
│   │   │   └── 📄 TokenTransactionHistory.tsx
│   │   ├── 📄 AddSkillModal.tsx
│   │   ├── 📄 EditProfileModal.tsx
│   │   ├── 📄 LoadingSkeleton.tsx
│   │   └── 📄 ProfileModal.tsx
│   ├── 📁 hooks/
│   │   ├── 📁 admin/
│   │   │   ├── 📄 useAdminAnalytics.ts
│   │   │   ├── 📄 useAdminPlatformStats.ts
│   │   │   ├── 📄 useAdminSessions.ts
│   │   │   ├── 📄 useAdminSkills.ts
│   │   │   ├── 📄 useAdminUsers.ts
│   │   │   ├── 📄 useCancelAdminSession.ts
│   │   │   ├── 📄 useCreateAdminSkill.ts
│   │   │   ├── 📄 useDeleteAdminSkill.ts
│   │   │   └── 📄 useToggleAdminUserStatus.ts
│   │   ├── 📁 mentors/
│   │   │   ├── 📄 useMentorAvailability.ts
│   │   │   └── 📄 useMentorAvailabilityForBooking.ts
│   │   ├── 📁 notifications/
│   │   │   ├── 📄 useNotificationRealtime.ts
│   │   │   └── 📄 useNotifications.ts
│   │   ├── 📁 payments/
│   │   │   ├── 📄 useCreateRazorpayOrder.ts
│   │   │   └── 📄 useVerifyRazorpayPayment.ts
│   │   ├── 📁 skills/
│   │   │   ├── 📄 useAcceptSwapRequest.ts
│   │   │   ├── 📄 useAddSkills.ts
│   │   │   ├── 📄 useAvailableSkills.ts
│   │   │   ├── 📄 useCancelSwapSession.ts
│   │   │   ├── 📄 useCompleteSwapSession.ts
│   │   │   ├── 📄 useConfirmScheduleSwap.ts
│   │   │   ├── 📄 useCreateSessionOption.ts
│   │   │   ├── 📄 useCreateSwapRating.ts
│   │   │   ├── 📄 useCreateSwapRequest.ts
│   │   │   ├── 📄 useDeactivateSessionOption.ts
│   │   │   ├── 📄 useMentorProfile.ts
│   │   │   ├── 📄 useMySessionOptions.ts
│   │   │   ├── 📄 useMySwap.ts
│   │   │   ├── 📄 useProposeSwapReschedule.ts
│   │   │   ├── 📄 useRemoveSkills.ts
│   │   │   ├── 📄 useRequestScheduleSwap.ts
│   │   │   ├── 📄 useRespondToReschedule.ts
│   │   │   ├── 📄 useScheduleSwapSession.ts
│   │   │   ├── 📄 useSessionOptions.ts
│   │   │   ├── 📄 useSkillDetails.ts
│   │   │   ├── 📄 useSkillDiscovery.ts
│   │   │   ├── 📄 useStartSwapSession.ts
│   │   │   ├── 📄 useSwapById.ts
│   │   │   ├── 📄 useSwapRating.ts
│   │   │   ├── 📄 useSwapRequests.ts
│   │   │   ├── 📄 useUpdateSessionOption.ts
│   │   │   ├── 📄 useUpdateSwapRating.ts
│   │   │   ├── 📄 useUpdateSwapRequest.ts
│   │   │   └── 📄 useUserSkills.ts
│   │   ├── 📁 wallet/
│   │   │   ├── 📄 useTokenBalance.ts
│   │   │   └── 📄 useTokenTransactions.ts
│   │   ├── 📄 use-current-profile.ts
│   │   ├── 📄 use-login.ts
│   │   ├── 📄 use-logout.ts
│   │   ├── 📄 use-signUp.ts
│   │   ├── 📄 use-user.ts
│   │   ├── 📄 useActiveAccountGuard.ts
│   │   └── 📄 useUpdateProfile.ts
│   ├── 📁 layout/
│   │   ├── 📁 adminLayout/
│   │   │   ├── 📄 Navbar.tsx
│   │   │   └── 📄 Sidebar.tsx
│   │   └── 📁 userLayout/
│   │       ├── 📄 Footer.tsx
│   │       └── 📄 Header.tsx
│   ├── 📁 lib/
│   │   ├── 📁 admin/
│   │   │   ├── 📄 adminSessions.ts
│   │   │   ├── 📄 adminSkills.ts
│   │   │   ├── 📄 adminStats.ts
│   │   │   ├── 📄 adminTypes.ts
│   │   │   ├── 📄 adminUsers.ts
│   │   │   ├── 📄 adminUtils.ts
│   │   │   └── 📄 index.ts
│   │   ├── 📁 notifications/
│   │   │   ├── 📄 createNotification.ts
│   │   │   └── 📄 notifications.ts
│   │   ├── 📁 payments/
│   │   │   └── 📄 razorpay.ts
│   │   ├── 📁 supabase/
│   │   │   ├── 📄 admin.ts
│   │   │   ├── 📄 client.ts
│   │   │   ├── 📄 middleware.ts
│   │   │   └── 📄 server.ts
│   │   ├── 📄 auth.ts
│   │   ├── 📄 bookingSchedule.ts
│   │   ├── 📄 mentorAvailability.ts
│   │   ├── 📄 mentorProfile.ts
│   │   ├── 📄 profile.ts
│   │   ├── 📄 sessionOptions.ts
│   │   ├── 📄 skillDetails.ts
│   │   ├── 📄 skills.ts
│   │   ├── 📄 swapRequests.ts
│   │   ├── 📄 uploadProfileImage.ts
│   │   ├── 📄 user.ts
│   │   ├── 📄 utils.ts
│   │   └── 📄 wallet.ts
│   ├── 📁 schemas/
│   │   ├── 📄 loginSchema.ts
│   │   └── 📄 signupSchema.ts
│   ├── 📁 services/
│   │   ├── 📁 helper/
│   │   ├── 📁 json/
│   │   └── 📁 validations/
│   ├── 📁 store/
│   │   ├── 📄 globalState.ts
│   │   ├── 📄 skillDiscovery.ts
│   │   └── 📄 userManagementStore.ts
│   ├── 📁 types/
│   │   ├── 📁 interfaces/
│   │   │   └── 📄 auth.interface.ts
│   │   └── 📁 types/
│   │       ├── 📄 skills.ts
│   │       └── 📄 swaps.ts
│   ├── 📁 utils/
│   └── 📄 proxy.ts
├── ⚙️ .gitignore
├── 📝 README.md
├── ⚙️ components.json
├── 📄 eslint.config.mjs
├── 📄 next.config.ts
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 postcss.config.mjs
└── ⚙️ tsconfig.json

────────────────────────────────────────────────────────────────────────────────
Generated by FileTree Pro Extension
```

---

# 🔐 Authentication & Account Protection

Authentication is handled by Supabase Auth.

The application connects the authenticated Supabase user to the application's profile through:

```text
auth.users.id
      │
      ▼
profiles.auth_user_id
```

The application uses `profiles.role` for authorization rather than relying on a custom role value inside the Auth user.

### Account protection

Inactive accounts are checked at multiple levels:

```text
Request
  │
  ▼
Next.js proxy
  │
  ├── Not authenticated → Login
  │
  ├── Admin route + non-admin → Home
  │
  └── Inactive profile → Sign out → Login
```

There is also a client-side active-account guard for authenticated user pages.

---

# 🛡️ Security Model

Security is intentionally split between frontend access control and database enforcement.

## Row Level Security

Important tables use Supabase RLS policies.

Examples include:

- Users can access their own profile
- Admins can access administrative profile data
- Users can manage their own skills
- Users can access their own token transactions
- Swap participants can access their own swaps and requests
- Mentors can manage their own availability
- Active mentor availability can be viewed by authenticated users

The database is treated as the final security boundary.

---

# ⚙️ RPC-Based Business Logic

Sensitive operations are implemented through PostgreSQL RPC functions instead of trusting the browser to perform multi-step business operations.

Important RPCs include:

```text
create_swap_request
accept_swap_request
update_swap_request_status

schedule_swap_session
start_swap_session
complete_swap_session

create_swap_rating

get_my_swap_requests
get_my_swaps
get_skill_discovery
get_mentor_profile

get_my_token_balance

get_admin_platform_stats
get_admin_users
toggle_admin_user_status
get_admin_skills
delete_admin_skill
get_admin_sessions
```

Security-sensitive RPCs are restricted to authenticated users and use server-side authorization checks.

---

# 🤝 Swap & Booking Flow

The main learning flow is:

```text
Learner
   │
   ▼
Discover Mentors
   │
   ▼
Select Skill
   │
   ▼
Request a Swap
   │
   ▼
Pending Request
   │
   ▼
Mentor Reviews Request
   │
   ├───────────────┐
   │               │
 Reject          Accept
   │               │
   ▼               ▼
Closed          Token Transfer
                   │
                   ▼
                Swap Created
                   │
                   ▼
              My Bookings
                   │
                   ▼
            Schedule Session
                   │
                   ▼
                Scheduled
                   │
                   ▼
              Start Session
                   │
                   ▼
             In Progress
                   │
                   ▼
            Complete Session
                   │
                   ▼
               Rating
```

### Important rule

A learner does **not** directly create a confirmed booking from the mentor profile.

The request must first be accepted by the mentor. The acceptance operation creates the swap and performs the token transfer atomically.

---

# 🪙 Token Economy

Tokens are used as the internal exchange currency.

When a mentor accepts a swap:

```text
Learner balance
      │
      │ token_rate
      ▼
   Deducted
      │
      ▼
Mentor balance
   Credited
```

The transaction is handled server-side by the acceptance RPC.

Token history is stored in:

```text
token_transactions
```

Supported transaction types:

```text
earned
spent
initial_balance
refund
adjustment
```

The wallet provides:

- Current token balance
- Recent token activity
- Earned tokens
- Spent tokens
- Transaction descriptions

---

# 📅 Mentor Availability & Scheduling

Mentors control when they are available.

Availability is stored in:

```text
mentor_availability
```

Each availability record contains:

- Mentor Auth User ID
- Day of week
- Start time
- End time
- Active/inactive state

The mentor manages availability, while learners use that availability when scheduling an accepted swap.

```text
Mentor
  │
  ▼
Set Availability
  │
  ▼
Learner views availability
  │
  ▼
Select date/time
  │
  ▼
Schedule accepted swap
```

---

# 🗓️ My Bookings

The `/bookings` page shows accepted/scheduled learning sessions.

The scheduling page is:

```text
/bookings/[swapId]
```

It allows a learner to:

1. Review the accepted swap
2. Select a session date
3. Select an available time
4. Confirm the session
5. Return to My Bookings

The existing `/swaps` page remains focused on swap lifecycle management.

---

# 📊 Dashboard

The dashboard combines the user's main activity:

- Token balance
- Learning sessions
- Teaching sessions
- Upcoming sessions
- Completed sessions
- Token transaction history
- Calendar view

The calendar distinguishes upcoming and completed sessions and lets the user select a date to view the relevant sessions.

---

# 🔎 Mentor & Skill Discovery

Skill discovery is powered by the secure `get_skill_discovery` RPC.

Search/filter state is maintained with Zustand:

```text
Search
Category
Skill Level
Rating
Sort
Pagination
```

TanStack Query handles the server request and caching.

The discovery result includes mentor information such as:

- Skill
- Category
- Proficiency
- Token rate
- Skill image
- Mentor name
- Mentor profile image
- Average rating
- Rating count

---

# 🖼️ Skill Images

Skill images are stored in the Supabase Storage bucket:

```text
skill-images
```

Images are organized by authenticated user:

```text
skill-images/
└── <auth-user-id>/
    └── <random-file-name>
```

The database stores the resulting public URL in:

```text
user_skills.image_url
```

Upload flow:

```text
Select image
    │
    ▼
Validate type + size
    │
    ▼
Upload to Supabase Storage
    │
    ▼
Generate public URL
    │
    ▼
Insert user_skills row
    │
    ▼
Display skill image
```

Current upload validation supports JPG, PNG, and WebP with a 5 MB limit.

---

# ⭐ Ratings

Ratings are created after a swap is completed.

The rating operation is protected server-side so that rating rules cannot simply be bypassed by modifying client-side code.

The mentor discovery system uses rating information to display:

```text
Average rating
Total ratings
```

A mentor without ratings is displayed as:

```text
New
```

---

# 👑 Admin Area

Administrators have access to a dedicated admin console.

Main sections:

```text
Admin Dashboard
├── User Management
├── Session Management
├── Skill Management
└── Reports
```

The admin dashboard provides platform-level information such as:

- Total users
- Total skills
- Total sessions
- Active mentors

Admin operations are protected through role checks and server-side authorization.

---

# 🎨 UI / UX

The application uses a polished, responsive visual system with:

- SkillSwap+ branding
- Gradient accents
- Glass/blur effects
- Responsive navigation
- Mobile hamburger menu
- Active navigation states
- Loading states
- Error states
- Not-found states
- Skeleton-style loading patterns
- Responsive dashboard layouts
- Branded admin sidebar
- Responsive calendars
- Skill and mentor image cards

The main navigation adapts between desktop and mobile layouts.

---

# 🚀 Getting Started

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment variables

Create:

```text
.env.local
```

Add the Supabase environment variables used by the application:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Use the project's existing environment configuration for any additional variables required by your deployment.

## 3. Start the development server

```bash
npm run dev
```

Then open the local Next.js development URL shown by the terminal.

---

# 🗄️ Database Concepts

The most important application tables are:

```text
profiles
    │
    ├── user_skills
    │
    ├── mentor_availability
    │
    └── ratings / mentor ratings

swap_requests
    │
    ▼
swaps
    │
    └── token_transactions
```

### `profiles`

Stores application-level user information.

Important fields include:

- `id`
- `auth_user_id`
- `name`
- `email`
- `profile_img`
- `role`
- `token_balance`
- `bio`
- `is_Active`

### `user_skills`

Stores skills users offer or want.

Important fields include:

- `user_id`
- `skill_name`
- `skill_type`
- `proficiency_level`
- `category`
- `description`
- `token_rate`
- `image_url`

### `swap_requests`

Represents the request/approval stage before a swap becomes an active booking.

### `swaps`

Represents the actual skill exchange/session lifecycle.

### `mentor_availability`

Stores recurring mentor availability.

### `token_transactions`

Provides an auditable history of token changes.

---

# 🧠 Important Development Concepts

## Authentication vs Authorization

Authentication answers:

> Who is this user?

Authorization answers:

> What is this user allowed to do?

Supabase Auth handles authentication. Application profile data, roles, RLS policies, and RPC checks handle authorization.

## `auth_user_id` vs `profiles.id`

These are different identifiers.

```text
auth.users.id
      │
      ▼
profiles.auth_user_id

profiles.id
      │
      ▼
user_skills.user_id
```

Do not assume they are interchangeable.

## RLS

Row Level Security determines which database rows a user is allowed to access.

Frontend checks are useful for UX, but RLS and secure RPCs are the real protection.

## SECURITY DEFINER

Some RPC functions execute with controlled elevated database privileges.

These functions must explicitly verify the authenticated user's permissions and use a safe search path.

## TanStack Query

TanStack Query is responsible for server state:

```text
fetch
cache
loading
error
mutation
invalidation
refetch
```

## Zustand

Zustand is used for lightweight client-side state such as discovery filters.

---

# 🔧 Important Frontend Functions

### Authentication

```text
getCurrentUser()
getCurrentProfile()
updateProfile()
```

### Skills

```text
addSkill()
getUserSkills()
deleteSkill()
getSkillDiscovery()
```

### Swaps

```text
createSwapRequest()
getMySwapRequests()
updateSwapRequestStatus()
acceptSwapRequest()
getMySwaps()
scheduleSwapSession()
startSwapSession()
completeSwapSession()
createSwapRating()
```

### Wallet

```text
getMyTokenBalance()
getMyTokenTransactions()
```

### Availability

```text
getMyAvailability()
createAvailability()
updateAvailability()
updateAvailabilityStatus()
deleteAvailability()
getMentorAvailability()
```

---

# 🧩 Important Hooks

Examples include:

```text
useCurrentProfile()
useActiveAccountGuard()

useSkillDiscovery()

useMentorAvailability()
useMentorAvailabilityForBooking()

useMySwapRequests()
useMySwaps()

useTokenBalance()
useTokenTransactions()
```

The hooks generally connect UI components to the underlying Supabase/lib functions through TanStack Query.

---

# 🔒 Security Mental Model

When adding a new feature, follow this order:

```text
1. Define the business rule
          ↓
2. Define who can perform it
          ↓
3. Define which rows they can access
          ↓
4. Add RLS / RPC authorization
          ↓
5. Add frontend hook
          ↓
6. Add UI
          ↓
7. Test authorized + unauthorized cases
```

Never rely only on hiding a button.

For example:

```text
❌ "Only mentors see the Accept button."

Better:

✅ UI hides the button
       +
✅ RPC verifies the authenticated mentor
       +
✅ Database policies protect the data
```

---

# ⚠️ Production Safeguards Still Planned

The current booking implementation works, but some production-hardening work is intentionally deferred.

Potential future safeguards include:

- Preventing two learners from booking the same mentor/time
- Server-side validation that the selected time is still available
- Verifying the scheduled time is in the future
- Verifying the swap is accepted before scheduling
- Restricting scheduling to the learner
- Detecting overlapping mentor sessions
- Adding a database-level uniqueness strategy for scheduled sessions
- Formal timezone handling for mentor availability and scheduled sessions

These should be implemented server-side rather than relying on browser validation.

---

# 🧪 Suggested Testing Checklist

Before considering a major feature complete, test:

### Authentication

- [ ] Signup
- [ ] Login
- [ ] Logout
- [ ] Deactivated account
- [ ] Admin login
- [ ] Non-admin access to admin route

### Skills

- [ ] Add offered skill
- [ ] Add wanted skill
- [ ] Upload valid image
- [ ] Reject invalid image
- [ ] Remove skill
- [ ] Discover skill

### Swap

- [ ] Create request
- [ ] Mentor accepts
- [ ] Mentor rejects
- [ ] Token deduction
- [ ] Token credit
- [ ] Swap creation

### Booking

- [ ] View accepted swap
- [ ] View mentor availability
- [ ] Select date
- [ ] Select time
- [ ] Schedule session
- [ ] View booking
- [ ] Start session
- [ ] Complete session
- [ ] Rate completed session

### Wallet

- [ ] Balance displays correctly
- [ ] Transaction history displays
- [ ] Earned tokens appear
- [ ] Spent tokens appear

### Admin

- [ ] Admin dashboard
- [ ] User management
- [ ] Activate/deactivate user
- [ ] Skill management
- [ ] Session management

---

# 📌 Main User Journey

The intended end-to-end experience is:

```text
Sign Up
   ↓
Create Profile
   ↓
Add Skills
   ↓
Discover Mentors
   ↓
Choose a Skill
   ↓
Request Swap
   ↓
Mentor Accepts
   ↓
Tokens Transfer
   ↓
Swap Created
   ↓
My Bookings
   ↓
Choose Available Time
   ↓
Schedule Session
   ↓
Start Session
   ↓
Complete Session
   ↓
Leave Rating
   ↓
Continue Learning
```

---

# 📚 Project Documentation

A more detailed development summary covering the database architecture, security model, RPCs, frontend logic, flows, business rules, and deferred production safeguards is maintained separately as:

**SkillSwap+ Complete Development Summary**

---

## 👨‍💻 Development Philosophy

SkillSwap+ is being developed incrementally:

```text
Small change
    ↓
Test
    ↓
Verify
    ↓
Keep working functionality intact
    ↓
Move to next feature
```

The goal is to keep the application secure, maintainable, responsive, and easy to extend without unnecessarily rewriting working functionality.

---

## 📄 License

Add the project's chosen license here before public distribution.
