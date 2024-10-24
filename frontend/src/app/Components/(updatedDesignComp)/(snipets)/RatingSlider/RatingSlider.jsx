'use client'
import React, { useEffect, useState } from 'react'
import styles from '@/app/Components/(updatedDesignComp)/(snipets)/RatingSlider/RatingSlider.module.css'

const RatingSlider = ({ starCount, reviewsCount, fillPercentage }) => {
    const [hasReview, sethasReview] = useState(false)
    useEffect(() => {
        if (reviewsCount > 0) {
            sethasReview(true)
        } else (
            sethasReview(false)
        )
    }, [hasReview])

    return (
        <div className={styles.container}>
            <div className={styles.starsCount}
                style={{
                    color: hasReview ? "var(--blackClr)" : 'var(--homeIconClr)'
                }}
            >{starCount || 5} Stars</div>
            <div className={styles.slider}>
                <div className={styles.fillSlider}
                    style={{
                        width: `${fillPercentage || 0}%`
                    }}
                ></div>
            </div>
            <div className={styles.reviewsCount}
                style={{
                    color: hasReview ? "var(--blackClr)" : 'var(--homeIconClr)'
                }}
            >({reviewsCount || 0})</div>
        </div>
    )
}

export default RatingSlider