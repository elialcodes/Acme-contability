// page.tsx file inside a folder is used to create independent routes.
// (in this case, the route: /dashboard/customers)

import { Metadata } from 'next';

//metadata object to be includes in this page, and it would override
//the metadata object of the parent page if this one wouldn´t have
//a template in his metadada object.
export const metadata: Metadata = {
  title: 'Customers',
};

export default function Page() {
  return <p>Customers Page</p>;
}
