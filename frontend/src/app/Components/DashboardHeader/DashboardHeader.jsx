import styles from '@/app/Components/DashboardHeader/DashboardHeader.module.css'
import Search from '../(liteComponents)/Search/Search'
import IconWithCoutner from '../(liteComponents)/IconWithCounter/IconWithCoutner'
import { IoChatbubblesOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import PicWithNameRole from '../(liteComponents)/PicWithNameRole/PicWithNameRole';
import ProfileImgWithPanel from '../(liteComponents)/ProfileImgWithPanel/ProfileImgWithPanel';
const DashboardHeader = ({ profileUpdateUrl, imgUrl }) => {
    return (
        <div className={styles.headerWrapper}>
            <Search placeholder='Search your needs' width="200px" />
            <div className={styles.detail}>
                <IconWithCoutner counter={'0'} Icon={GoBell} right='-2px' />
                <IconWithCoutner counter={'0'} Icon={IoChatbubblesOutline} />
                <ProfileImgWithPanel dashboardUrl={'/master-dashboard'} imgUrl={imgUrl} profileUpdateUrl={profileUpdateUrl} />
                {/* <PicWithNameRole imgSrc='/assets/imageAssets/ceo_dollarprompt.PNG' name="Muhammad Shabbir" role="Super Admin" /> */}

            </div>

        </div>
    )
}

export default DashboardHeader