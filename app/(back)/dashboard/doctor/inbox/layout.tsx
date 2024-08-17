import PanelHeader from '@/components/dashboard/Doctor/PanelHeader'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { Calendar, Mail } from 'lucide-react'
import React, { ReactNode } from 'react'
import NotAuthorized from '@/components/NotAuthorized'
import { getInboxMessages } from '@/actions/inbox'
import MailListPanel from '@/components/dashboard/Doctor/MailListPanel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const layout = async({
    children
  }:{children:ReactNode}
 ) => {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if(user?.role !== "DOCTOR"){
     return(
       <NotAuthorized  />
     )
  }
  const messages = (await getInboxMessages(user?.id)).data || []
  return (
    <div> 
       <div className='grid grid-cols-12'>
          <div className='col-span-4  border-r border-gray-200'>
          <PanelHeader title="Inbox Messages"
              count={(messages.length ?? 0).toString()}
              icon={Mail}
              />
              <div className='px-3 py-3'>
              <Tabs defaultValue="received" className="">
              <TabsList>
                <TabsTrigger value="received">Received</TabsTrigger>
                <TabsTrigger value="sent">Sent</TabsTrigger>
              </TabsList>
                <TabsContent value="received">
                <MailListPanel 
                  messages={messages}
                  role={user?.role} 
                  />
                </TabsContent>
                <TabsContent value="sent">
                  <MailListPanel 
                    messages={messages}
                    role={user?.role} 
                    />
                </TabsContent>
            </Tabs>
              </div>
          </div>
          <div className='col-span-8'>{children}</div>
       </div>
    
  </div>
  )
}

export default layout