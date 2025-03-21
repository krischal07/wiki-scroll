import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const LogoutButton =  () => {
  const router = useRouter();
  const handleLogout = async()=>{
    localStorage.removeItem("filters")
    await signOut({redirect:false})
    router.push("/login")

  }
  return (
    <div>
        <button onClick={handleLogout}
            className='btn btn-outline mt-4'
            >
                Logout
        </button>
    </div>
  )
}

export default LogoutButton