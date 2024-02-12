const AUTH_ROUTES = {
    signUp: "/auth/sign-up",
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
    whoami: "/auth/whoami",
} as const;

export const API = {
    AUTH_ROUTES,
} as const;