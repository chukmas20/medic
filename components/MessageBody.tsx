"use client";
import parse from 'html-react-parser';

const MessageBody = ({html}:{html:string}) => {
  return (
    <div className='prose lg:prose-xl'>
        {parse(`${html}`)}
    </div>
  )
}

export default MessageBody