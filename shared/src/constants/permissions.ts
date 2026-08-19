export const PERMISSIONS = {
  // Tenant Permissions
  TENANTS_VIEW: 'tenants.view',
  TENANTS_CREATE: 'tenants.create',
  TENANTS_UPDATE: 'tenants.update',

  // Student Permissions
  STUDENTS_VIEW: 'students.view',
  STUDENTS_CREATE: 'students.create',
  STUDENTS_UPDATE: 'students.update',
  STUDENTS_DELETE: 'students.delete',
  STUDENTS_OWN_VIEW: 'students.own.view',

  // Faculty Permissions
  FACULTY_VIEW: 'faculty.view',
  FACULTY_MANAGE: 'faculty.manage',

  // Academic Permissions
  COURSES_MANAGE: 'courses.manage',
  TIMETABLE_MANAGE: 'timetable.manage',

  // Attendance Permissions
  ATTENDANCE_MARK: 'attendance.mark',
  ATTENDANCE_VIEW: 'attendance.view',
  ATTENDANCE_OWN_VIEW: 'attendance.own.view',

  // Exam Permissions
  EXAMS_MANAGE: 'exams.manage',
  EXAMS_GRADE: 'exams.grade',
  EXAMS_RESULTS_PUBLISH: 'exams.results.publish',

  // Finance Permissions
  FINANCE_VIEW: 'finance.view',
  FINANCE_MANAGE: 'finance.manage',
  FINANCE_OWN_VIEW: 'finance.own.view',

  // Settings
  SETTINGS_MANAGE: 'settings.manage',
} as const;

export type PermissionKey = typeof PERMISSIONS[keyof typeof PERMISSIONS];
