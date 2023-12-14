# Attendance App

Attendance App is designed to provide a seamless and intuitive experience for both teachers and students, emphasizing practicality, efficiency, and simplicity. Its core functionalities include creating and editing the courses, as well as effectively monitoring and managing student attendance.

https://metropolia-attendance-app.vercel.app

## Key Features
- **Course Management**: Teachers can create, modify, and manage courses.
- **Teacher Collaboration**: Ability to assign multiple teachers to a course.
- **Attendance Tracking (under development)**: Students can mark attendance using QR codes.
- **Data Visualization (under development)**: Attendance data is available for review and management.

## Screenshots

<img src="https://github.com/gromov-ivan/attendance-app/assets/122451258/b549d6bb-46ec-4e2b-a1b2-e3555503c882" alt="Teacher view: Course Dashboard"/>
<img src="https://github.com/gromov-ivan/attendance-app/assets/122451258/e83654c6-022a-4ecc-88b2-d7cc4f3814eb" alt="Teacher view: Course Dashboard, Edit Courses."/>
<img src="https://github.com/gromov-ivan/attendance-app/assets/122451258/9ad8be6e-258f-4889-a292-59e8451f6d79" alt="Teacher view: Mark Attendance"/>
<img src="https://github.com/gromov-ivan/attendance-app/assets/122451258/dbadaa15-1ab5-4980-b12b-2c4d05915010" alt="Teacher view: Attendance List"/>

## Technical Stack
- **Frontend**: [React](https://react.dev/), [MUI](https://mui.com/) v5, and [Vite](https://vitejs.dev/) for a fast, modern UI.
- **Backend**: [Supabase](https://supabase.com/) and for backend services including database and authentication.
- **Metropolia Opendata and Users API**: Integration with Metropolia Users API to authenticate and verify Metropolia students and staff.
- **PWA Support**: Implemented using [Vite PWA Plugin](https://vite-pwa-org.netlify.app/).

- Current Postgres database schema:
  
<img src="https://github.com/gromov-ivan/attendance-app/assets/122451258/04fecbaf-a02c-4e2f-a574-d27c2a3f0618" alt="Database Schema"/>

## Local Development Setup

To set up and develop the Attendance App locally, follow these steps:

### Prerequisites
- Node.js (v18 or later)

### Clone the Repository

First, clone the repository to your local machine:

```
git clone https://github.com/gromov-ivan/attendance-app.git
cd attendance-app
```

### Environment Variables

Create a `.env.local` file in the root directory of the project. This file should contain the following environment variables:

- `VITE_SUPABASE_URL`: The URL of your Supabase project.
- `VITE_SUPABASE_ANON_KEY`: The anonymous key for your Supabase project.
- `VITE_API_KEY_METROPOLIA`: The API key for the Metropolia API.

To obtain `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, follow the Supabase guide [here](https://supabase.com/docs/guides/getting-started/tutorials/with-react#create-a-project). Create a database, as shown in the "Current Postgres database schema" section above. 

For `VITE_API_KEY_METROPOLIA`, refer to the Metropolia guide [here](https://wiki.metropolia.fi/pages/viewpage.action?pageId=84543748).

Your .env.local file should look like this:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_KEY_METROPOLIA=your_metropolia_api_key
```

### Install Dependencies
Install the necessary npm packages:

```
npm install
```

### Run the Application
To start the development server:

```
npm run dev
```

## Contributing
Contributions are welcome. Please open issues for any bugs or feature requests and submit pull requests for any improvements.

## License
This project is licensed under the MIT License.
