'use client'
import React, { useEffect } from 'react'
import styles from '@/app/Components/(updatedDesignComp)/(snipets)/RatingStars/RatingStars.module.css'
import { useState } from 'react'
const RatingStars = ({ rating }) => {
    const [fillStar, setfillStar] = useState(0)
    useEffect(() => {
        setfillStar(100 / 5 * rating)
    }, [rating])

    return (
        <div className={styles.mainContainer}>
            <div className={styles.starsWrapper}
                style={{
                    backgroundImage: `conic-gradient(at ${fillStar}% 600%, var(--homeIconText), var(--ratingClr))`
                }}
            >
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
            </div>
            <div className={styles.rating}>{rating}</div>
        </div>
    )
}

export default RatingStars