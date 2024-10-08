import styles from '@/app/Components/(updatedDesignComp)/NewCategoryBtn/NewCategoryBtn.module.css'
import { useRouter } from 'next/navigation'
const NewCategoryBtn = ({ url, text, borderColor, background, color }) => {
    const router = useRouter()

    return (
        <button
            className={styles.button}
            style={{
                borderColor: borderColor || 'var(--homeTertiaryClr)',
                background: background,
                color: color
            }}
            onClick={() => router.push(url || '/market')}
        >
            {text || 'ai news'}
        </button>
    )
}

export default NewCategoryBtn