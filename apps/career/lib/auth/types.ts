export type UserRole = "seeker" | "employer" | "admin";

export type AuthActionState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: {
    fullName?: string;
    email?: string;
    password?: string;
    role?: string;
  };
};

export const initialAuthActionState: AuthActionState = {
  status: "idle",
};
