//"use client" because this is a client component (it can use
//eventlistener and hook for events):
'use client';
import { useDebouncedCallback } from 'use-debounce'; //a debounce library
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
//useSearchParams: a client component hook that lets you read the current URL's search parameters.
//usePathName: a client component hook that lets you read the current URL's pathname.
//useRouter: this hook allows you to change routes inside a client component.
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); //a constant with the hook
  const pathname = usePathname(); //a constant with the hook
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    //URLSearchParams is a constructor that creates an object with the string
    //params of a url. We create a new instance for the current url
    //using the searchParams constant
    const params = new URLSearchParams(searchParams);
    //if term, we set the value of query with the text written by the user in the input
    //else, we delete it
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    //we join the current url, ?, and the search params: if the user writes "Bob" in the input,
    //the url will be /dashboard/invoices?query=Bob
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(event) => handleSearch(event?.target.value)}
        defaultValue={searchParams.get('query')?.toString()} //to make that input and url are synchronized
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
