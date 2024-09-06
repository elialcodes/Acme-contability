//When we need to share some specific interface between several pages of the same
//folder, we can create a layout.tsx file in the root of the folder and include
//that interface (SideNav in this case). So, that interface would be part of
//the pages nested in the same folder.
//A layout.tsx file recives children as a prop. Children will
//automatically be the nested pages in the same folder.
//An advantage by using layout.tsx file, the layout (the part in common) wont´t
//be updated (re-rendered), only the components in the page will. This is
//called "partial rendering".

import SideNav from '@/app/ui/dashboard/sidenav';

//We add experimenta_ppr (pre-partial rendering) as setting option to join static
//dinamic render in the same route. It´s a Next experimental feature, and it gave
//some problems, so I decided to show as a comment.
// export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
