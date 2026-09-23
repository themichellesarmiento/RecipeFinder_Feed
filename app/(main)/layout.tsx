import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <SearchBar />
      {children}
    </>
  )
}
export default MainLayout;