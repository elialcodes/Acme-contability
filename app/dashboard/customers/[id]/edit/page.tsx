//file to modify a customer.
//We are going to create a dinamic segment route putting this file
//inside a folder with brackets,[id], this is usefull
//to create a new route based in dates when we don´t
//know the name of these dates.

import EditCustomerForm from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/customers/breadcrumbs';
import { fetchCustomerById } from '@/app/lib/data';
//function from next/navigation Next module to use when a resource doesn´t exist,
//it returns an 404 error in a nice way):
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

//metadata object to be includes in this page, and it would override
//the metadata object of the parent page if this one wouldn´t have
//a template in his metadada object.
export const metadata: Metadata = {
  title: 'Edit Customer',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  //we obtain the constants customer from the Promises
  const [customers] = await Promise.all([fetchCustomerById(id)]);

  //if there is no any customer with that id, we return the function notFound ()
  //that searchs and renders the file not-found.tsx of the same folder,
  //a special Next file to render an interface inside a specific route segment ()
  if (!customers) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customer', href: '/dashboard/customers' },
          {
            label: 'Edit Customer',
            href: `/dashboard/customers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditCustomerForm customer={customers} />
    </main>
  );
}
