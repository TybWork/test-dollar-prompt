'use client'
import styles from '@/app/Components/(Dashbords)/(DashboardsLiteComponent)/InfoCardDashboard/InfoCardDashboard.module.css';
import { PiShoppingBagOpenFill, PiDotsThreeOutlineFill } from "react-icons/pi";
import SalesCardContentComp from '../SalesCardContentComp/SalesCardContentComp';
import DatePickerComp from '@/app/Components/(liteComponents)/DatePickerComp/DatePickerComp'

// InfoCardDashboard.jsx
const InfoCardDashboard = ({ mainTitle, contentComponent, width, onClick, fullDate }) => {
    const handleClick = () => {
        console.log('InfoCardDashboard clicked');
        if (onClick) onClick();
    };

    return (
        <div className={styles.container} style={{ width: width }} onClick={handleClick}>
            <div className={styles.headerWraper}>
                <div className={styles.header}>
                    <div className={styles.iconText}>
                        <PiShoppingBagOpenFill />
                        <span className={styles.headerText}>{mainTitle || 'dummyTitle'}</span>
                    </div>
                    <PiDotsThreeOutlineFill />
                    <span>
                        <DatePickerComp
                            background={'var(--secondryClr)'}
                            fullDate={fullDate}
                            onClick={() => {
                                console.log('DatePickerComp inside InfoCardDashboard clicked');
                                if (onClick) onClick();
                            }}
                        />
                    </span>
                </div>
            </div>

            {/* content */}
            <div className={styles.content}>
                {contentComponent || <div>Default Content</div>}
            </div>
        </div>
    );
};

export default InfoCardDashboard;

