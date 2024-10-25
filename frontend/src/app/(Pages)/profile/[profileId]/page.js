'use client'
import AboutSeller from '@/app/Components/(updatedDesignComp)/(snipets)/AboutSeller/AboutSeller'
import styles from '@/app/(Pages)/profile/[profileId]/profile.module.css'
import Link from 'next/link'
import Reviews from '@/app/Components/(updatedDesignComp)/Reviews/Reviews'
import AdaptiveCard from '@/app/Components/AdaptiveCard/AdaptiveCard'
import ContentWithHeading from '@/app/Components/(updatedDesignComp)/ContentWithHeading/ContentWithHeading'
import Image from 'next/image'

const page = () => {

    return (
        <div>
            {/* bannerContainer */}
            <div className={styles.bannerOuterContainer}>
                <div className={styles.banner}>
                    <Image className={styles.bannerImage} src={'/assets/imageAssets/profileBanner.webp'} width={0} height={0} sizes='100vw' />
                </div>
            </div>

            <div className={styles.mainContainer}>
                {/* profile info container */}
                <div className={styles.profileInfo}>
                    <AboutSeller />
                    <p className={styles.sellerDescription}>
                        This prompt generates beautiflly depicitions of vintage junk journal pages. These Nostalgic
                        and textured desing can be used for scrapbooking , journaling ,invitations , or create projects
                        , adding a rustic and timless touch to any collection. <Link href={'/'}>read more</Link>
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