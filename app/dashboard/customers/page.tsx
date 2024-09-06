// page.tsx file inside a folder is used to create independent routes.
// (in this case, the route: /dashboard/customers)

//in this file, the information will be obtained from the server with
//fetchFilteredCustomers function and passed to the component as a prop

import Search from '@/app/ui/search';
import CustomersTable from 'app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { CreateCustomerButton } from '@/app/ui/customers/buttons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';

//metadata object to be includes in this page, and it would override
//the metadata object of the parent page if this one wouldn´t have
//a template in his metadada object.
export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  //we obtain searchParams from Search component
  const query = searchParams?.query ?? '';
  const totalCustomers = await fetchFilteredCustomers(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
        <CreateCustomerButton />
      </div>
      <Suspense key={query} fallback={<CustomersTableSkeleton />}>
        <CustomersTable customers={totalCustomers} />
      </Suspense>
    </div>
  );
}
