import React from 'react'
import styles from '@/app/Components/(Dashbords)/(DashboardsLiteComponent)/BlogPreviewAdminCard/BlogPreviewAdminCard.module.css'
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Image from 'next/image'
const BlogPreviewAdminCard = ({ alt, src, title, description, date, onDelete, onEdit }) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.content}>
                <Image className={styles.mainImage} alt={alt || 'blog-main-image'} src={src || '/assets/imageAssets/sampleCardImage.png'} width={0} height={0} sizes='100vw' />
                <div className={styles.title_desc_wrapper}>
                    <div className={styles.title}>{title || 'title this is title'}</div>
                    <div className={styles.description}>{description?.slice(0, 100) || 'Description this is Description'.slice(0, 100)}...</div>
                    <div className={styles.meta}>
                        <div className={styles.date}>{date || '01 Aug 2024'}</div>
                    </div>
                </div>
            </div>
            <div className={styles.icons}>
                <MdDelete onClick={onDelete} />
                <FiEdit onClick={onEdit} />
            </div>
        </div>
    )
}

export default BlogPreviewAdminCard