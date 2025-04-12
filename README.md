# BookBuddy: Peer-to-Peer Book Exchange

BookBuddy is a web application that connects book owners with book seekers, facilitating the exchange, lending, and borrowing of books within communities.

Deployed Link: https://bookbuddy112.netlify.app/

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

Project Setup Instructions

1.Clone the repository or create a new project
# Create a new Next.js project
npx create-next-app book-exchange-portal
cd book-exchange-portal

 #Clone the repository:
 git clone https://github.com/yourusername/bookbuddy.git
 cd bookbuddy

2.Install dependencies
npm install
# or
yarn install

3.Run the development server
npm run dev
# or
yarn dev

4.Build for production
npm run build
# or
yarn build


Project Structure
book-exchange-portal/
├── app/                  # Next.js App Router
│   ├── auth/             # Authentication pages
│   ├── books/            # Book listing and management
│   ├── dashboard/        # User dashboard
│   ├── profile/          # Profile redirect
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── navbar.tsx        # Navigation bar
│   └── theme-provider.tsx # Theme provider
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── auth.ts           # Authentication utilities
│   ├── data.ts           # Data storage and operations
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Utility functions
├── public/               # Static assets
├── .gitignore            # Git ignore file
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration



## Features

- User authentication (register, login, logout)
- Role-based access (Book Owner, Book Seeker)
- Book listing with book cover and browsing
- Book management for owners
- Search and filter functionality
- Responsive design for all devices

## Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Data Storage**: Local Storage (in-memory for demo purposes)

## Notes

- The application uses client-side storage (localStorage) for data persistence
- Sample books are automatically loaded when the application starts
- Authentication is basic and for demonstration purposes only (no encryption)
- The application is fully responsive and works on mobile devices


You can access the application at [http://localhost:3000](http://localhost:3000) after starting the development server.



