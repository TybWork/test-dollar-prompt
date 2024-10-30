import Panel from '@/app/Components/(Dashbords)/Panel/Panel'
import { buttons } from '@/app/jsonFiles/dashboardCategoryBtns'
import styles from '@/app/(Pages)/user/[username]/buyer-dashboard/buyer-dashboard.module.css'

const page = ({ params }) => {
    const { x } = params
    return (
        <div className={styles.parentContainer}>
            <Panel
                buttonMaping={
                    x === 'buyer' ? buttons.buyer : buttons.seller
                }
            />
        </div>
    )
}

export default page