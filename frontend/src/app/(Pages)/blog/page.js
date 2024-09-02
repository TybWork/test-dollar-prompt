'use client'
import BlogPostCard from '@/app/Components/(liteComponents)/BlogPostCard/BlogPostCard'
import styles from '@/app/(Pages)/blog/blog.module.css'
import { useRouter } from 'next/navigation'
const page = () => {
    const router = useRouter()
    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>
                Blog
            </h1>
            <div className={styles.blogPostCard}>
                <BlogPostCard onClick={router.push('/blog/3242')} />
                <BlogPostCard onClick={router.push('/blog/3242')} />
                <BlogPostCard onClick={router.push('/blog/3242')} />
                <BlogPostCard onClick={router.push('/blog/3242')} />
                <BlogPostCard onClick={router.push('/blog/3242')} />
                <BlogPostCard onClick={router.push('/blog/3242')} />
            </div>
        </div>
    )
}

export default page