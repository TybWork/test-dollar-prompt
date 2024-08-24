import styles from '@/app/Components/DashboardHeader/DashboardHeader.module.css'
import Search from '../(liteComponents)/Search/Search'
import IconWithCoutner from '../(liteComponents)/IconWithCounter/IconWithCoutner'
import { IoChatbubblesOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import PicWithNameRole from '../(liteComponents)/PicWithNameRole/PicWithNameRole';
const DashboardHeader = () => {
    return (
        <div className={styles.headerWrapper}>
            <Search placeholder='Search your needs' width="200px" />
            <div className={styles.detail}>
                <IconWithCoutner icon={<IoChatbubblesOutline />} />
                <IconWithCoutner icon={<GoBell />} right='-2px' />
                <PicWithNameRole imgSrc='/assets/imageAssets/ceo_dollarprompt.PNG' name="Muhammad Shabbir" role="Super Admin" />
            </div>

        </div>
    )
}

export default DashboardHeader