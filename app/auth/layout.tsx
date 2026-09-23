import Link from "next/link";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className='flex justify-between p-4 bg-accent-one'>
        <Link href='/' className='font-extrabold text-xl md:text-2xl'>RecipeFinder</Link>
      </header>
      {children}
    </>
  )
}
export default AuthLayout;