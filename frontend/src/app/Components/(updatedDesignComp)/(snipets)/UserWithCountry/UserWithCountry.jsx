'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from '@/app/Components/(updatedDesignComp)/(snipets)/UserWithCountry/UserWithCountry.module.css'

const UserWithCountry = ({ firstLetter, imgUrl, profileHandle, country }) => {
    const [color, setcolor] = useState('rgb(168 243 143)')
    const [hasError, sethasError] = useState(false)
    const randomClr = () => {
        const r = Math.floor(Math.random() * 176 + 80); // Range: 127 to 255
        const g = Math.floor(Math.random() * 176 + 80); // Range: 127 to 255
        const b = Math.floor(Math.random() * 176 + 80); // Range: 127 to 255
        return `rgb(${r}, ${g}, ${b})`; // Return RGB color
    }
    useEffect(() => {
        setcolor(randomClr())
    }, [hasError])


    return (
        <div className={styles.container}>
            <div
                className={styles.imageContainer}
                style={{
                    background: color
                }}
            >
                {firstLetter || 'U'}
                <Image
                    alt='user-image'
                    src={imgUrl || '/assets/imageAssets/dummy.jpg'}
                    width={0}
                    height={0}
                    sizes='100vw'
                    className={styles.image}
                    onError={() => sethasError(true)}
                    style={{
                        display: imgUrl === undefined || hasError === true ? "none" : "block"
                    }}
                />
            </div>
            <div className={styles.text}>
                <div className={styles.profileHandle}>@{profileHandle || 'User12323'}</div>
                <div className={styles.country}>{country || 'United States'}</div>
            </div>
        </div>
    )
}

export default UserWithCountry