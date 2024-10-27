import styles from '@/app/Components/(liteComponents)/PicWithNameRole/PicWithNameRole.module.css'
import Image from 'next/image'
const PicWithNameRole = ({ imgSrc, name, role, roleWeight, roleColor, picDot, hidePicDot, width, dotSize, dotBorder, onClick }) => {
    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.imageContainer}>
                <Image
                    width={0}
                    height={0}
                    alt='user image'
                    sizes='100vw'
                    src={imgSrc || '/assets/imageAssets/ceo_dollarprompt.PNG'}
                    style={{ width: width || '52px' }}
                    className={styles.image} />

                <span
                    style={{
                        width: dotSize || '22px',
                        height: dotSize || '22px',
                        border: dotBorder || '5px solid var(--primaryClr)',
                        display: hidePicDot === true ? 'none' : hidePicDot === false ? 'block' : 'none'
                    }}
                    className={
                        `${styles.statusDot} 
                         ${picDot === 'online' ? styles.online : picDot === 'offline' ? styles.offline : styles.inactive}`
                    }></span>

            </div>

            {/* role and name container */}
            <div className={styles.info}>
                <b className={styles.name}>{name || 'name'}</b>
                <span
                    className={styles.role}
                    style={{
                        fontWeight: roleWeight,
                        color: roleColor
                    }}
                >
                    {role || 'role'}
                </span>
            </div>

        </div >
    )
}

export default PicWithNameRole