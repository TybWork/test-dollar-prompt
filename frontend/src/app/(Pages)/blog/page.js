'use client'
import BlogPostCard from '@/app/Components/(liteComponents)/BlogPostCard/BlogPostCard'
import styles from '@/app/(Pages)/blog/blog.module.css'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { formatCreatedAt } from '@/app/utilities/formateCreatedAt'
const page = () => {
    const router = useRouter()
    const [blogs, setblogs] = useState([])
    useEffect(() => {

        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/get`)
                setblogs(response.data)
            } catch (error) {
                console.log('error in fetching blogs', error)
            }
        }
        fetchBlog()
    }, [])

    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>
                blogs
            </h1>
            <div className={styles.blogPostCard}>
                {
                    blogs && blogs.map((singleBlog, index) =>
                        <BlogPostCard key={index} onClick={() => router.push(`/blog/${singleBlog.slug}`)} title={singleBlog.title} description={singleBlog.description} createdAt={formatCreatedAt(singleBlog.createdAt)} />
                    )
                }
            </div>
        </div>
    )
}

export default page