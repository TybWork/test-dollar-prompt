import styles from '@/app/Components/(Dashbords)/PeopleView/PeopleView.module.css'
import SingleUser from '../SingleUser/SingleUser'
import Search from '../../(liteComponents)/Search/Search'
const PeopleView = () => {
    const showChat = () => {
        console.log('chat pressed')
    }
    return (
        <div className={styles.container}>
            <div className={styles.descriptionHeading}>
                <div className={styles.roleHeading}>Admins Overview</div>
                <Search width='200px' placeholder='Find Admin' />
            </div>
            <div className={styles.innerContainer}>
                <ul className={styles.heading}>
                    <li>Name</li>
                    <li>Contact</li>
                    <li>Status</li>
                    <li>Address</li>
                    <li>Action</li>
                </ul>

                {/* single admin */}
                <div className={styles.usersDetail}>
                    <SingleUser isActive={true} picDot={'online'} chatClickFunc={showChat} />
                    <SingleUser isActive={false} picDot={'offline'} />
                    <SingleUser isActive={true} picDot={'inactive'} />
                    <SingleUser isActive={true} picDot={'online'} />
                    <SingleUser isActive={false} picDot={'online'} />
                    <SingleUser isActive={true} picDot={'offline'} />
                </div>
            </div>
        </div>
    )
}

export default PeopleView