'use client';

import { usePathname } from 'next/navigation';
import SearchBar from '@/components/SearchBar/index'

const GlobalSearchBar = () => {
  const pathname = usePathname();
  const pages = ['/login', '/signup'];

  if (pages.some(route => pathname.startsWith(route))) {
    return null;
  }
  return <SearchBar />;
};

export default GlobalSearchBar;