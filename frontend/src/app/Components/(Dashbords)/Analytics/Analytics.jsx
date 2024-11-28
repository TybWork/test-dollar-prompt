'use client'
import styles from '@/app/Components/(Dashbords)/Analytics/Analytics.module.css';
import InfoCardDashboard from '../(DashboardsLiteComponent)/InfoCardDashboard/InfoCardDashboard';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SalesCardContentComp from '../(DashboardsLiteComponent)/(infoCardDashboardComponents)/SalesCardContentComp/SalesCardContentComp';
import PiChart from '../(Charts)/PiChart/PiChart';
import { Pie, Doughnut } from 'react-chartjs-2'
import LineChart from '../(Charts)/LineChart/LineChart';
import BarChart from '../(Charts)/BarChart/BarChart';
import { getTokenFunction } from '@/app/utilities/getTokenFunction';

const Analytics = () => {
    const reduxDate = useSelector(state => state.datepicker.date);
    const [activeComponent, setActiveComponent] = useState('sales');
    const [promptsDate, setPromptsDate] = useState(reduxDate);
    const [salesDate, setSalesDate] = useState(reduxDate);
    const [csDate, setcsDate] = useState(reduxDate);
    const [mainData, setmainData] = useState([])

    function handleComponentClick(component) {
        setActiveComponent(component);
        console.log(activeComponent)
    }

    // function to get data from api
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/super-admin/get-data`,
                {
                    headers: {
                        Authorization: getTokenFunction().token,
                    },
                    withCredentials: true,
                }
            )
            setmainData(response.data)
        }
        fetchData()
    }, [])
    console.log('this is main data', mainData)

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

    return (
        <div className={styles.parentContainer}>

            {/* <InfoCardDashboard
                width={'max-content'}
                onClick={() => handleComponentClick('sales')}
                fullDate={salesDate}
                contentComponent={<SalesCardContentComp />}
            /> */}

            <InfoCardDashboard
                mainTitle={'Prompts Stats'}
                width={'max-content'}
                onClick={() => handleComponentClick('sales')}
                fullDate={salesDate}
                contentComponent={
                    <PiChart
                        labels={[
                            `${mainData?.promptsCount?.total} Total`,
                            `${mainData?.promptsCount?.approved} Approved`,
                            `${mainData?.promptsCount?.pending} Pending`,
                            `${mainData?.promptsCount?.rejected} Rejected`
                        ]}
                        bgColors={[
                            'rgb(68,193,81)',
                            'rgb(0, 162, 255)',
                            'rgb(255, 204, 0)',
                            'rgb(255, 55, 0, 0.3)'
                        ]}
                        myData={[mainData?.promptsCount?.total, mainData?.promptsCount?.approved, mainData?.promptsCount?.pending, mainData?.promptsCount?.rejected]}
                    />
                }

            />

            <InfoCardDashboard
                mainTitle={'Prompts Stats'}
                width={'max-content'}
                onClick={() => handleComponentClick('sales')}
                fullDate={salesDate}
                contentComponent={
                    <PiChart
                        labels={[
                            `${mainData?.promptsCount?.total} Total`,
                            `${mainData?.promptsCount?.approved} Approved`,
                            `${mainData?.promptsCount?.pending} Pending`,
                            `${mainData?.promptsCount?.rejected} Rejected`
                        ]}
                        bgColors={[
                            'rgb(68,193,81)',
                            'rgb(0, 162, 255)',
                            'rgb(255, 204, 0)',
                            'rgb(255, 55, 0, 0.3)'
                        ]}
                        myData={[mainData?.promptsCount?.total, mainData?.promptsCount?.approved, mainData?.promptsCount?.pending, mainData?.promptsCount?.rejected]}
                    />
                }

            />

            <InfoCardDashboard
                mainTitle={'Users Stats'}
                width={'max-content'}
                onClick={() => handleComponentClick('sales')}
                fullDate={salesDate}
                contentComponent={
                    <PiChart
                        Type={Pie}
                        labels={
                            [
                                `${mainData?.rolesCount?.total} Total`,
                                `${mainData?.rolesCount?.users} Buyers`,
                                `${mainData?.rolesCount?.admins} Admins`,
                                `${mainData?.rolesCount?.sellers} Sellers`
                            ]
                        }
                        myData={[mainData?.rolesCount?.total, mainData?.rolesCount?.users, mainData?.rolesCount?.admins, mainData?.rolesCount?.sellers]}
                        bgColors={
                            [
                                'rgb(68,193,81)',
                                'rgb(0, 162, 255)',
                                'rgb(255, 204, 0)',
                                '#5144c1',
                            ]
                        }

                    />
                }
            />

            {/* revenue chart */}
            <InfoCardDashboard
                mainTitle={'Users Stats'}
                width={'max-content'}
                onClick={() => handleComponentClick('sales')}
                fullDate={salesDate}
                contentComponent={
                    <BarChart
                        labels={
                            [
                                `${mainData?.revenue?.sales} Sales`,
                                `${mainData?.revenue?.profits} Profits`,
                                `${mainData?.revenue?.payouts} Payouts`,
                            ]
                        }
                        myData={[mainData?.revenue?.sales, mainData?.revenue?.profits, mainData?.revenue?.payouts]}
                        bgColor={
                            ['#0D3B66', '#EE964B', '#F95738']
                        }

                    />
                }
            />

            {/* revenue chart */}
            <InfoCardDashboard
                mainTitle={'Users Stats'}
                width={'max-content'}
                onClick={() => handleComponentClick('sales')}
                fullDate={salesDate}
                contentComponent={
                    <LineChart
                        labels={
                            [
                                `${mainData?.revenue?.sales} Sales`,
                                `${mainData?.revenue?.profits} Profits`,
                                `${mainData?.revenue?.payouts} Payouts`,
                            ]
                        }
                        myData={[mainData?.revenue?.sales, mainData?.revenue?.profits, mainData?.revenue?.payouts]}
                        bgColor={
                            ['#0D3B66', '#EE964B', '#F95738']
                        }

                    />
                }
            />

        </div>
    );
};

export default Analytics;
