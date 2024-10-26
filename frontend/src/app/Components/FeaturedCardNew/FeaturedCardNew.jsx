import styles from '@/app/Components/FeaturedCardNew/FeaturedCardNew.module.css'
import Image from 'next/image'
import VerifiedIcon from '../(icons)/VerifiedIcon'
import StarIcon from '../(icons)/StarIcon'
import { useRouter } from 'next/navigation'
const FeaturedCardNew = ({ headerImgArray, profileImage, name, profileHandle, rating, ratingPeopleCount, promptsCount, followersCount }) => {
    const router = useRouter()

    const imgArray = [
        '/assets/imageAssets/sampleCardImage.png',
        '/assets/imageAssets/sampleCardImage.png',
        '/assets/imageAssets/sampleCardImage.png',
    ]
    return (
        <div className={styles.mainContainer} onClick={() => router.push('/profile/342309832489')}>

            <div className={styles.coloredContainer}>
            </div>
            <div className={styles.innerContentContainer}>

                <div className={styles.imageContainer}>
                    {
                        headerImgArray ? (
                            headerImgArray.map((url, index) =>
                                <Image key={index} src={url} width={0} height={0} sizes='100vw' className={styles.image} />
                            )
                        ) : (
                            imgArray.map((url, index) =>
                                <Image key={index} src={url} width={0} height={0} sizes='100vw' className={styles.image} />
                            )
                        )
                    }
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.profile}>
                        <Image src={profileImage || '/assets/imageAssets/sampleCardImage.png'} width={0} height={0} sizes='100vw' className={styles.profileImg} />
                        {/* <div className={styles.userName}>
                            {name || 'Shawan Michel'}
                            <VerifiedIcon />
                        </div> */}
                        <div className={styles.profileHandle}>
                            @{profileHandle || 'sha12'}
                            <VerifiedIcon />
                        </div>
                    </div>

                    <hr className={styles.hr} />

                    <div className={styles.cardFooter}>
                        <div className={styles.valueContainer}>
                            <span className={styles.value}>{promptsCount || '50'}+</span>
                            <span className={styles.name}>Prompts</span>
                        </div>

                        <div className={styles.valueContainer}>
                            <span className={styles.value}>{followersCount || '50'}+</span>
                            <span className={styles.name}>Followers</span>
                        </div>

                        <div className={styles.valueContainer}>

                            <div className={styles.rating}>
                                <span className={styles.value}>
                                    <StarIcon />
                                    {rating || '4.9'}
                                    <span className={styles.peopleCount}> ({ratingPeopleCount || '150'})</span>
                                </span>
                            </div>
                            <span className={styles.name}>Reviews</span>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default FeaturedCardNew