import { expo } from '@better-auth/expo';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from './prisma';
export const auth = betterAuth({
  //...
  database: prismaAdapter(prisma, {
    provider: 'mysql', // or "mysql", "postgresql", ...etc
  }),
  plugins: [expo()],
  emailAndPassword: {
    enabled: true, // Enable authentication using email and password.
  },
  trustedOrigins: [
    'optima-asset://',
    ...(process.env.NODE_ENV === 'development'
      ? [
          'exp://', // Trust all Expo URLs (prefix matching)
          'exp://**', // Trust all Expo URLs (wildcard matching)
          'exp://192.168.*.*:*/**', // Trust 192.168.x.x IP range with any port and path
        ]
      : []),
  ],
});
