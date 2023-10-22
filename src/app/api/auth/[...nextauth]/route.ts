import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/lib/auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
 adapter: PrismaAdapter(prisma),
 providers: [
  GithubProvider({
   clientId: process.env.GITHUB_CLIENT_ID as string,
   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  }),
  GoogleProvider({
   clientId: process.env.GOOGLE_CLIENT_ID as string,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  }),
 ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
