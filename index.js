import "dotenv/config";
import session from "express-session";
import express from "express";
import cors from "cors";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";

const app = express();

// CORS configuration - MUST come before session
app.use(
  cors({
    credentials: true, // support cookies
    origin: process.env.CLIENT_URL || "http://localhost:3001" || "http://localhost:3000",
    // restrict cross origin resource sharing to react app
  })
);

// Body parser - MUST come before session
app.use(express.json());

// Session configuration - FIXED for local development
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // MUST be false for HTTP (localhost)
    httpOnly: true,
    sameSite: 'lax', // Changed from 'none' to 'lax' for localhost
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
};


app.use(session(sessionOptions));

// Routes come AFTER session middleware is cofigured
Lab5(app);
Hello(app);
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentRoutes(app, db);
EnrollmentRoutes(app, db);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`);
});