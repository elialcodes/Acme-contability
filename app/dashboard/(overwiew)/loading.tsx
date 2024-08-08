//Special file of Next to make streaming in the all page while
//dinamic components are rendered.
//We have organized the routes, and this file will be the loading file
//for dashboard, not for customers and invoices folders.
//Because this file is inside in a folder with (), we won´t see the name of the
//folder in the final url.

import DashboardSkeleton from '@/app/ui/skeletons';

export default function Loading() {
  return <DashboardSkeleton />;
}
