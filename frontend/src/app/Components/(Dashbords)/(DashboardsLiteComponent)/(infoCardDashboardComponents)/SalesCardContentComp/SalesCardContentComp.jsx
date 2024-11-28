import styles from '@/app/Components/(Dashbords)/(DashboardsLiteComponent)/(infoCardDashboardComponents)/SalesCardContentComp/SalesCardContentComp.module.css'
import { GiTakeMyMoney } from "react-icons/gi";
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";
const SalesCardContentComp = ({ reactIcon, mainContent, pertcentageGreenText, darkText }) => {
    return (
        <div className={styles.revenue}>
            <div className={styles.sale}>
                <div className={styles.total}>{mainContent || "$15,612,545"}</div>
                <div className={styles.today}>
                    <span className={styles.percentage}>
                        {reactIcon || <HiOutlineArrowTrendingUp />}
                        {pertcentageGreenText || "12.08%"}
                    </span>
                    <span className={styles.todaySales}>{darkText || "+120,254 today"}</span>
                </div>
            </div>
            <GiTakeMyMoney />
        </div>
    )
}

export default SalesCardContentComp;