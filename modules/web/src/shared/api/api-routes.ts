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
    inviteSend: "/friends/send-invite",
    invites: '/friends/received-invites',
    sentInvites: '/friends/sent-invites'
};

const ROOM_ROUTES = {
    onAir: "/rooms/is-live",
    isRoomValid: "/rooms/check-is-valid",
    room: "/rooms",
    roomHistory: "/rooms/own-history",
    publicRooms: "/rooms/public",
    
};

export const API = {
    AUTH_ROUTES,
    FRIENDS_ROUTES,
    USER,
    ROOM_ROUTES
} as const;