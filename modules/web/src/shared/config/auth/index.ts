import { ENV } from "@/platform/env";
import { baseFetcher } from "@/shared/api/fetcher";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                name: { label: "Name", type: "text" },
                nickname: { label: "Nickname", type: "text" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return Promise.resolve(null);
                }

                const isSignUp = !!credentials?.name && !!credentials?.nickname;

                const user = await baseFetcher({
                    method: "POST",
                    data: credentials,
                })(isSignUp ? "/auth/sign-up" : "/auth/sign-in");

                if (user) {
                    return Promise.resolve(user);
                }

                return Promise.resolve(null);
            }
        })
    ],
    secret: ENV.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt(data) {
            // Persist the OAuth access_token to the token right after signin

            return { ...data.token, ...data.user };
        },
        async session(data) {
            // Send properties to the client, like an access_token from a provider.
            data.session.user = data.token;
            return data.session;

        }
    }
};