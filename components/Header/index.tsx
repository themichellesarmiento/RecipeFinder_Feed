import { LogOut } from "@/actions/logout-action";
import { createClient } from "@/lib/supabase/serverClient";
import { LogOutIcon, PenIcon, User } from "lucide-react";
import Link from "next/link";

const Header = async () => {
  const supabase = await createClient()
  const { data: { user }} = await supabase.auth.getUser();

  return (
    <>
      <header className='flex justify-between p-4 bg-accent-one'>
        {user ?
          <>
            <Link href='/' className='font-extrabold text-xl md:text-2xl'>RecipeFinder</Link>
            <div className='flex gap-2'>
              <Link href='/create'><PenIcon strokeWidth={1} /></Link>
              <LogOutIcon strokeWidth={1} onClick={LogOut} />
            </div>
          </> :
          <>
            <Link href='/' className='font-extrabold text-xl md:text-2xl'>RecipeFinder</Link>
            <Link href='/auth/login' className='font-bold text-xl md:text-2xl'><User strokeWidth={1} /></Link>
          </>
        }
      </header>
    </>
  )
}

export default Header;