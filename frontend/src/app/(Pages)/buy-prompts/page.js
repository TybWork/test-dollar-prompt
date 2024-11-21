'use client'
import styles from '@/app/(Pages)/buy-prompts/buy-prompts.module.css'
import PrimaryBtn from '@/app/Components/(liteComponents)/PrimaryBtn/PrimaryBtn'
import EmailNewletter from '@/app/Components/(updatedDesignComp)/EmailNewsletter/EmailNewletter'
import ShowAllSection from '@/app/Components/(updatedDesignComp)/ShowAllSection/ShowAllSection'
import AdaptiveCard from '@/app/Components/AdaptiveCard/AdaptiveCard'
import axios from 'axios'
import { useState, useEffect } from 'react'
const page = () => {
    // const [trendingPrompts, settrendingPrompts] = useState([])
    const [dallePrompts, setdallePrompts] = useState([])
    const [midjourneyPrompts, setmidjourneyPrompts] = useState([])
    const [gptPrompts, setgptPrompts] = useState([])
    const [trendingPrompts, settrendingPrompts] = useState([])

    // .................prompts fetching function................
    useEffect(() => {
        const fetchPrompts = async () => {
            try {
                const dalle = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/dall-e/get`);
                const midjourney = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/midjourney/get`);
                const gpt = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/gpt/get`);
                const trending = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompts/get/trending`);
                settrendingPrompts(trending.data)
                setdallePrompts(dalle.data);
                setmidjourneyPrompts(midjourney.data)
                setgptPrompts(gpt.data)
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


                {/* show all prompts container */}




                {/* Trending prompts */}
                <div className={styles.promptsSection}>
                    <ShowAllSection
                        title={'Trending Prompts'}
                        linkText={'View All Trending Prompts'}
                        content={
                            <div className={styles.cardContainer}>
                                {
                                    trendingPrompts && trendingPrompts.slice(0, 5).map((trending, index) =>
                                        <div className={styles.adaptive} key={index}>
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
                        }
                    />
                </div>

                {/* Chat GPT prompts */}
                <div className={styles.promptsSection}>
                    <ShowAllSection
                        title={'GPT prompts'}
                        linkText={'View All GPT Prompts'}
                        content={
                            <div className={styles.cardContainer}>
                                {
                                    gptPrompts && gptPrompts.slice(0, 5).map((gpt, index) =>
                                        <div className={styles.adaptive} key={index}>
                                            <AdaptiveCard
                                                promptType='gpt'
                                                promptUrl={`/prompts/${gpt._id}/${gpt.promptType.toLowerCase()}`}
                                                title={gpt.title}
                                                category={gpt.promptType}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        }
                    />

                </div>

                {/*dalle prompts section */}
                <div className={styles.promptsSection}>
                    <ShowAllSection
                        title={'DALL-E Prompts'}
                        linkText={'View All DALL-E Prompts'}
                        content={
                            <div className={styles.cardContainer}>
                                {
                                    dallePrompts && dallePrompts.slice(0, 5).map((dalle, index) =>
                                        <div className={styles.adaptive} key={index}>
                                            <AdaptiveCard
                                                mainImage={dalle.Image_Url[0]}
                                                promptUrl={`/prompts/${dalle._id}/${dalle.promptType.toLowerCase()}`}
                                                title={dalle.title}
                                                category={dalle.promptType}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        }
                    />
                </div>

                {/*midjourney prompts section */}
                <div className={styles.promptsSection}>
                    <ShowAllSection
                        title={'Midjourney Prompts'}
                        linkText={'View All Midjourney Prompts'}
                        content={
                            <div className={styles.cardContainer}>
                                {
                                    midjourneyPrompts && midjourneyPrompts.slice(0, 5).map((midjourney, index) =>
                                        <div className={styles.adaptive} key={index}>
                                            <AdaptiveCard
                                                mainImage={midjourney.Image_Url[0]}
                                                promptUrl={`/prompts/${midjourney._id}/${midjourney.promptType.toLowerCase()}`}
                                                title={midjourney.title}
                                                category={midjourney.promptType}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        }
                    />
                </div>


                {/* ...................................... */}


                {/* <div className={styles.cardsSection}>
                    <div className={styles.cardsContainer}>

                        {
                            trendingPrompts && trendingPrompts.slice(0, 5).map((trending, index) =>
                                <div className={styles.singleCard} key={index}>
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
                </div> */}
                {/* email newsletter section */}
                <div id='newsletter' className={styles.newsletterContainer}>
                    <EmailNewletter
                        title={"Get News & AI  prompts in your inbox Join Our Creative Community"}
                        description={"We're committed to supporting AI prompt creators in gaining recognition and expanding their expertise. Subscribe for regular AI news, updates, and tips. Join our growing community"}
                        msg={<div className={styles.message}>By signing up you are agreeing our <a href="/">Term of Use</a> and <a href="/">Privacy Policy</a></div>}
                    />
                </div>
            </div>


        </div>
    )
}

export default page