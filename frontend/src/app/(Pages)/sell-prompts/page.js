'use client'
import styles from '@/app/(Pages)/sell-prompts/sell-prompts.module.css'
import PrimaryBtn from '@/app/Components/(liteComponents)/PrimaryBtn/PrimaryBtn'
import EmailNewletter from '@/app/Components/(updatedDesignComp)/EmailNewsletter/EmailNewletter'

import InfoCards from '@/app/Components/(updatedDesignComp)/InfoCards/InfoCards'
import { getTokenFunction } from '@/app/utilities/getTokenFunction'
import { useEffect, useState } from 'react'
const page = () => {
    const [url, seturl] = useState('/')
    useEffect(() => {
        // if (typeof window !== 'undefined') {
        const token = getTokenFunction().cookie
        seturl(token === null ? '/login' : '/sell-prompts/sell')
        // }
    }, [])
    return (
        <div className={styles.mainContainer}>

            <div className={styles.topSection}>
                <div className={styles.header}>
                    <h1>Make your AI enthusiasm work and
                        sell the AI prompts you've created.</h1>
                    <p>Dollar Prompts is where AI creators can shine. Upload your best prompts, set your price, and get paid effortlessly when they sell. Build your brand and make your AI work for you.</p>
                    <div className={styles.buttonContainer}>
                        <PrimaryBtn
                            width={'100%'}
                            height={'100%'}
                            title={"Get Your Prompt!"}
                            href={'#submit-form'}
                        />
                    </div>
                </div>

                <div className={styles.cardsSection}>
                    <div className={styles.cardsContainer}>
                        <div className={styles.singleCard}>
                            <InfoCards
                                title={'Easy account Setup '}
                                description={"Create your account with Dollar Prompts, verify your email, and gain access to all the tools needed to sell your highly effective prompts that consistently generate accurate results."}
                            />
                        </div>
                        <div className={styles.singleCard}>
                            <InfoCards
                                title={'List Your AI prompts'}
                                description={"Once your account is created, you'll get a dashboard to list your curated prompts. Provide a title, add a description, explain how to use the prompt. add final results in image format and desired price ($5-$10)"}
                            />
                        </div>
                        <div className={styles.singleCard}>
                            <InfoCards
                                title={'verify and Live'}
                                description={"We will run checks and tests to verify that your prompt generates the desired results before it goes live on our platform. It will be marked as pending or under review. Once verified, your prompt will go live!"}
                            />
                        </div>
                        <div className={styles.singleCard}>
                            <InfoCards
                                title={'Getting Paid'}
                                description={"Once you make a sale, you'll receive 80% of the revenue in your account and can get paid once you reach a $50 revenue threshold. It's recommended to have a payment method set up to receive your earnings."}
                            />
                        </div>
                    </div>

                </div>
                {/* email newsletter section */}
                <div id='submit-form'>
                    <EmailNewletter
                        title={'Are you ready to earn from your side hustle? Start selling your curated AI prompts today!'}
                        description={"We're committed to supporting AI prompt creators in gaining recognition and expanding their expertise. Sign up and join our waitlist to start selling."}
                        btnText={'Submit Form'}
                    />
                </div>
            </div>


        </div>
    )
}

export default page