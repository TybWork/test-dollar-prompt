'use client'
import AboutSeller from '@/app/Components/(updatedDesignComp)/(snipets)/AboutSeller/AboutSeller'
import styles from '@/app/(Pages)/profile/[profileId]/profile.module.css'
import Link from 'next/link'
import Reviews from '@/app/Components/(updatedDesignComp)/Reviews/Reviews'
import AdaptiveCard from '@/app/Components/AdaptiveCard/AdaptiveCard'
import ContentWithHeading from '@/app/Components/(updatedDesignComp)/ContentWithHeading/ContentWithHeading'
import Image from 'next/image'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Loading from '@/app/Components/(liteComponents)/Loading/Loading'

const page = ({ params }) => {
    const { profileId } = params

    const [profile, setprofile] = useState({})
    useEffect(() => {
        const fetchSellerProfile = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/getseller?userId=${profileId}`);
                setprofile(response.data);
            } catch (error) {
                console.error("Error fetching seller data:", error);
            }
        }

        fetchSellerProfile();
    }, [profileId]);

    if (!profile) return <Loading />

    const profileImage = (profile.profileImage && profile.profileImage.length > 0) ? profile.profileBanner[0] : '/assets/imageAssets/dummy.jpg'

    const bannerImage = (profile.profileBanner && profile.profileBanner.length > 0)
        ? profile.profileBanner[0]
        : "/assets/imageAssets/dummy-banner.png";

    console.log('prolfile', profile)

    return (
        <div>
            {/* bannerContainer */}
            <div className={styles.bannerOuterContainer}>
                <div className={styles.banner}>
                    <Image className={styles.bannerImage} src={bannerImage} width={0} height={0} sizes='100vw' />
                </div>
            </div>

            <div className={styles.mainContainer}>
                {/* profile info container */}
                <div className={styles.profileInfo}>
                    <AboutSeller
                        profileImage={profileImage}
                        profileHandle={profile.profileHandle}
                        linkToProfile={`/profile/${profile.userId}`}
                    />
                    <p className={styles.sellerDescription}>
                        {profile.profileDescription}
                    </p>

                    {/* seller prompts sliders */}
                    <div className={styles.sellerPromptsContainer}>
                        {/* Dall-E prompts */}
                        <div className={styles.promptSlider}>
                            <ContentWithHeading
                                title={'Dall-E'}
                                linkText={'View All'}

                                content={
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            flexWrap: 'wrap'
                                        }}
                                    >
                                        <div className={styles.adaptive}>
                                            <AdaptiveCard />
                                        </div>
                                        <div className={styles.adaptive}>
                                            <AdaptiveCard />
                                        </div>
                                        <div className={styles.adaptive}>
                                            <AdaptiveCard />
                                        </div>
                                    </div>
                                }
                            />
                        </div>

                        {/* GPT prompts */}
                        <div className={styles.promptSlider}>
                            <ContentWithHeading
                                title={'Gpt Prompts'}
                                linkText={'View All'}

                                content={
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            flexWrap: 'wrap'
                                        }}
                                    >
                                        <div className={styles.adaptive}>
                                            <AdaptiveCard />
                                        </div>
                                        <div className={styles.adaptive}>
                                            <AdaptiveCard />
                                        </div>
                                        <div className={styles.adaptive}>
                                            <AdaptiveCard />
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    </div>

                    <Reviews />
                </div>

            </div>



        </div>
    )
}

export default page