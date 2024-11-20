import styles from '@/app/Components/(updatedDesignComp)/ShowAllSection/ShowAllSection.module.css'
import Link from 'next/link'
const ShowAllSection = ({ leftGradientWidth, rightGradientWidth, padding, margin, title, isLink = true, link, linkText, content }) => {

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

                <Link style={{ display: isLink ? 'flex' : 'none' }} className={styles.link} href={link || '/'}>
                    {linkText ? (screenWidth < 500 ? 'View All' : linkText) : (screenWidth < 500 ? 'View All' : 'View All Categories')
                    }
                </Link>


            </div>
            <div className={styles.gradientContainer}>
                <div className={styles.gradientDivLeft} style={{ width: leftGradientWidth || '48px' }}></div>
                <div className={styles.gradientDivRight} style={{ width: rightGradientWidth || '48px' }}></div>
                <div className={styles.content}>
                    {content || 'content add content'}
                </div>
            </div>
        </div>
    )
}

export default ShowAllSection