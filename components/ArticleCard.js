"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const ArticleCard = ({title,extract,image}) => {
  return (
    <Card className="w-full max-w-md mx-auto sm:max-w-lg mb-6">
        <CardHeader>
            <CardTitle className='text-black dark:text-white text-center'>{title}</CardTitle>

        </CardHeader>
        <CardContent>
            {
                image?(

                    <img src={image}
                    alt={title}
                    className='w-full h-48 sm:h-64 md:h-72'
                    />
                ):(
                    <div className='w-full h-48 bg-gray-200 mb-4 flex items-center justify-center'>
                        No Image
                    </div>
                )
            }
            <p className='text-black dark:text-white'>
                {extract}
            </p>
            {/* <button className='btn btn-primary mt-4'>Next</button> */}
            {/* <button className='btn btn-primary'>Next</button> */}

        </CardContent>
    </Card>
  )
}

export default ArticleCard