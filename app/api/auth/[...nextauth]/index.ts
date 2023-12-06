import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
    theme: {
        logo: "https://agussarwono.com/images/avatar@2x.png",
    },
    providers: [
        GoogleProvider({
            clientId: `${process.env.NEXT_PUBLIC_GOOGLE_AUTH_KEY}`,
            clientSecret: `${process.env.GOOGLE_AUTH_SECRET}`,
        }),
    ],
};
