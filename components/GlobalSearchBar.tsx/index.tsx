'use client'
import { usePathname } from "next/navigation"
import SearchBar from "./SearchBar";

const GlobalSearchBar = () => {
  const pathname = usePathname();
  const createPath = ['/create']
  const editPathSuffix = ['/edit']

  const isHidden = createPath.includes(pathname) || editPathSuffix.some(s => pathname.endsWith(s))

  if (isHidden) return null;

  return <SearchBar />
}

export default GlobalSearchBar;