//file to modify an invoice.
//We are going to create a dinamic segment route putting this file
//inside a folder with brackets,[id], this is usefull
//to create a new route based in dates when we don´t
//know the name of these dates.

import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  //we obtain the constants invoice y customer from the Promises
  const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);
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
