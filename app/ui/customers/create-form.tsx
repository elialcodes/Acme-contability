//file with a espedific form to create a new customer

'use client'; //this component will use a hook, so it has to be a client component

import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
//we import the function and the type StateErrorInvoices
import { createInvoice, StateErrorInvoices } from '@/app/lib/actions';
//we import the hook to managing the information that user types in the form:
import { useFormState } from 'react-dom';

export default function Form() {
  //a constant with the initial state of the inputs validation
  const initialState: StateErrorInvoices = {
    message: null,
    errors: {},
  };
  //hook useFormState, in this case, we use it to managing
  //the validation of the inputs and to make an action with them.
  //useFormState accepts 2 argument:
  //1. state (state of the inputs validation, setted as initialState)
  //2. action (function that will be invocated when the form is sent, setted as createInvoice)
  const [state, action] = useFormState(createInvoice, initialState);
  return (
    //in a form, action atribute includes an url or a place where the information
    //will be sent. Here, we are executing createInvoice, a function to validate the fields form,
    //sending the information to the BS with a sql query and creating an new invoice
    <form action={action}>
      <div className="mb-4">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Name
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="name"
              name="name"
              type="string"
              // step="0.01"
              placeholder="Enter a name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div id="amount-error" aria-live="polite" aria-atomic="true">
          {/* only if error and amount exist, we make a map */}
          {state.errors?.name?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="email"
              name="email"
              type="string"
              // step="0.01"
              placeholder="Enter an email"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div id="amount-error" aria-live="polite" aria-atomic="true">
          {/* only if error and amount exist, we make a map */}
          {state.errors?.email?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Image
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="image_url"
              name="image_url"
              type="string"
              // step="0.01"
              placeholder="Enter an image"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div id="amount-error" aria-live="polite" aria-atomic="true">
          {/* only if error and amount exist, we make a map */}
          {state.errors?.image_url?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Customer</Button>
      </div>
    </form>
  );
}
