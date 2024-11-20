import React from 'react'
import styles from '@/app/Components/(updatedDesignComp)/Timeline/Timeline.module.css'
import Image from 'next/image'
import PrimaryBtn from '../../(liteComponents)/PrimaryBtn/PrimaryBtn'
const Timeline = ({ shouldAnimate }) => {
    return (
        <div className={`${styles.parentContainer} ${shouldAnimate ? styles.animate : ''}`}>
            <div className={`${styles.singleTimelineContainer}`}>
                <div className={styles.timelineItem}>
                    <Image alt='gear-icon' className={styles.gearIcon} src={'/assets/imageAssets/gearIcon.png'} width={0} height={0} sizes='100vw' />
                    <div className={styles.timelineItemContent}>
                        <h3>Easy Account Setup</h3>
                        <span>Create your account in minutes and start selling AI prompts.</span>
                    </div>
                </div>
            </div>
            <div className={styles.singleTimelineContainer}>
                <div className={styles.timelineItem}>
                    <Image alt='gear-icon' className={styles.gearIcon} src={'/assets/imageAssets/gearIcon.png'} width={0} height={0} sizes='100vw' />
                    <div className={styles.timelineItemContent}>
                        <h3>Earn as You Create</h3>
                        <span>Create your account in minutes and start selling AI prompts.</span>
                    </div>
                </div>
            </div>
            <div className={styles.singleTimelineContainer}>
                <div className={styles.timelineItem}>
                    <Image alt='gear-icon' className={styles.gearIcon} src={'/assets/imageAssets/gearIcon.png'} width={0} height={0} sizes='100vw' />
                    <div className={styles.timelineItemContent}>
                        <h3>Effortless Payments</h3>
                        <span>Get paid automatically when your prompts sell.</span>
                    </div>
                </div>
            </div>
            <div className={styles.singleTimelineContainer}>
                <PrimaryBtn href={'/sell-prompts'} width={'100%'} height={'32px'} title={'Join Waitlist'} />
                {/* <div className={styles.timelineItem}>
                </div> */}
            </div>
        </div>
    )
}

export default Timeline