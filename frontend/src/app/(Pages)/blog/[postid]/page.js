import styles from '@/app/(Pages)/blog/[postid]/blogpost.module.css'
import Image from 'next/image'
const page = ({ params }) => {
    const { postid } = params
    return (
        <div className={styles.parentContainer}>
            <div className={styles.imageContainer}>
                <Image className={styles.bannerImg} width={0} height={0} sizes='100vw' src={'/assets/imageAssets/placeholder-banner.png'} alt='banner-image' />
            </div>

            <article className={styles.article}>
                <h1 className={styles.postTitle}>Post title</h1>
                <time className={styles.time} datetime="">01 Aug 2024</time>
                <p className={styles.content}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas accusamus nostrum ut sapiente asperiores soluta porro veniam magni optio labore neque incidunt quia ipsam sint ex esse quae, id commodi! Culpa exercitationem non animi quisquam cum obcaecati voluptatibus, expedita, ipsum hic ipsa voluptates minus eos architecto accusantium labore itaque illo?
                </p>
            </article>
            <address>
                <p>Written by <a href="mailto:author@example.com">Author Name</a></p>
            </address>


        </div>
    )
}

export default page