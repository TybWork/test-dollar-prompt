'use client'
import styles from '@/app/Components/(Dashbords)/Analytics/Analytics.module.css';
import InfoCardDashboard from '../(DashboardsLiteComponent)/InfoCardDashboard/InfoCardDashboard';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Analytics = () => {
    const reduxDate = useSelector(state => state.datepicker.date);
    const [activeComponent, setActiveComponent] = useState('sales');
    const [promptsDate, setPromptsDate] = useState(reduxDate);
    const [salesDate, setSalesDate] = useState(reduxDate);
    const [csDate, setcsDate] = useState(reduxDate);

    function handleComponentClick(component) {
        setActiveComponent(component);
        console.log(activeComponent)
    }
    useEffect(() => {
        if (activeComponent === 'prompts') {
            setPromptsDate(reduxDate);
        } else if (activeComponent === 'sales') {
            setSalesDate(reduxDate);
        }
        else if (activeComponent === 'cs') {
            setcsDate(reduxDate);
        }
    }, [reduxDate]);

    console.log(activeComponent)
    return (
        <div className={styles.parentContainer}>
            <InfoCardDashboard
                width={'max-content'}
                onClick={() => handleComponentClick('sales')}
                fullDate={salesDate}
            />
            <InfoCardDashboard
                width={'max-content'}
                onClick={() => handleComponentClick('prompts')}
                fullDate={promptsDate}
            />
            <InfoCardDashboard
                width={'max-content'}
                onClick={() => handleComponentClick('cs')}
                fullDate={csDate}
            />
        </div>
    );
};

export default Analytics;
