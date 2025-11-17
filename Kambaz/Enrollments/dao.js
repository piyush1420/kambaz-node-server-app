import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    const existingEnrollment = enrollments.find(
      (e) => e.user === userId && e.course === courseId
    );
    if (existingEnrollment) {
      return existingEnrollment;
    }
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    db.enrollments = [...db.enrollments, newEnrollment];
    return newEnrollment;
  }

  function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = db;
    db.enrollments = enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
    console.log("After unenroll, remaining enrollments:", db.enrollments); // Add this debug log
  }

  function findEnrollmentForUser(userId) {
    const { enrollments } = db;
    return enrollments.filter((e) => e.user === userId);
  }
  return { enrollUserInCourse, unenrollUserFromCourse, findEnrollmentForUser };
}
