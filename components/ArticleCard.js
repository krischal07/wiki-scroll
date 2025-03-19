import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const ArticleCard = () => {
  return (
    <Card className="w-full max-w-md mx-auto sm:max-w-lg">
        <CardHeader>
            <CardTitle>The Moon</CardTitle>
        </CardHeader>
        <CardContent>
            <img src='https://via.placeholder.com/300x200'
            alt=''
            className='w-full h-48 sm:h-64 md:h-72'
            />
            <p className='text-black'>
            The Moon is Earth&apos;s only natural satellite. It&apos;s pretty cool and
            makes tides happen. Werewolves love it too.
            </p>

        </CardContent>
    </Card>
  )
}

export default ArticleCard