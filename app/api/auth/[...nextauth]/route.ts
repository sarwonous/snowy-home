import NextAuth from "next-auth";
import { authOptions } from ".";

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
