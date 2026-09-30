import Header from "@/components/Header";
import { ReactNode } from "react";
import GlobalSearchBar from "@/components/GlobalSearchBar.tsx";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <GlobalSearchBar />
      {children}
    </>
  )
}
export default MainLayout;