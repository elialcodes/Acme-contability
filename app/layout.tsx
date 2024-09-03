import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

//metadata object to add information about the page.
//When a metadata object is included in the layout.tsx file, it will be
//inherit in all his children pages.
//In title, we can write the same title for all the children or we can
//write a template and the children pages will be customized it:
//%s means any word, so, we can put a customized title in the children pages
//we want (for example, in app/dashboard/invoice/page.tsx the title
//will be "Invoices | Acme Dashboard").
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Contability',
    default: 'Acme Contability',
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

//Root layout:
//layout file recives children as a prop and this will be any HTML.
//With root layout we can share some feature across all pages of its children.
//In this case, root layout is used to modify <html> and <body> tags.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
