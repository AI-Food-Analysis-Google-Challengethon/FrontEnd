import NextAuth, { NextAuthConfig, Session } from "next-auth"
import { JWT } from 'next-auth/jwt'
import GoogleProvider from "next-auth/providers/google"
import axios from 'axios'

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
          return true;  // false 로 변경 
        }
      }
      return true;  // false 로 변경
    },
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