// page.tsx file inside a folder is used to create independent routes.
// (in this case, the route: /dashboard/invoices)

import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import InvoicesTable from '@/app/ui/invoices/table';
import { CreateInvoiceButton } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
//in this file, the information will be obtained from the server with
//fetchInvoicesPages function and passed to the component as a prop
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';

//metadata object to be includes in this page, and it would override
//the metadata object of the parent page if this one wouldn´t have
//a template in his metadada object.
export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  //we obtain searchParams from Search component
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  //fetchInvoicesPages returns the total number of pages acording to
  //the query (for example, the design shows 6 invoices per page by
  //defoult, if 12 invoices match the query, there will be 2 pages)
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoiceButton />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
