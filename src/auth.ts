import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const authConfig = {
  providers: [
    Google,
  ],
  secret: process.env.AUTH_SECRET,
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)