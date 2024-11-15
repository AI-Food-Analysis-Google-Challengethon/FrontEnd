import NextAuth, { NextAuthConfig } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)