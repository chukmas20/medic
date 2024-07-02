import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NewButton = ({title, href}:{title: string, href: string}) => {
  return (
    <Button className='bg-yellow-600 hover:bg-yellow-500 ' asChild>
       <Link href={href}>
       <Plus className='w-4 h-4 mr-2' />
        {title}
       </Link>
    </Button>  
  )
}

export default NewButton