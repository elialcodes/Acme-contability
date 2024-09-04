'use client';

import { CustomerForm } from '@/app/lib/definitions';
import { updateCustomer } from '@/app/lib/actions';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function EditCustomerForm({ customer }: { customer: CustomerForm }) {
  const updateCustomerWithId = updateCustomer.bind(null, customer.id);
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form action={updateCustomerWithId}>
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
              defaultValue={customer.name}
              placeholder="Enter a name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
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
              defaultValue={customer.email}
              placeholder="Enter an email"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Image
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="image"
              name="image"
              type="string"
              defaultValue={customer.image_url}
              placeholder="Enter an image"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Customer</Button>
      </div>
    </form>
  );
}
