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
                            `${mainData?.totalPromptsCounts?.totalPrompts} Total`,
                            `${mainData?.totalPromptsCounts?.totalActive} Approved`,
                            `${mainData?.totalPromptsCounts?.totalPending} Pending`,
                            `${mainData?.totalPromptsCounts?.totalPaused} Rejected`
                        ]}
                        bgColors={[
                            'rgb(68,193,81)',
                            'rgb(0, 162, 255)',
                            'rgb(255, 204, 0)',
                            'rgb(255, 55, 0, 0.3)'
                        ]}
                        myData={[
                            mainData?.totalPromptsCounts?.totalPrompts,
                            mainData?.totalPromptsCounts?.totalActive,
                            mainData?.totalPromptsCounts?.totalPending,
                            mainData?.totalPromptsCounts?.totalPaused
                        ]}
                    />
                }

            />

            {/* Dall-E prompts stats */}
            <InfoCardDashboard
                mainTitle={'Dall-E Stats'}
                width={'max-content'}
                onClick={() => handleComponentClick('sales')}
                fullDate={salesDate}
                contentComponent={
                    <PiChart
                        labels={[
                            `${mainData?.totalPromptsCounts?.collections?.dalles?.total} Total`,
                            `${mainData?.totalPromptsCounts?.collections?.dalles?.active} Approved`,
                            `${mainData?.totalPromptsCounts?.collections?.dalles?.pending} Pending`,
                            `${mainData?.totalPromptsCounts?.collections?.dalles?.paused} Rejected`
                        ]}
                        bgColors={[
                            'rgb(68,193,81)',
                            'rgb(0, 162, 255)',
                            'rgb(255, 204, 0)',
                            'rgb(255, 55, 0, 0.3)'
                        ]}
                        myData={[
                            mainData?.totalPromptsCounts?.collections?.dalles?.total,
                            mainData?.totalPromptsCounts?.collections?.dalles?.active,
                            mainData?.totalPromptsCounts?.collections?.dalles?.pending,
                            mainData?.totalPromptsCounts?.collections?.dalles?.paused
                        ]}
                    />
                }

            />

            {/* Midjourney prompts stats */}
            <InfoCardDashboard
                mainTitle={'Midjourney Stats'}
                width={'max-content'}
                onClick={() => handleComponentClick('sales')}
                fullDate={salesDate}
                contentComponent={
                    <PiChart
                        labels={[
                            `${mainData?.totalPromptsCounts?.collections?.midjourneys?.total} Total`,
                            `${mainData?.totalPromptsCounts?.collections?.midjourneys?.active} Approved`,
                            `${mainData?.totalPromptsCounts?.collections?.midjourneys?.pending} Pending`,
                            `${mainData?.totalPromptsCounts?.collections?.midjourneys?.paused} Rejected`
                        ]}
                        bgColors={[
                            'rgb(68,193,81)',
                            'rgb(0, 162, 255)',
                            'rgb(255, 204, 0)',
                            'rgb(255, 55, 0, 0.3)'
                        ]}
                        myData={[
                            mainData?.totalPromptsCounts?.collections?.midjourneys?.total,
                            mainData?.totalPromptsCounts?.collections?.midjourneys?.active,
                            mainData?.totalPromptsCounts?.collections?.midjourneys?.pending,
                            mainData?.totalPromptsCounts?.collections?.midjourneys?.paused
                        ]}
                    />
                }

            />

            {/* Gpt prompts stats */}
            <InfoCardDashboard
                mainTitle={'GPT Stats'}
                width={'max-content'}
                onClick={() => handleComponentClick('sales')}
                fullDate={salesDate}
                contentComponent={
                    <PiChart
                        labels={[
                            `${mainData?.totalPromptsCounts?.collections?.gpts?.total} Total`,
                            `${mainData?.totalPromptsCounts?.collections?.gpts?.active} Approved`,
                            `${mainData?.totalPromptsCounts?.collections?.gpts?.pending} Pending`,
                            `${mainData?.totalPromptsCounts?.collections?.gpts?.paused} Rejected`
                        ]}
                        bgColors={[
                            'rgb(68,193,81)',
                            'rgb(0, 162, 255)',
                            'rgb(255, 204, 0)',
                            'rgb(255, 55, 0, 0.3)'
                        ]}
                        myData={[
                            mainData?.totalPromptsCounts?.collections?.gpts?.total,
                            mainData?.totalPromptsCounts?.collections?.gpts?.active,
                            mainData?.totalPromptsCounts?.collections?.gpts?.pending,
                            mainData?.totalPromptsCounts?.collections?.gpts?.paused
                        ]}
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

            {/* prompts comparison */}

            {/* revenue chart */}
            <InfoCardDashboard
                mainTitle={'Prompts Stats'}
                width={'max-content'}
                onClick={() => handleComponentClick('sales')}
                fullDate={salesDate}
                contentComponent={
                    <LineChart
                        labels={
                            [
                                'Dall-E',
                                'Midjourney',
                                'GPT',
                            ]
                        }
                        datasets={
                            (() => {
                                return [
                                    {
                                        label: 'Active Prompts',
                                        data: [
                                            mainData?.totalPromptsCounts?.collections?.dalles?.active,
                                            mainData?.totalPromptsCounts?.collections?.midjourneys?.active,
                                            mainData?.totalPromptsCounts?.collections?.gpts?.active,
                                        ],
                                        fill: false,
                                        borderColor: 'green',
                                        tension: .5,
                                        pointHoverRadius: 8
                                    },
                                    {
                                        label: 'Pending Prompts',
                                        data: [
                                            mainData?.totalPromptsCounts?.collections?.dalles?.pending,
                                            mainData?.totalPromptsCounts?.collections?.midjourneys?.pending,
                                            mainData?.totalPromptsCounts?.collections?.gpts?.pending,
                                        ],
                                        fill: true,
                                        borderColor: 'gray',
                                        tension: .5,
                                        pointHoverRadius: 8,
                                    },
                                    {
                                        label: 'Rejected Prompts',
                                        data: [
                                            mainData?.totalPromptsCounts?.collections?.dalles?.paused,
                                            mainData?.totalPromptsCounts?.collections?.midjourneys?.paused,
                                            mainData?.totalPromptsCounts?.collections?.gpts?.paused,
                                        ],
                                        fill: true,
                                        borderColor: 'red',
                                        tension: .5,
                                        pointHoverRadius: 8,
                                    },
                                ]
                            })()
                        }
                    />
                }
            />

            {/* Revenue charts */}
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

            {/* prompts chart */}
            {/* <InfoCardDashboard
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
            /> */}

        </div>
    );
};

export default Analytics;
