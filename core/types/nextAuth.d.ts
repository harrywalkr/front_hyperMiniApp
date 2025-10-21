import NextAuth, { type DefaultSession, type DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    token: string;
    user: {
      username: string;
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}
