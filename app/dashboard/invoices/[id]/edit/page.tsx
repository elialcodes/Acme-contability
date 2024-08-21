//file to modify an invoice.
//We are going to create a dinamic segment route putting this file
//inside a folder with brackets,[id], this is usefull
//to create a new route based in dates when we don´t
//know the name of these dates.

import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
//function from next/navigation Next module to use when a resource doesn´t exist
//and returning an 404 error in a nice way):
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  //we obtain the constants invoice y customer from the all the Promises
  const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);

  //if there is no any invoices, we return the function notFound that searchs and renders
  //the file not-found.tsx, a special Next file to render an interface inside a specific
  //route segment
  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
