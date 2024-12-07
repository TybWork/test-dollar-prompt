'use client'
import AboutSeller from '@/app/Components/(updatedDesignComp)/(snipets)/AboutSeller/AboutSeller'
import styles from '@/app/(Pages)/profile/[profileId]/profile.module.css'
import AdaptiveCard from '@/app/Components/AdaptiveCard/AdaptiveCard'
import ContentWithHeading from '@/app/Components/(updatedDesignComp)/ContentWithHeading/ContentWithHeading'
import Image from 'next/image'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Loading from '@/app/Components/(liteComponents)/Loading/Loading'
import Reviews from '@/app/Components/(updatedDesignComp)/Reviews/Reviews'
import LoadingCircle from '@/app/Components/(liteComponents)/LoadingCircle/LoadingCircle'

const page = ({ params }) => {
    const { profileId } = params

    const [profile, setprofile] = useState({})
    const [fetchPrompts, setfetchPrompts] = useState({})
    useEffect(() => {
        const fetchSellerProfile = async () => {
            try {
                const profile = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller/getseller?userId=${profileId}&withPrompts=true`);
                const prompts = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/fetch-user-logs?userId=${profileId}&status=active`)
                setprofile(profile.data);
                setfetchPrompts(prompts.data.sellingHistory);

                // prompts fetch
            } catch (error) {
                console.error("Error fetching seller data:", error);
            }
        }

        fetchSellerProfile();
    }, [profileId]);

    console.log(fetchPrompts.gpt)

    if (!profile && !fetchPrompts) return <LoadingCircle />

    const profileImage = (profile.profileImage && profile.profileImage.length > 0) ? profile.profileBanner[0] : '/assets/imageAssets/dummy.jpg'

    const bannerImage = (profile.profileBanner && profile.profileBanner.length > 0)
        ? profile.profileBanner[0]
        : "/assets/imageAssets/dummy-banner.png";

    return (
        <div>
            {/* bannerContainer */}
            <div className={styles.bannerOuterContainer}>
                <div className={styles.banner}>
                    <Image alt='banner-image' className={styles.bannerImage} src={bannerImage} width={0} height={0} sizes='100vw' />
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
                        <div
                            className={styles.promptSlider}
                            style={{
                                display: fetchPrompts &&
                                    fetchPrompts['dall-e'] &&
                                    fetchPrompts['dall-e']?.length > 0 ? 'flex' : 'none'
                            }}
                        >
                            <ContentWithHeading
                                title={'Dall-E'}
                                linkText={'View All'}
                                link={'/market'}

                                content={
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            flexWrap: 'wrap',
                                        }}
                                    >

                                        {
                                            fetchPrompts &&
                                            fetchPrompts['dall-e'] &&
                                            fetchPrompts['dall-e'].length > 0 &&
                                            fetchPrompts['dall-e'].map((e, index) => (
                                                <div className={styles.adaptive} key={index}>
                                                    <AdaptiveCard
                                                        category={e.promptType}
                                                        mainImage={e.Image_Url[0]}
                                                        title={e.title}
                                                        promptUrl={`/prompts/${e._id}/dall-e`}
                                                    />
                                                </div>
                                            ))
                                        }

                                    </div>
                                }
                            />
                        </div>

                        {/* GPT prompts */}
                        <div
                            className={styles.promptSlider}
                            style={{
                                display: fetchPrompts &&
                                    fetchPrompts['gpt'] &&
                                    fetchPrompts['gpt']?.length > 0 ? 'flex' : 'none'
                            }}
                        >
                            <ContentWithHeading
                                title={'Gpt Prompts'}
                                linkText={'View All'}
                                link={'/market'}

                                content={
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            flexWrap: 'wrap',
                                            width: '100%'
                                        }}
                                    >
                                        {
                                            fetchPrompts &&
                                            fetchPrompts['gpt'] &&
                                            fetchPrompts['gpt'].length > 0 &&
                                            fetchPrompts['gpt']?.map((e, index) => (
                                                <div className={styles.adaptive} key={index}>
                                                    <AdaptiveCard
                                                        category={e.promptType}
                                                        title={e.title}
                                                        promptType='gpt'
                                                        promptUrl={`/prompts/${e._id}/gpt`}
                                                    />
                                                </div>
                                            ))
                                        }

                                    </div>
                                }
                            />
                        </div>

                        {/* Midjourney prompts */}
                        <div
                            className={styles.promptSlider}
                            style={{
                                display: fetchPrompts &&
                                    fetchPrompts['midjourney'] &&
                                    fetchPrompts['midjourney']?.length > 0 ? 'flex' : 'none'
                            }}
                        >
                            <ContentWithHeading
                                title={'Midjourney Prompts'}
                                linkText={'View All'}
                                link={'/market'}

                                content={
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            flexWrap: 'wrap',
                                            width: '100%'
                                        }}
                                    >
                                        {
                                            fetchPrompts &&
                                            fetchPrompts['midjourney'] &&
                                            fetchPrompts['midjourney']?.map((e, index) => (
                                                <div key={index} className={styles.adaptive}>
                                                    <AdaptiveCard
                                                        category={e.promptType}
                                                        mainImage={e.Image_Url[0]}
                                                        title={e.title}
                                                        promptUrl={`/prompts/${e._id}/midjourney`}
                                                    />
                                                </div>
                                            ))
                                        }

                                    </div>
                                }
                            />
                        </div>
                    </div>

                    {/*----------------- reviews section ------------------*/}
                    {/* <Reviews /> */}
                </div>

            </div>



        </div >
    )
}

export default page