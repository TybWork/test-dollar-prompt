import AboutSeller from '@/app/Components/(updatedDesignComp)/(snipets)/AboutSeller/AboutSeller'
import styles from '@/app/(Pages)/prompts/[promptId]/prompts.module.css'
import Link from 'next/link'
import Reviews from '@/app/Components/(updatedDesignComp)/Reviews/Reviews'
import PromptDetail from '@/app/Components/(updatedDesignComp)/PromptDetail/PromptDetail'
import AdaptiveCard from '@/app/Components/AdaptiveCard/AdaptiveCard'
import ContentWithHeading from '@/app/Components/(updatedDesignComp)/ContentWithHeading/ContentWithHeading'

const page = () => {
    return (
        <div>
            <div className={styles.mainContainer}>
                <div className={styles.profileInfo}>
                    <AboutSeller />
                    <p className={styles.sellerDescription}>
                        This prompt generates beautiflly depicitions of vintage junk journal pages. These Nostalgic
                        and textured desing can be used for scrapbooking , journaling ,invitations , or create projects
                        , adding a rustic and timless touch to any collection. <Link href={'/'}>read more</Link>
                    </p>
                    <Reviews />
                </div>


                {/*........... right section (prompt detail section)............ */}
                <PromptDetail />
            </div>
            <ContentWithHeading
                title={'Similar Prompts'}
                linkText={'View All'}

                content={
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                        }}
                    >
                        <AdaptiveCard />
                        <AdaptiveCard />
                        <AdaptiveCard />
                        <AdaptiveCard />
                    </div>
                }
                padding={'var(--mainPadding)'}
            />

        </div>
    )
}

export default page