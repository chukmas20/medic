"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DoctorAnalyticsProps } from "@/actions/stats"
import Link from "next/link"
const AnalyticsCard = ({data}:{data:DoctorAnalyticsProps}) => {
  return (
    <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-2xl font-medium">{data.title}</CardTitle>
      {/* <Icon className="h-4 w-4 text-muted-foreground" /> */}
    </CardHeader>
    <CardContent>
      <div className="text-md font-bold">{data.unit}{data.count.toString().padStart(2,"0")}</div>
      <Link href={data.detailLink} className="text-xs text-muted-foreground">
        View Details
     </Link>
    </CardContent>
  </Card>
  )
}

export default AnalyticsCard