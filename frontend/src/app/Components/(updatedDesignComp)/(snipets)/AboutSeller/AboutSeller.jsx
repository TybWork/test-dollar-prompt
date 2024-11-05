import React from 'react'
import styles from '@/app/Components/(updatedDesignComp)/(snipets)/AboutSeller/AboutSeller.module.css'
import Image from 'next/image'
import HeadingCounts from '../HeadingCounts/HeadingCounts'
import PrimaryBtn from '@/app/Components/(liteComponents)/PrimaryBtn/PrimaryBtn'
import SquareBorderBtn from '../SquareBorderBtn/SquareBorderBtn'
import VerifiedIcon from '@/app/Components/(icons)/VerifiedIcon'
import StarIcon from '@/app/Components/(icons)/StarIcon'
import Link from 'next/link'

const AboutSeller = ({ profileHandle, profileImage, greenBtnText, linkToProfile }) => {
    return (
        <div className={styles.parentContainer}>
            <Link href={linkToProfile || '/'}>
                <Image width={0} height={0} sizes='100vw' className={styles.image} src={profileImage || '/assets/imageAssets/dummy.jpg'}
                />
            </Link>
            <div className={styles.rightContainer}>
                <div className={styles.profiling}>
                    <Image width={0} height={0} sizes='100vw' className={styles.profileImg} src={'/assets/imageAssets/logo.webp'} />
                    <div className={styles.profileHandle}>
                        <Link className={styles.profileHandle} href={linkToProfile || '/'}>
                            @{profileHandle || 'fetching...'} <VerifiedIcon />
                        </Link>
                    </div>
                </div>
                <div>
                    <div className={styles.profileHandleLarge}>
                        <Link href={linkToProfile || '/'}>
                            @{profileHandle || 'fetching...'} <VerifiedIcon />
                        </Link>
                    </div>
                    <div className={styles.counts}>
                        <HeadingCounts count={50} heading={'Prompts'} />
                        <HeadingCounts count={5} heading={'Followers'} />
                        <HeadingCounts count={100} heading={'Prompts Sold'} />
                        <div className={styles.starIconContainer}>
                            <StarIcon width={'20px'} />
                            <HeadingCounts heading={'( 159 )'} count={4.9} textAlign={'center'} />
                        </div>
                    </div>
                </div>
                <hr className={styles.hr} />
                <div className={styles.btns}>
                    <SquareBorderBtn />
                    <PrimaryBtn title={greenBtnText || 'Contact'} height={'40px'} width={'150px'} />
                </div>
            </div>
        </div >
    )
}

export default AboutSeller