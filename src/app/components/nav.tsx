'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, logout } from '../database/auth';

export default function Nav() {
  const user = useUser();
  const pathname = usePathname();
  const isView = pathname?.startsWith('/view/');

  const handleEdit = () => {
    // Add logic to edit the byte
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="mb-16">
      <ul className="flex gap-4">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/add">Add</Link></li>
        {user && isView && <li><button type="button" onClick={handleEdit}>Edit</button></li>}
        {user && <li><button type="button" onClick={handleLogout}>Logout</button></li>}
      </ul>
    </nav>
  );
}
