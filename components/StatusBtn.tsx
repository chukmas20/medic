import { DoctorStatus } from '@prisma/client';
import React from 'react'

const StatusBtn = ({
    status,
    profileId,
}:{
    status:DoctorStatus;
    profileId: string | undefined;
}) => {
  return (
    <div>StatusBtn</div>
  )
}

export default StatusBtn
