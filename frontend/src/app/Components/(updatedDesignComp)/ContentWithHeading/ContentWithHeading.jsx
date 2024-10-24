import styles from '@/app/Components/(updatedDesignComp)/ContentWithHeading/ContentWithHeading.module.css'
import Link from 'next/link'
const ContentWithHeading = ({ padding, margin, title, link, linkText, content }) => {

    let screenWidth;
    if (typeof window !== 'undefined') {
        screenWidth = window.screen.width;
    }
    return (
        <div
            className={styles.parentContainer}
            style={
                {
                    padding: padding || '0px',
                    margin: margin || '0px'
                }
            }
        >
            <div className={styles.header}>
                <div className={styles.title}>
                    {title || 'trending prompts'}
                </div>

                <Link className={styles.link} href={link || '/'}>
                    {linkText || screenWidth < '500' ? 'View All' : 'View All Categories'}
                </Link>


            </div>
            <div className={styles.gradientContainer}>
                <div className={styles.content}>
                    {content || 'content add content'}
                </div>
            </div>
        </div>
    )
}

export default ContentWithHeading