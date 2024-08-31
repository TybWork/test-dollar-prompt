import BlogPostCard from '@/app/Components/(liteComponents)/BlogPostCard/BlogPostCard'
import styles from '@/app/(Pages)/blog/blog.module.css'
const page = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>
                Blog
            </h1>
            <div className={styles.blogPostCard}>
                <BlogPostCard />
                <BlogPostCard />
                <BlogPostCard />
                <BlogPostCard />
                <BlogPostCard />
            </div>
        </div>
    )
}

export default page