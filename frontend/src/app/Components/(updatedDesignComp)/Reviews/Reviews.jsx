'use client'
import React from 'react'
import style1 from '@/app/Components/(updatedDesignComp)/Reviews/Reviews.module.css'
import style2 from '@/app/Components/(updatedDesignComp)/Reviews/fullWidthReviews.module.css'
import RatingStars from '../(snipets)/RatingStars/RatingStars'
import RatingSlider from '../(snipets)/RatingSlider/RatingSlider'
import UserSingleReview from '../(snipets)/UserSingleReview/UserSingleReview'
import { usePathname } from 'next/navigation'
const Reviews = ({ totalReviews, totalRating, ratingMaxWidth }) => {
    const pathname = usePathname()
    const styles = pathname.includes('/profile') ? style2 : style1
    return (
        <div className={styles.reviewsContainer}>

            {/*............. rating container....... */}
            <div className={styles.title}>Reviews</div>

            <div className={styles.ratingMainContainer}>
                <div
                    className={styles.ratingContainer}
                    style={{
                        maxWidth: ratingMaxWidth
                    }}
                >

                    {/* rating heading */}
                    <div className={styles.heading}>
                        <div className={styles.ratingTitle}>
                            {totalReviews || 10} reviews for this Creator
                        </div>
                        <RatingStars rating={totalRating || 4.3} />
                    </div>

                    {/* rating sliders */}
                    <div className={styles.slidersContainer}>
                        <RatingSlider starCount={5} fillPercentage={70} reviewsCount={7} />
                        <RatingSlider starCount={4} fillPercentage={20} reviewsCount={2} />
                        <RatingSlider starCount={3} fillPercentage={10} reviewsCount={1} />
                        <RatingSlider starCount={2} fillPercentage={0} reviewsCount={0} />
                        <RatingSlider starCount={1} fillPercentage={0} reviewsCount={0} />
                    </div>

                </div>

                {/* unique users review */}
                <div className={styles.uniqueUsersReviews}>
                    <UserSingleReview imgUrl={'/assets/imageAssets/logo.webp'} />
                    <UserSingleReview />
                </div>

            </div>
        </div >
    )
}

export default Reviews