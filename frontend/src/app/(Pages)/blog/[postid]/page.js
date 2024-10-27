'use client'
import styles from '@/app/(Pages)/blog/[postid]/blogpost.module.css'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
const page = ({ params }) => {
    const { postid } = params
    const [blog, setblog] = useState(null)
    useEffect(() => {
        const fetchBlog = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/filter?_id=${postid}`)
            setblog(response.data)
        }
        fetchBlog();
    }, [])

    if (!blog) {
        return <div>loading...</div>
    }
    return (
        <div className={styles.parentContainer}>
            {
                blog && blog.map((content) =>
                    <div>
                        <div className={styles.imageContainer}>
                            <Image className={styles.bannerImg} width={0} height={0} sizes='100vw' src={content.banner[0]} alt='banner-image' />
                        </div>

                        <article className={styles.article}>
                            <h1 className={styles.postTitle}>{content.title}</h1>
                            <time className={styles.time} datetime="">01 Aug 2024</time>
                            <p className={styles.content} dangerouslySetInnerHTML={{ __html: content.content }}>

                            </p>
                        </article>
                        <address>
                            <p>Written by <author className={styles.author}>Zee Khan</author></p>
                        </address>
                    </div>
                )
            }
        </div>
    )
}

export default page