export const decodeUserId = (token: string): string | null => {
  if (!token) return null;
  try {
    const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.userId;
  } catch (error) {
    return null;
  }
};
