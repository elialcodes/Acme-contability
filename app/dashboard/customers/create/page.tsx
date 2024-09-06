import CreateCustomerForm from '@/app/ui/customers/create-form';
import Breadcrumbs from '@/app/ui/customers/breadcrumbs';
import { Metadata } from 'next';

//this is a server component: customers are gotten with a fetch
//function, and the HTML is prerrender in the server and sent to
//client side.

//metadata object to be includes in this page, and it would override
//the metadata object of the parent page if this one wouldn´t have
//a template in his metadada object.
export const metadata: Metadata = {
  title: 'Create Customer',
};

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Create Customer',
            href: '/dashboard/customer/create',
            active: true,
          },
        ]}
      />
      <CreateCustomerForm />
    </main>
  );
}
