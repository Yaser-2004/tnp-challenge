DTU Training & Placement Data Sharing Platform
A secure Next.js application for the DTU Training & Placement Department that enables controlled sharing of student data via unique, shareable links. Built as part of the Development Team Recruitment Challenge 2025.
🚀 Features
Admin Panel

Secure Authentication: Protected login system with JWT token management
Share Link Generation: Generate cryptographically signed tokens for data access
One-Click Copying: Easy link sharing with clipboard integration
Auto Token Refresh: Seamless session management

Public Share Page

No Login Required: Direct access via shareable links
Data Visualization: Clean, responsive table view of student data
Email Filtering: Real-time search functionality by email
Statistics Overview: Quick insights with student counts and averages
Mobile Responsive: Optimized for all device sizes

🛠️ Tech Stack

Framework: Next.js 14 with App Router
Language: TypeScript
Styling: Tailwind CSS
HTTP Client: Axios
Form Handling: React Hook Form with Zod validation
Icons: Lucide React
State Management: React Context API

📦 Installation

Clone the repository
bashgit clone <your-repo-url>
cd tnp-recruitment-challenge

Install dependencies
bashnpm install

Set up environment variables
bashcp .env.local.example .env.local
Update .env.local with your values:
envNEXT_PUBLIC_API_BASE_URL=https://tnp-recruitment-challenge.manitvig.live
NEXT_PUBLIC_APP_URL=http://localhost:3000

Run the development server
bashnpm run dev

Open your browser
Navigate to http://localhost:3000

🔧 Build for Production
bashnpm run build
npm start
🌐 Deployment
Vercel (Recommended)

Connect your GitHub repository to Vercel
Set environment variables in Vercel dashboard:

NEXT_PUBLIC_API_BASE_URL: https://tnp-recruitment-challenge.manitvig.live
NEXT_PUBLIC_APP_URL: Your deployed URL (e.g., https://your-app.vercel.app)


Deploy automatically on push

Manual Deployment
bashnpm run build
Upload the .next folder and other necessary files to your hosting provider.
📚 API Integration
The application integrates with the provided backend API:

Base URL: https://tnp-recruitment-challenge.manitvig.live
Authentication: JWT tokens with automatic refresh
Endpoints:

POST /login - User authentication
POST /refresh - Token refresh
POST /share - Generate share token
GET /share?shareToken=<token> - Get shared data



🎯 Usage
Admin Workflow

Login with your credentials at /login
Generate a share link from the admin dashboard
Copy and share the generated link with external parties

Public Access Workflow

Click the shared link (format: /share?token=<shareToken>)
View student data in a clean, tabulated format
Filter by email using the search functionality

🔒 Security Features

Protected Routes: Admin panel requires authentication
Token-based Access: Secure share links with cryptographic tokens
Automatic Token Refresh: Seamless session management
Input Validation: Zod schema validation for forms
XSS Protection: Built-in Next.js security features

📱 Responsive Design

Mobile-first approach with Tailwind CSS
Responsive tables with horizontal scrolling on small screens
Touch-friendly interfaces for mobile users
Accessible design with proper ARIA labels

🧪 Development
Project Structure
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── login/             # Authentication pages
│   ├── share/             # Public share pages
│   └── globals.css        # Global styles
├── contexts/              # React contexts
├── lib/                   # Utilities and API clients
└── components/            # Reusable components (if needed)
Key Files

lib/api.ts - API client with authentication
contexts/AuthContext.tsx - Authentication state management
lib/validations.ts - Zod schemas for form validation

🐛 Troubleshooting
Common Issues

API Connection Issues

Verify NEXT_PUBLIC_API_BASE_URL is correct
Check network connectivity to the backend


Authentication Problems

Clear localStorage and try logging in again
Verify credentials with the backend team


Share Link Not Working

Ensure NEXT_PUBLIC_APP_URL matches your deployment URL
Check if the share token is valid and not expired



📄 License
This project is created for the DTU Training & Placement Department Recruitment Challenge 2025.
🤝 Contributing
This is a challenge submission. For questions or issues, please contact the development team.

Demo Credentials (if applicable):

Username: admin
Password: password

Live Demo: [Your Vercel URL]
API Documentation: https://documenter.getpostman.com/view/19524067/2sB2xBCVFe