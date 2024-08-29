import styles from '@/app/Components/(Dashbords)/(DashboardsLiteComponent)/SalesCardContentComp/SalesCardContentComp.module.css'
import { GiTakeMyMoney } from "react-icons/gi";
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";
const SalesCardContentComp = () => {
    return (
        <div className={styles.revenue}>
            <div className={styles.sale}>
                <div className={styles.total}>$15,612,545</div>
                <div className={styles.today}>
                    <span className={styles.percentage}>
                        <HiOutlineArrowTrendingUp />
                        12.08%
                    </span>
                    <span className={styles.todaySales}>+120,254 today</span>
                </div>
            </div>
            <GiTakeMyMoney />
        </div>
    )
}

export default SalesCardContentComp