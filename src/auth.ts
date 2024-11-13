import NextAuth, { NextAuthConfig } from "next-auth"
import { JWT } from 'next-auth/jwt'
import GoogleProvider from "next-auth/providers/google"
import axios from 'axios'

interface Account {
  access_token?: string;
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
  },
  callbacks: {
    async signIn({ account }) {
      if (account?.access_token) {
        try {
          await axios.post('YOUR_BACKEND_API_URL/auth', null, {
            headers: {
              'Authorization': `Bearer ${account.access_token}`
            }
          });
          return true;
        } catch (error) {
          console.error('토큰 전송 실패:', error);
          return true; // 또는 false
        }
      }
      return true;
    },
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      if (account?.access_token) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.accessToken = token.accessToken
      return session
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)