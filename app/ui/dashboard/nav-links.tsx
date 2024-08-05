'use client'; // this React directive tells us that this component must be
//render from client side (CSR, client side rendering)
import { UserGroupIcon, HomeIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import Link from 'next/link'; //Link component instead of <a> in the return
//usePathname is a hook which detects the current url in the navigator
import { usePathname } from 'next/navigation';
import clsx from 'clsx'; //CSS library to apply conditionally className

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  //we save the hook (function) in a constant to know the current url
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            // we paint the link in the nav link that is being used,
            // we use contitional rendering with clsx
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
