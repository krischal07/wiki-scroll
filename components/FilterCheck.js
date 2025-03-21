"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const FilterCheck = () => {
    const router = useRouter();
    useEffect(()=>{
        const filters = localStorage.getItem("filters")
        if(!filters){
            router.push("/filters")
        }
    },[router])
  return null
}

export default FilterCheck