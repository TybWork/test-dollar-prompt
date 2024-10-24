import React from 'react'
import styles from '@/app/Components/(updatedDesignComp)/(snipets)/UserSingleReview/UserSingleReview.module.css'
import UserWithCountry from '../UserWithCountry/UserWithCountry'
import RatingStars from '../RatingStars/RatingStars'

const UserSingleReview = ({ imgUrl, firstLetter, profileHandle, country, timeAgo, review }) => {
    return (
        <div className={styles.parentContainer}>

            <div className={styles.mainContainer}>
                <UserWithCountry imgUrl={imgUrl} country={country} firstLetter={firstLetter} profileHandle={profileHandle} />

            </div>

            <hr className={styles.hr} />

            {/* {review} */}
            <div className={styles.reviewContainer}>
                <div className={styles.rating}>
                    <RatingStars rating={3.5} />
                    <span className={styles.ratingTime}>{timeAgo || 1} days ago</span>
                </div>
                <p className={styles.review}>
                    {review || 'This first review for this prompt and thats how he find that the prompts and like it and dilike it '}
                </p>
            </div>


        </div>
    )
}

export default UserSingleReview