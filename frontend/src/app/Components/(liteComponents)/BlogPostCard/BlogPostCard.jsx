import styles from '@/app/Components/(liteComponents)/BlogPostCard/BlogPostCard.module.css'
import PicWithNameRole from '../PicWithNameRole/PicWithNameRole'
const BlogPostCard = ({ onClick, title, description }) => {
    return (
        <div className={styles.cardContainer} onClick={onClick}>
            <h2 className={styles.h2}>{title}</h2>
            <p className={styles.content}>{description}</p>

            <div>
                <PicWithNameRole
                    width={'40px'}
                    name={"Admin"}
                    role={'12 Aug 2024'}
                    roleColor={'var(--homeMainBtn'}
                    roleWeight={700}
                />
            </div>
        </div>
    )
}

export default BlogPostCard