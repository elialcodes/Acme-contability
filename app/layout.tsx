import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

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
