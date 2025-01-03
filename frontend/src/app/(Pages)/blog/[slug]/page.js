import styles from '@/app/(Pages)/blog/[slug]/blogpost.module.css'
import { formatCreatedAt } from '@/app/utilities/formateCreatedAt'
import Image from 'next/image'
import { fetchDataFunc } from '@/app/utilities/fetchDataFunc'

export async function generateMetadata({ params }) {
    // read route params
    const { slug } = params

    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/filter?slug=${slug}`
    const { data: blog, error } = await fetchDataFunc(url)

    if (!blog) {
        return null;
    }

    return {
        title: blog[0]?.title,
        description: blog[0]?.description,
        openGraph: {
            title: blog[0]?.title,
            description: blog[0]?.description,
            siteName: 'Dollarprompt',
            image: blog[0]?.banner[0],
            url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/blog/${blog[0]?.slug}`,
            type: 'article',
            locale: 'en_US'
        }
    }
}

const page = async ({ params }) => {
    const { slug } = await params
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/filter?slug=${slug}`
    const { data: blog, error } = await fetchDataFunc(url)

    if (error) {
        return <div>Something went wrong</div>
    }

    if (!blog) {
        return <div>Failed to Fetch blog</div>
    }

    return (
        <div className={styles.parentContainer}>
            {
                blog && blog.map((content, index) =>
                    <div key={index}>
                        <div className={styles.imageContainer}>
                            <Image className={styles.bannerImg} width={0} height={0} sizes='100vw' src={content.banner[0]} alt='banner-image' />
                        </div>

                        <article className={styles.article}>
                            <h1 className={styles.postTitle}>{content.title}</h1>
                            <time className={styles.time} datetime="">{formatCreatedAt(content?.createdAt)}</time>
                            <div className={styles.content} dangerouslySetInnerHTML={{ __html: content.content }}>
                            </div>
                        </article>
                        <address>
                            <p>Written by <author className={styles.author}>Sha</author></p>
                        </address>
                    </div>
                )
            }
        </div>
    )
}

export default page