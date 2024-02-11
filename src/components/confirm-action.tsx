"use client"

import { Appointment, Client } from "@/constants/types"
import { Button } from "./ui/button"
import { useSendEmailMutation } from "@/data/hooks/useCommonClient"

interface Props {
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost"
    btnText?: string
    data: Appointment
    clientDetails?: { email: string, id: number }
    docketNumber?: string
}

const ConfirmAction = ({ variant, btnText = "Confirm", data, clientDetails, docketNumber }: Props) => {

    const { mutate: sendEmail, isPending: isLoading } = useSendEmailMutation();

    console.log({ data })

    function emailSender() {
        clientDetails?.email && (
            sendEmail({
                emailFrom: 'bhaveshy737@gmail.com',
                emailTo: clientDetails.email,
                message: `Dear Client, We would like to remind you of your upcoming appointment regarding Case with Docket Number: ${docketNumber}, scheduled for ${new Date(data.date).toLocaleDateString()}.`,
                subject: 'Case Appointment'
            })
        )
    }

    return (
        <div className="flex flex-col gap-5">
            <p>Are you sure you want to proceed with this action?</p>
            <div className="flex justify-end items-center gap-3">
                <Button variant="outline">Cancel</Button>
                <Button variant={variant ?? "default"} onClick={emailSender} disabled={isLoading}>{isLoading ? 'Loading...' : btnText}</Button>
            </div>
        </div>
    )
}

export default ConfirmAction