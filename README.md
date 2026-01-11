# Online Chat — Frontend

Frontend part of the online chat project built with vanilla TypeScript, SCSS, and Parcel.
This project focuses on authentication flow and interaction with a NestJS backend.

## Features
	- Sign in page
	- Form handling via service classes
	- HTTP requests to backend API
	- Clear separation of UI and business logic
	- Modular project structure

## Tech Stack
	-	HTML
	-	TypeScript
	-	SCSS
	-	Parcel

## Project Structure
	-	pages/ — HTML pages
	-	modules/ — feature-based modules (home, sign-in)
	-	services/ — form and business logic

## Running the project
```bash
pnpm install
pnpm run dev
```

### Backend Integration
	•	Sends authentication requests to backend
	•	Prepared for JWT-based authentication
	•	CORS configuration required on backend side
