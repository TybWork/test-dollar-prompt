import styles from '@/app/Components/(liteComponents)/BlogPostCard/BlogPostCard.module.css'
import PicWithNameRole from '../PicWithNameRole/PicWithNameRole'
const BlogPostCard = () => {
    return (
        <div className={styles.cardContainer}>
            <h2 className={styles.h2}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea, officia.</h2>
            <p className={styles.content}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabre . . .</p>

            <div>
                <PicWithNameRole width={'40px'} />
            </div>

        </div>
    )
}

export default BlogPostCard