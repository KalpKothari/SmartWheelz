# SmartWheelz

**SmartWheelz** is a full-stack web application designed to enhance the car-buying and selling experience using AI-powered search, smart filtering, and seamless user interactions. The platform leverages Next.js 15, React 19, Tailwind CSS, Supabase, Prisma, Google Gemini API, Clerk Authentication, and Arcjet to deliver a high-performance, feature-rich marketplace.

### Key Features & Functionalities:-

### Secure Authentication & User Management
- **Clerk Authentication** for secure sign-ups/logins.

- Role-based access for **users, sellers, and admins**.

### AI-Powered Car Search & Discovery
- **AI Image Search**: Users can **upload an image of any car**, and the system finds **visually similar vehicles** in the marketplace using **Gemini API**.

- **Advanced Text Search & Filters**: Cars can be filtered by **make, model, price range, body type, fuel type, and transmission**.

### Car Listings with Detailed Information
- Each car listing includes **high-quality images, specifications, an EMI calculator**, and dealership details.

- Users can **save favorite cars** for later access.

### Test Drive Booking System
- Users can **book test drives** with **real-time availability slots**.

- Automated **booking confirmations** with an option to **cancel or reschedule** test drives.

### AI-Powered Car Detail Extraction
- **AI automatically extracts car specifications** (make, model, year, fuel type, transmission) from **uploaded images**.

- Saves time by eliminating **manual data entry** for car sellers.

### Admin Dashboard & Car Inventory Management
- **Powerful analytics** showing **conversion rates, test drives booked, and cars sold**.

- Admins can:

  - Manage **car inventory** (add, edit, delete listings).

  - Feature cars on the homepage.

  - Manage **test drive schedules** and **working hours**.

  - Assign or revoke **admin access** for other users.
 
### Shareable Search Results & URLs
- **Users can copy and share filtered search results** with others using URL parameters.
  
- This follows modern marketplace best practices.




## Tech Stack Breakdown

| Category          | Technology Used                | Purpose                                          |
|------------------|--------------------------------|--------------------------------------------------|
| **Frontend**      | React 19 + Next.js 15         | UI, Routing, Server-Side Rendering (SSR)        |
| **UI Framework**  | ShadCN UI + Tailwind CSS      | Responsive, modern design                        |
| **Backend**       | Next.js API Routes           | Handles business logic & API requests           |
| **Database**      | Supabase (PostgreSQL)        | Stores users, car listings, and transactions    |
| **ORM**          | Prisma ORM                    | Database management & query optimization        |
| **AI & APIs**    | Google Gemini API + Arcjet    | AI image recognition & data processing          |
| **Authentication** | Clerk Authentication        | Secure user authentication & authorization      |
| **Hosting**       | Vercel                        | Cloud-based deployment                          |
| **Payments (Optional)** | Stripe / Razorpay      | Secure transactions                            |



