import styles from '@/app/Components/(Dashbords)/SingleUser/SingleUser.module.css'
import PicWithNameRole from '../../(liteComponents)/PicWithNameRole/PicWithNameRole'
import Status from '../../(liteComponents)/Status/Status'
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import IconWithCoutner from '../../(liteComponents)/IconWithCounter/IconWithCoutner';
import { IoChatbubblesOutline } from "react-icons/io5";
const SingleUser = ({ isActive, picDot }) => {
    return (
        <ul className={styles.detail}>
            <li><PicWithNameRole name={'Mudasir'} role={'admin'} picDot={picDot} hidePicDot={false} /></li>
            <li className={styles.contact}>
                <span>mudasir@gmail.com</span>
                <span>+92 (345) 4567890</span>
            </li>
            <li>
                <Status isActive={isActive} />
            </li>
            <li>Address sadsdfassdff</li>
            <li>
                <span className={styles.updateIcon}>
                    <RxUpdate />
                </span>
                <span className={styles.deleteIcon} >
                    <MdDelete />
                </span>
                <span>
                    <IconWithCoutner icon={<IoChatbubblesOutline />} />
                </span>
            </li>
        </ul>
    )
}

export default SingleUser