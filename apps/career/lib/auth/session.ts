import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "bforc_access_token";
const REFRESH_TOKEN_COOKIE = "bforc_refresh_token";
const USER_ID_COOKIE = "bforc_user_id";
const USER_ROLE_COOKIE = "bforc_user_role";

const DEFAULT_SESSION_MAX_AGE = 60 * 60;
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 30;

type SessionCookieInput = {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  userId?: string;
  role?: string;
};

export type CurrentSession = {
  accessToken: string;
  refreshToken?: string;
  userId: string;
  role: "seeker" | "employer" | "admin";
};

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export async function setAuthCookies(session: SessionCookieInput) {
  const cookieStore = await cookies();
  const accessMaxAge = session.expiresIn ?? DEFAULT_SESSION_MAX_AGE;

  cookieStore.set(ACCESS_TOKEN_COOKIE, session.accessToken, {
    ...cookieOptions,
    maxAge: accessMaxAge,
  });

  if (session.refreshToken) {
    cookieStore.set(REFRESH_TOKEN_COOKIE, session.refreshToken, {
      ...cookieOptions,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });
  }

  if (session.userId) {
    cookieStore.set(USER_ID_COOKIE, session.userId, {
      ...cookieOptions,
      maxAge: accessMaxAge,
    });
  }

  if (session.role) {
    cookieStore.set(USER_ROLE_COOKIE, session.role, {
      ...cookieOptions,
      maxAge: accessMaxAge,
    });
  }
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();

  for (const name of [
    ACCESS_TOKEN_COOKIE,
    REFRESH_TOKEN_COOKIE,
    USER_ID_COOKIE,
    USER_ROLE_COOKIE,
  ]) {
    cookieStore.delete(name);
  }
}

export async function getCurrentSession() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const userId = cookieStore.get(USER_ID_COOKIE)?.value;
  const role = cookieStore.get(USER_ROLE_COOKIE)?.value;

  if (!accessToken || !userId || (role !== "seeker" && role !== "employer" && role !== "admin")) {
    return null;
  }

  return {
    accessToken,
    refreshToken: cookieStore.get(REFRESH_TOKEN_COOKIE)?.value,
    userId,
    role,
  } satisfies CurrentSession;
}
