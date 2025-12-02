import {jwtDecode} from "jwt-decode";

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token);
    if (!decoded.exp) return true;

    const currentTime = Date.now() / 1000; // seconds
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};
