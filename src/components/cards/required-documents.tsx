'use client'

import { DownloadIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Property } from '@/data/clients/propertiesClient'
import Link from 'next/link'

interface Props {
  data: Property
}

const RequiredDocumentsCards = ({ data }: Props) => {
  return (
    <>
      {data?.documents && data?.documents?.length > 0 && (
        <Card className="shadow-md shadow-primary/30">
          <CardHeader className="">
            <h2 className="text-2xl font-semibold">Required Documents</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {data?.documents?.map((item: any, i: number) => (
              <Card
                key={i}
                className="shadow-md shadow-primary/30 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <CardContent className="flex items-center justify-between p-4">
                  <h3 className="text-sm font-medium capitalize">
                    {item?.type?.toLocaleLowerCase().replaceAll('_', ' ')}
                  </h3>
                  <Link href={item.url}>
                    <Button className="flex items-center">
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  )
}
export default RequiredDocumentsCards
