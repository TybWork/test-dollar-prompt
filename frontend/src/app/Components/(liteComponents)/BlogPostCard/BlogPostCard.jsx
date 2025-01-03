import styles from '@/app/Components/(liteComponents)/BlogPostCard/BlogPostCard.module.css'
import PicWithNameRole from '../PicWithNameRole/PicWithNameRole'
const BlogPostCard = ({ onClick, title, description, createdAt }) => {
    return (
        <div className={styles.cardContainer} onClick={onClick}>
            <h2 className={styles.h2}>{title}</h2>
            <p className={styles.content}>{description}</p>

            <div>
                <PicWithNameRole
                    width={'40px'}
                    name={"Sha"}
                    role={createdAt}
                    roleColor={'var(--homeMainBtn'}
                    roleWeight={700}
                />
            </div>
        </div>
    )
}

export default BlogPostCard