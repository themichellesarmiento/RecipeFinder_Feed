import { User } from "lucide-react";
import Link from "next/link";

const Header = () => {

  return (
    <>
      <header className='flex justify-between p-4 bg-accent-one'>
        <Link href='/' className='font-extrabold text-xl md:text-2xl'>RecipeFinder</Link>
        <Link href='/login' className='font-bold text-xl md:text-2xl'><User strokeWidth={1} /></Link>
      </header>
    </>
  )
}

export default Header;