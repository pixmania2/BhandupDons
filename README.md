# Student Team Members Management Application

A full-stack web application for managing student team members. This application allows users to add, view, and manage team members with their details and profile images.

## Features

- **Home Page**: Welcome screen with navigation to other sections
- **Add Member**: Form to add new team members with image upload
- **View Members**: Display all team members in a grid layout
- **Member Details**: View detailed information about individual team members
- **Responsive Design**: Works on desktop and mobile devices
- **MongoDB Integration**: Store and retrieve member data from MongoDB
- **Image Upload**: Upload and store profile images for team members

## Tech Stack

- **Frontend**: Next.js 14 with React
- **Backend**: Next.js API Routes with Node.js
- **Database**: MongoDB
- **Styling**: Tailwind CSS with shadcn/ui components
- **Image Handling**: Built-in file system operations

## Installation

### Prerequisites

- Node.js 18.x or higher
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Setup Steps

1. **Clone the repository**

\`\`\`bash
git clone https://github.com/yourusername/student-team-management.git
cd student-team-management
\`\`\`

2. **Install dependencies**

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Set up environment variables**

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
MONGODB_URI=mongodb://localhost:27017/student-team
MONGODB_DB=student-team
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

- `MONGODB_URI`: Your MongoDB connection string
- `MONGODB_DB`: The name of your MongoDB database
- `NEXT_PUBLIC_API_URL`: The URL where your app is running (for development, use localhost)

4. **Create uploads directory**

\`\`\`bash
mkdir -p public/uploads
\`\`\`

## API Endpoints

The application provides the following API endpoints:

### GET `/api/members`

- **Description**: Retrieves all team members
- **Response**: Array of member objects
- **Example Response**:
  \`\`\`json
  [
    {
      "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
      "name": "John Doe",
      "role": "Frontend Developer",
      "email": "john.doe@example.com",
      "bio": "Experienced developer with 3 years of React experience",
      "imageUrl": "/uploads/1234567890-profile.jpg",
      "createdAt": "2023-05-01T12:00:00.000Z",
      "updatedAt": "2023-05-01T12:00:00.000Z"
    },
    // More members...
  ]
  \`\`\`

### GET `/api/members/:id`

- **Description**: Retrieves a specific team member by ID
- **Parameters**: `id` - MongoDB ObjectId of the member
- **Response**: Member object
- **Example Response**:
  \`\`\`json
  {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Doe",
    "role": "Frontend Developer",
    "email": "john.doe@example.com",
    "bio": "Experienced developer with 3 years of React experience",
    "imageUrl": "/uploads/1234567890-profile.jpg",
    "createdAt": "2023-05-01T12:00:00.000Z",
    "updatedAt": "2023-05-01T12:00:00.000Z"
  }
  \`\`\`

### POST `/api/members`

- **Description**: Creates a new team member
- **Request Body**: FormData with the following fields:
  - `name` (required): Member's full name
  - `role` (required): Member's role in the team
  - `email` (required): Member's email address
  - `bio` (optional): Short biography
  - `image` (required): Profile image file
- **Response**: Created member object
- **Example Response**:
  \`\`\`json
  {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Doe",
    "role": "Frontend Developer",
    "email": "john.doe@example.com",
    "bio": "Experienced developer with 3 years of React experience",
    "imageUrl": "/uploads/1234567890-profile.jpg",
    "createdAt": "2023-05-01T12:00:00.000Z",
    "updatedAt": "2023-05-01T12:00:00.000Z"
  }
  \`\`\`

## Running the Application

1. **Start the development server**

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

2. **Access the application**

Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

3. **Using the application**

- **Home Page**: The landing page with navigation options
- **Add Member**: Click "Add Member" to add a new team member with their details and image
- **View Members**: Click "View Members" to see all team members
- **Member Details**: Click "View Details" on any member card to see their complete information

## Database Setup

The application automatically connects to MongoDB using the provided connection string in the environment variables. It will create the necessary collections when you first add a member.

If you're using a local MongoDB installation, make sure MongoDB is running before starting the application:

\`\`\`bash
# Start MongoDB (Linux/macOS)
sudo service mongod start
# or
brew services start mongodb-community

# Start MongoDB (Windows)
net start MongoDB
\`\`\`

## Deployment

This application can be deployed to Vercel with minimal configuration:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Add the environment variables in the Vercel project settings
4. Deploy the application

For other hosting providers, follow their specific instructions for deploying Next.js applications.

## Project Structure

\`\`\`
student-team-management/
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   ├── add-member/         # Add member page
│   ├── members/            # Members list page
│   │   └── [id]/           # Member details page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── not-found.tsx       # 404 page
├── components/             # React components
├── lib/                    # Utility functions
│   ├── data.ts             # Data fetching functions
│   ├── mongodb.ts          # MongoDB connection
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Utility functions
├── public/                 # Static files
│   └── uploads/            # Uploaded images
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies
├── README.md               # Project documentation
└── tsconfig.json           # TypeScript configuration
\`\`\`

## License

MIT
