import styles from '@/app/Components/(updatedDesignComp)/NewCategoryBtn/NewCategoryBtn.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const NewCategoryBtn = ({ url, text, borderColor, background, color }) => {
    const router = useRouter()

    return (
        <Link href={url || '/'}>
            <button
                className={styles.button}
                style={{
                    borderColor: borderColor || 'var(--homeTertiaryClr)',
                    background: background,
                    color: color
                }}
            >
                {text || 'ai news'}
            </button>
        </Link>
    )
}

export default NewCategoryBtn