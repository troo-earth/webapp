export const ROLE_HIERARCHY = {
  superadmin: 4,
  admin: 3,
  manager: 2,
  viewer: 1
};

export const canManage = (actorRole: string, targetRole: string) => {
  const actorLevel = ROLE_HIERARCHY[actorRole as keyof typeof ROLE_HIERARCHY] || 0;
  const targetLevel = ROLE_HIERARCHY[targetRole as keyof typeof ROLE_HIERARCHY] || 0;
  return actorLevel > targetLevel;
};