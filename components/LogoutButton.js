import { signOut } from 'next-auth/react'
import React from 'react'

const LogoutButton = () => {
  return (
    <div>
        <button onClick={()=>signOut({callbackUrl:"/login"})}
            className='btn btn-outline mt-4'
            >
                Logout
        </button>
    </div>
  )
}

export default LogoutButton