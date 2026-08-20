export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  HOD: 'hod',
  FACULTY: 'faculty',
  STUDENT: 'student',
  PARENT: 'parent',
  STAFF: 'staff',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  [ROLES.SUPER_ADMIN]: 'Super Administrator',
  [ROLES.ADMIN]: 'College Administrator',
  [ROLES.HOD]: 'Head of Department',
  [ROLES.FACULTY]: 'Faculty Member',
  [ROLES.STUDENT]: 'Student',
  [ROLES.PARENT]: 'Parent / Guardian',
  [ROLES.STAFF]: 'Support Staff',
};
