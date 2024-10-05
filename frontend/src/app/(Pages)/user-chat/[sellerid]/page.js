'use client'
import ChatComponent from '@/app/Components/(Dashbords)/ChatComponent/ChatComponent'
import HeroSlider from '@/app/Components/HeroSlider/HeroSlider'
import { userData } from '@/app/utilities/userData'
import React from 'react'

const chat = ({ params }) => {
    let { sellerid } = params
    const userIdString = userData().userId
    return (
        <>
            <HeroSlider />
            <ChatComponent senderIdString={userIdString} receiverIdString={sellerid} />
        </>
    )
}

export default chat