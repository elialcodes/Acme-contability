import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod'; //library for type
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

//function to get the User from the DB
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email};`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

//we make 3 constants from NextAuth function: auth, signIn and signOut
//we pass the authConfig object as paremeter: take all authConfig object
//with spreed operator and we add providers propierty,
//an array with different log-in options (log in with name and password, or Google,
//or GitHub...), in this case it will be Credentials (especifically email and password)
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        //if the credentials are success because have the correct z format,
        //we compare them with the credentials in DB
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          //we get the mail from DB
          const user = await getUser(email);
          if (!user) return null;
          //using bcrypt, we compare password of the credentials.data with user.password in DB
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
