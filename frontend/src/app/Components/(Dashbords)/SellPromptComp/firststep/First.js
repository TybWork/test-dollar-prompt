import GradientButton from '@/app/Components/GradientButton/GradientButton'
import styles from '@/app/Components/(Dashbords)/SellPromptComp/firststep/First.module.css'
const SellingProduct = ({ onNext }) => {
    return (
        <div className={styles.mainContainer}>
            {/* leftCol */}
            <div className={styles.leftCol}>
                {/* heading Text */}
                <div className={styles.section}>
                    <h2 className={styles.heading}>Start selling your prompts</h2>
                    <p className={styles.mainText}>Are you a creative thinker with a knack for crafting compelling prompts? Turn your ideas into income by selling your unique prompts!</p>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.h3}>
                        Why Sell Your Prompts?
                    </h3>
                    <p className={styles.mainText}>
                        Imaginative prompts are in high demand, fueling creativity for artists, writers, and creators. Your unique ideas can inspire countless projects and spark fresh inspiration!
                    </p>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.h3}>
                        What’s in It for You?
                    </h3>
                    <ul className={styles.mainText}>
                        <li><span>Monetize Your Creativity:</span> Earn money doing what you love!</li>
                        <li><span>Share Your Ideas:</span> Reach a community of artists and creators eager for fresh inspiration.
                        </li>
                        <li><span>Build Your Brand:</span> Establish yourself as a go-to source for innovative prompts in your niche.
                        </li>
                    </ul>
                </div>


                {/* button component */}
                <div className={styles.nexBtn}>
                    <GradientButton
                        title="Start Selling"
                        onClick={onNext}
                    />
                </div>
            </div>

            {/* rightCol */}
            <div className={styles.rightCol}>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/nnT9fXw2T4c" title="MGT211 Short Lecture 3_Highlighted Questions_MGT211short Lectures_Mid Term_Full Detail In Short Time" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
        </div >
    )
}

export default SellingProduct