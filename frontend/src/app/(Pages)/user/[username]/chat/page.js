'use client'
import ChatComponent from '@/app/Components/(Dashbords)/ChatComponent/ChatComponent'
import { userData } from '@/app/utilities/userData'
import React from 'react'

const chat = () => {
    const userIdString = userData().userId
    return (
        <>
            <ChatComponent senderIdString={userIdString} />
        </>
    )
}

export default chat