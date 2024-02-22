const AUTH_ROUTES = {
    signUp: "/auth/sign-up",
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
    whoami: "/auth/whoami",
} as const;

const USER = {
    me: "/me"
} as const;

const FRIENDS_ROUTES = {
    friends: "/friends",
    inviteSend: "/invite-send",
    invites: '/friends/received-invites',
    sentInvites: '/friends/sent-invites'
};

export const API = {
    AUTH_ROUTES,
    FRIENDS_ROUTES,
    USER
} as const;