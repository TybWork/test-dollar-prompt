import styles from '@/app/Components/(liteComponents)/PicWithNameRole/PicWithNameRole.module.css'
import Image from 'next/image'
const PicWithNameRole = ({ imgSrc, name, role }) => {
    return (
        <div className={styles.container}>
            <Image width={0} height={0} sizes='100vw' src={imgSrc} className={styles.image} />

            {/* role and name container */}
            <div className={styles.info}>
                <b className={styles.name}>{name || 'name'}</b>
                <span className={styles.role}>{role || 'role'}</span>
            </div>

        </div>
    )
}

export default PicWithNameRole