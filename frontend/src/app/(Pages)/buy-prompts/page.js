'use client'
import styles from '@/app/(Pages)/buy-prompts/buy-prompts.module.css'
import PrimaryBtn from '@/app/Components/(liteComponents)/PrimaryBtn/PrimaryBtn'
import EmailNewletter from '@/app/Components/(updatedDesignComp)/EmailNewsletter/EmailNewletter'
import AdaptiveCard from '@/app/Components/AdaptiveCard/AdaptiveCard'
import axios from 'axios'
import { useState, useEffect } from 'react'
const page = () => {
    const [trendingPrompts, settrendingPrompts] = useState([])

    useEffect(() => {
        const fetchPrompts = async () => {
            try {
                const trending = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompts/get/trending`);
                settrendingPrompts(trending.data)
            } catch (error) {
                console.error("Error fetching seller data:", error);
            }
        };

        fetchPrompts();
    }, []);
    return (
        <div className={styles.mainContainer}>

            <div className={styles.topSection}>
                <div className={styles.header}>
                    <h1>Boost Your Workflow with Handpicked
                        AI-Powered Prompts</h1>
                    <p>Revitalize your daily routine by integrating handpicked AI-powered prompts into your workflow. Explore our selection of top AI prompts that can accelerate your productivity and help you achieve more in less time. Whether you're brainstorming ideas or managing tasks, these carefully curated prompts will enhance your efficiency and creativity, making your workday smoother than ever.</p>
                    <div className={styles.headerBtn}>
                        <PrimaryBtn href={`/market`} title={'Explore our prompts'} width={'100%'} height={'100%'} />
                    </div>
                </div>

                <div className={styles.cardsSection}>
                    <div className={styles.cardsContainer}>

                        {
                            trendingPrompts && trendingPrompts.slice(0, 5).map((trending) =>
                                <div className={styles.singleCard}>
                                    <AdaptiveCard
                                        mainImage={trending?.Image_Url?.[0]}
                                        promptUrl={`/prompts/${trending._id}/${trending.promptType.toLowerCase()}`}
                                        title={trending.title}
                                        category={trending.promptType}
                                        promptType={trending.promptType.toLowerCase()}
                                    />
                                </div>
                            )
                        }
                    </div>

                </div>
                {/* email newsletter section */}
                <EmailNewletter
                    title={"Get News & AI  prompts in your inbox Join Our Creative Community"}
                    description={"We're committed to supporting AI prompt creators in gaining recognition and expanding their expertise. Subscribe for regular AI news, updates, and tips. Join our growing community"}
                    msg={<div className={styles.message}>By signing up you are agreeing our <a href="/">Term of Use</a> and <a href="/">Privacy Policy</a></div>}
                />
            </div>


        </div>
    )
}

export default page