//we have istalled next-auth previously to do the authentication easier
//this file contains an object with pages, callbacks
//and provides configurations

import type { NextAuthConfig } from 'next-auth'; //we import type

export const authConfig = {
  //1. pages: the user will be taken to he login page
  pages: {
    signIn: '/login',
  },
  //2. callbacks:
  // authorized: a middleware function that receives an object
  // with auth propierty (authentication information of the Session) and
  // request propierty (user request). We use the authorized function
  // to check if the user is logged or not.
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  //3. providers: an array with different log-in options
  // (log in with name and password, or Google, or GitHub...)
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
