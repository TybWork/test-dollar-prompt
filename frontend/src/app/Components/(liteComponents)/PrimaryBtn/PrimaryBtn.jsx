import React from 'react'
import styles from '@/app/Components/(liteComponents)/PrimaryBtn/PrimaryBtn.module.css'
import Link from 'next/link'
const PrimaryBtn = ({ title, width, padding, height, href, borderRadius, isSubmitBtn = false }) => {

    return (
        <>
            <Link
                style={{
                    display: isSubmitBtn ? 'none' : 'block'
                }}
                href={href || '/'}>
                <button
                    style={{
                        width: width || '118px',
                        padding: padding,
                        height: height,
                        borderRadius: borderRadius
                    }}
                    className={styles.btns}
                    type={isSubmitBtn ? 'submit' : 'button'}
                >
                    {title || 'View Prompt'}
                </button>
            </Link>

            <button
                style={{
                    width: width || '118px',
                    padding: padding,
                    height: height,
                    borderRadius: borderRadius,
                    display: isSubmitBtn ? 'block' : 'none'
                }}
                className={styles.btns}
                type={isSubmitBtn ? 'submit' : 'button'}
            >
                {title || 'View Prompt'}
            </button>
        </>
    )
}

export default PrimaryBtn