// page.tsx file inside a folder is used to create independent routes.
// (in this case, the route: /dashboard/customers)

//in this file, the information will be obtained from the server with
//fetchFilteredCustomers function and passed to the component as a prop
import { fetchFilteredCustomers } from '@/app/lib/data';
import Table from 'app/ui/customers/table';
import { Metadata } from 'next';

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
    <div>
      <Table customers={totalCustomers} />
    </div>
  );
}
