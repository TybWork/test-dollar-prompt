import styles from '@/app/Components/(liteComponents)/BlogPostCard/BlogPostCard.module.css'
import PicWithNameRole from '../PicWithNameRole/PicWithNameRole'
const BlogPostCard = ({ onClick }) => {
    return (
        <div className={styles.cardContainer} onClick={onClick}>
            <h2 className={styles.h2}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea, officia.</h2>
            <p className={styles.content}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabre . . .</p>

            <div>
                <PicWithNameRole width={'40px'} name={"Admin"} role={'12 Aug 2024'} />
            </div>

        </div>
    )
}

export default BlogPostCard