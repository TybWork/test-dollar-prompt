import React from 'react'
import styles from '@/app/Components/(updatedDesignComp)/(snipets)/AboutSeller/AboutSeller.module.css'
import Image from 'next/image'
import HeadingCounts from '../HeadingCounts/HeadingCounts'
import PrimaryBtn from '@/app/Components/(liteComponents)/PrimaryBtn/PrimaryBtn'
import SquareBorderBtn from '../SquareBorderBtn/SquareBorderBtn'
import VerifiedIcon from '@/app/Components/(icons)/VerifiedIcon'

const AboutSeller = ({ profileHandle }) => {
    return (
        <div className={styles.parentContainer}>
            <Image width={0} height={0} sizes='100vw' className={styles.image} src={'/assets/imageAssets/logo.webp'} />
            <div className={styles.rightContainer}>
                <div className={styles.profileHandle}>
                    @{profileHandle || 'Sha12'} <VerifiedIcon />
                </div>
                <div className={styles.counts}>
                    <HeadingCounts count={50} heading={'Prompts'} />
                    <HeadingCounts count={5} heading={'Followers'} />
                    <HeadingCounts count={100} heading={'Prompts Sold'} />
                    <HeadingCounts />
                </div>
                <hr className={styles.hr} />
                <div className={styles.btns}>
                    <SquareBorderBtn />
                    <PrimaryBtn height={'40px'} width={'150px'} />
                </div>
            </div>
        </div>
    )
}

export default AboutSeller