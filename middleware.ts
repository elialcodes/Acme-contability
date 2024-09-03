//file with middleware to authentication, it needs
//the authConfig file, made previously.
//According we desing in the authConfing file, this middleware
//function first verificates the user authentication and,
//only then, allows user to go to protected routes

import NextAuth from 'next-auth'; //we have istalled NextAuth previously
import { authConfig } from './auth.config'; //import authenticate configuration

//we are configuring the NextAuth function with the object authConfig
//and exporting the auth propierty
export default NextAuth(authConfig).auth;

//options to say that it will be executed in especific routes
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
