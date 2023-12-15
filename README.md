# Attendance App

Attendance App is designed to provide a seamless and intuitive experience for both teachers and students, emphasizing practicality, efficiency, and simplicity. Its core functionalities include creating and editing the courses, as well as effectively monitoring and managing student attendance.

https://metropolia-attendance-app.vercel.app

## Key Features
- **Course Management**: Teachers can create, modify, and manage courses.
- **Teacher Collaboration**: Ability to assign multiple teachers to a course.
- **Attendance Tracking (under development)**: Students can mark attendance using QR codes.
- **Data Visualization (under development)**: Attendance data is available for review and management.

## Screenshots

<img src="https://github.com/gromov-ivan/attendance-app/assets/122451258/918e547a-384c-460e-a012-a4a1237b6304" alt="Teacher view: Course Dashboard"/>
<img src="https://github.com/gromov-ivan/attendance-app/assets/122451258/a684c7fe-47cb-403a-a3a6-5d3d86451bcc" alt="Teacher view: Mark Attendance"/>
<img src="https://github.com/gromov-ivan/attendance-app/assets/122451258/dbadaa15-1ab5-4980-b12b-2c4d05915010" alt="Teacher view: Attendance List"/>

## Technical Stack
- **Frontend**: [React](https://react.dev/), [MUI](https://mui.com/) v5, and [Vite](https://vitejs.dev/) for a fast, modern UI.
- **Backend**: [Supabase](https://supabase.com/) and for backend services including database and authentication.
- **Metropolia Opendata and Users API**: Integration with Metropolia Users API to authenticate and verify Metropolia students and staff.
- **PWA Support**: Implemented using [Vite PWA Plugin](https://vite-pwa-org.netlify.app/).

## Local Development Setup

To set up and develop the Attendance App locally, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/en) (v18 or later)

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/gromov-ivan/attendance-app.git
cd attendance-app
```

### Environment Variables, Supabase Setup, and Metropolia API

####  1. Create a `.env.local` file in the root directory of the project.
This file should contain the following environment variables:

- `VITE_SUPABASE_URL`: The URL of your Supabase project.
- `VITE_SUPABASE_ANON_KEY`: The anonymous key for your Supabase project.
- `VITE_API_KEY_METROPOLIA`: The API key for the Metropolia API.

Your `.env.local` file should look like this:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_KEY_METROPOLIA=your_metropolia_api_key
```

#### 2. Supabase setup
To obtain the values for `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`:
- [Create a Supabase project](https://supabase.com/docs/guides/getting-started/tutorials/with-react#create-a-project).
- [Set up the database schema](https://supabase.com/docs/guides/getting-started/tutorials/with-react#set-up-the-database-schema).
- [Get the API Keys](https://supabase.com/docs/guides/getting-started/tutorials/with-react#get-the-api-keys). 

For detailed database instructions and SQL commands, see the [Attendace App Database Setup Guide](./DATABASE_SETUP.md).

#### 3. Metropolia API setup
To get the Metropolia API key for `VITE_API_KEY_METROPOLIA`, follow the instructions in the [Metropolia guide](https://wiki.metropolia.fi/pages/viewpage.action?pageId=84543748).

### Install Dependencies
Install the necessary npm packages:

```bash
npm install
```

### Run the Application
To start the development server:

```bash
npm run dev
```

## Contributing
Contributions are welcome. Please open issues for any bugs or feature requests and submit pull requests for any improvements.

## License
This project is licensed under the MIT License.
