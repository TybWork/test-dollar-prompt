'use client'
import React, { useState, useEffect } from 'react'
import styles from '@/app/Components/(Dashbords)/FavouritePrompts/FavouritePrompts.module.css'
import AdaptiveCard from '../../AdaptiveCard/AdaptiveCard'
import axios from 'axios'

const FavouritePrompts = () => {

    const [prompts, setprompts] = useState(null)

    useEffect(() => {
        const fetchLikedPrompts = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/fetch-user-logs?userId=6749f3131fff24b8617a3c13&status=active&isLiked=true`)
            setprompts(response.data.likedPrompts)
        }
        fetchLikedPrompts()
    }, [])

    console.log(prompts)

    return (
        <div className={styles.favouriteContainer}>

            {/* dall-e prompt section */}
            <div
                style={{
                    display: prompts
                        && prompts['dall-e']
                        && prompts['dall-e'].length > 0
                        ? 'flex' : 'none'
                }}
                className={styles.section}>
                <h3 className={styles.dalle}>Dall-E Prompts</h3>
                <div className={styles.promptsWrapper}>
                    {
                        prompts?.['dall-e']?.map((e) =>
                            <AdaptiveCard
                                key={e._id}
                                category='Dall-E'
                                title={e.title}
                                mainImage={e?.Image_Url?.[0]}
                                promptUrl={`${process.env.NEXT_PUBLIC_CLIENT_URL}/prompts/${e._id}/dall-e`}
                                views={e.views}
                                likes={e.likes}
                            />
                        )
                    }
                </div>
            </div>

            {/* midjourney prompts */}
            <div
                className={styles.section}
                style={{
                    display: prompts
                        && prompts['midjourney']
                        && prompts['midjourney'].length > 0
                        ? 'flex' : 'none'
                }}
            >
                <h3 className={styles.title}>Midjourney Prompts</h3>
                <div className={styles.promptsWrapper}>
                    {
                        prompts?.['midjourney']?.map((e) =>
                            <AdaptiveCard
                                key={e._id}
                                category={'Midjourney'}
                                title={e.title}
                                mainImage={e?.Image_Url?.[0]}
                                promptUrl={`${process.env.NEXT_PUBLIC_CLIENT_URL}/prompts/${e._id}/midjourney`}
                                views={e.views}
                                likes={e.likes}
                            />
                        )
                    }
                </div>
            </div>

            {/* gpt prompts */}
            <div
                className={styles.section}
                style={{
                    display: prompts
                        && prompts['gpt']
                        && prompts['gpt'].length > 0
                        ? 'flex' : 'none'
                }}
            >
                <h3 className={styles.title}>Midjourney Prompts</h3>
                <div className={styles.promptsWrapper}>
                    {
                        prompts?.['gpt']?.map((e) =>
                            <AdaptiveCard
                                key={e._id}
                                category={'gpt'}
                                title={e.title}
                                mainImage={e?.Image_Url?.[0]}
                                promptUrl={`${process.env.NEXT_PUBLIC_CLIENT_URL}/prompts/${e._id}/gpt`}
                                views={e.views}
                                likes={e.likes}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default FavouritePrompts