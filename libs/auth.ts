import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
    theme: {
        logo: "/AGUS.png",
    },
    providers: [
        GoogleProvider({
            clientId: `${process.env.NEXT_PUBLIC_GOOGLE_AUTH_KEY}`,
            clientSecret: `${process.env.GOOGLE_AUTH_SECRET}`,
        }),
    ],
};

export const handler = NextAuth(authOptions);