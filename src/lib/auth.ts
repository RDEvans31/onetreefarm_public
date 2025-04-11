import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '../../prisma/prisma';
import Nodemailer from 'next-auth/providers/nodemailer';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    session({ session }) {
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
});
