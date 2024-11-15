import NextAuth, { NextAuthConfig, Session } from "next-auth"
import { JWT } from 'next-auth/jwt'
import GoogleProvider from "next-auth/providers/google"

interface Account {
  access_token?: string;
}

// JWT 타입 확장
interface CustomJWT extends JWT {
  accessToken?: string;
}

// Session 타입 확장
interface CustomSession extends Session {
  accessToken?: string;
  nickname?: string;
  email?: string;
  profileImage?: string;
}

export const authConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60, // 1일
  },
  callbacks: {
    async jwt({ token, account }: { token: CustomJWT; account: Account | null }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: CustomSession; token: CustomJWT }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)