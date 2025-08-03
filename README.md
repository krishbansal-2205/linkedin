# Mini LinkedIn Platform

A professional networking platform, similar to LinkedIn, built with a modern technology stack. This project features user authentication, a post feed, user profiles, and a complete UI overhaul for a polished, professional look and feel.

## Tech Stack

This project is built with the following technologies:

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **API Communication**: [Axios](https://axios-http.com/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Email**: [Resend](https://resend.com/) & [React Email](https://react.email/)
- **Linting/Formatting**: ESLint

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community). You can use a local installation or a cloud service like MongoDB Atlas.

### Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/linkedin-clone.git
   cd linkedin-clone
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a file named `.env.local` in the root of the project and add the following variables. Replace the placeholder values with your actual credentials.

   ```env
   # MongoDB Connection String
   MONGODB_URI=your_mongodb_connection_string

   # NextAuth.js Configuration
   # Generate a secret using: openssl rand -base64 32
   NEXTAUTH_SECRET=your_nextauth_secret

   # Resend API Key (for sending verification emails)
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
