"use client"

import Loader from "@/components/Loader"
import { Button } from "@/components/ui/button"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { useGetOneProperty } from "@/data/hooks/usePropertiesClient"
import Image from "next/image"

const Page = ({ params: { propertyId } }: { params: { propertyId: number } }) => {

    const { loading, data } = useGetOneProperty(propertyId)

    console.log({ loading, data })

    if (loading) {
        return (
            <div className="h-[100vh] flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    return (
        <>
            <section className="w-full h-[500px]">
                <Image
                    alt="Property Image"
                    className="object-cover w-full h-full"
                    height="500"
                    src="/placeholder.svg"
                    style={{
                        aspectRatio: "1000/500",
                        objectFit: "cover",
                    }}
                    width="1000"
                    priority
                />
            </section>
            <main className="container mx-auto p-8">
                <h1 className="text-4xl font-bold mb-4">{data?.name}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="p-4">
                        <CardHeader className="mb-4">
                            <h2 className="text-2xl font-semibold">Property Details</h2>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <h3 className="text-lg font-medium">Location:</h3>
                                <p className="text-lg">{data?.address}</p>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-lg font-medium">Emirate:</h3>
                                <p className="text-lg capitalize">{data?.emirate.toLowerCase()}</p>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-lg font-medium">Landmark:</h3>
                                <p className="text-lg">{data?.landmark}</p>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-lg font-medium">Floor:</h3>
                                <p className="text-lg">{data?.floor}</p>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-lg font-medium">Price:</h3>
                                <p className="text-lg">AED {data?.amount}</p>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-lg font-medium">Contact No.:</h3>
                                <p className="text-lg">{data?.phone}</p>
                            </div>
                            {data?.numberOfBathRooms && data?.numberOfBedRooms && (
                                <>
                                    <div className="flex justify-between">
                                        <h3 className="text-lg font-medium">Bedrooms:</h3>
                                        <p className="text-lg">{data?.numberOfBedRooms}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <h3 className="text-lg font-medium">Bathrooms:</h3>
                                        <p className="text-lg">{data?.numberOfBathRooms}</p>
                                    </div>
                                </>
                            )}
                            {data?.numberOfLavatory && (
                                <div className="flex justify-between">
                                    <h3 className="text-lg font-medium">Lavatory:</h3>
                                    <p className="text-lg">{data?.numberOfLavatory}</p>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <h3 className="text-lg font-medium">Area:</h3>
                                <p className="text-lg">{data?.size} sqft</p>
                            </div>
                            {
                                data?.noticePeriod && (
                                    <div className="flex justify-between">
                                        <h3 className="text-lg font-medium">Notice Period:</h3>
                                        <p className="text-lg">{data?.noticePeriod}</p>
                                    </div>
                                )
                            }
                            {data?.minimumContract && (
                                <div className="flex justify-between">
                                    <h3 className="text-lg font-medium">Minimum Contract:</h3>
                                    <p className="text-lg">{data?.minimumContract}</p>
                                </div>
                            )}
                            {data?.description && (
                                <div className="flex justify-between">
                                    <h3 className="text-lg font-medium">Description:</h3>
                                    <p className="text-lg">{data?.description}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <Card className="p-4">
                        <CardHeader className="mb-4">
                            <h2 className="text-2xl font-semibold">Contact Agent</h2>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-4 mb-4">
                                {/* <Avatar className="w-16 h-16" /> */}
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-medium">John Doe</h3>
                                    <p className="text-sm text-gray-500">Licensed Real Estate Agent</p>
                                </div>
                            </div>
                            <Button className="mb-2 w-full">Email Agent</Button>
                            <Button className="w-full" variant="outline">
                                Call Agent
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    )
}

export default Page