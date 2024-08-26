//this is a special Next file, when page.tsx file returns an error
//(any kind of error), Next searches the error.tsx file in the same folder to show
// an specefic interface to the user (in this case a message Something went wrong).

'use client'; //this is a client component

import { useEffect } from 'react';

//2 props: error (it is an instance of Error (a native JavaScript objet)
//and reset function (to reset and come back to the previous route segment)
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}
