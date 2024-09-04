//this is a special next file, when page.tsx file returns an error
//(specially when a resource doesn´t exist, 404 error), Next searches
//the not-found.tsx file in the same folder to show an specefic interface
//to the user (in this case a message with an 404 error and a Go Back button).

import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested customer.</p>
      <Link
        href="/dashboard/customers"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
