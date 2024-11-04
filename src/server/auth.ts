import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import type { Adapter, AdapterUser } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";
import { uniqueNamesGenerator, adjectives, animals, type Config } from 'unique-names-generator';

import { env } from "@/env";
import { db } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const uniqueNamesGeneratorConfig: Config = {
  dictionaries: [adjectives, animals],
  separator: '-'
};

function proxyPrismaAdapter(adapter: Adapter): Adapter {
  return {
    ...adapter,
    async createUser(user: AdapterUser) {
      if (!adapter.createUser) throw new Error("createUser is not implemented");
      const name = uniqueNamesGenerator(uniqueNamesGeneratorConfig);
      return adapter.createUser({ ...user, name });
    }
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          ...(user && { id: user.id })
        },
      }
    }
  },
  adapter: proxyPrismaAdapter(PrismaAdapter(db)),
  providers: [
    EmailProvider({
      server: env.EMAIL_SERVER,
      from: env.EMAIL_FROM,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    signIn: env.NEXT_PUBLIC_LOGIN_PATH,
  },
  session: {
    strategy: "jwt"
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
