import React, { useState } from 'react';
import styles from '@/app/Components/Calender/Calender.module.css';
import { HiOutlineArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";
import { CiCalendarDate } from "react-icons/ci";

const CustomCalendar = () => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Get today's date
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    // Initialize state to today's date
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedDate, setSelectedDate] = useState(currentDay);
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [showYearPicker, setShowYearPicker] = useState(false);
    const [isCalendarVisible, setisCalendarVisible] = useState(false)

    const fullDate = `${selectedDate} ${months[selectedMonth].slice(0, 3)} ${selectedYear}`

    const years = [];
    for (let year = currentYear - 50; year <= currentYear; year++) {
        years.push(year);
    }

    const handleMonthClick = () => {
        setShowMonthPicker(!showMonthPicker);
        setShowYearPicker(false); // Hide year picker if open
    };

    const handleYearClick = () => {
        setShowYearPicker(!showYearPicker);
        setShowMonthPicker(false); // Hide month picker if open
    };

    const handleMonthSelect = (index) => {
        setSelectedMonth(index);
        setShowMonthPicker(false);
        console.log(`Month selected: ${months[index]}`);
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setShowYearPicker(false);
        console.log(`Year selected: ${year}`);
    };

    const handlePrevMonth = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(prevYear => prevYear - 1);
        } else {
            setSelectedMonth(prevMonth => prevMonth - 1);
        }
        console.log(`Month changed to: ${months[selectedMonth === 0 ? 11 : selectedMonth - 1]}, Year: ${selectedYear}`);
    };

    const handleNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear(prevYear => prevYear + 1);
        } else {
            setSelectedMonth(prevMonth => prevMonth + 1);
        }
        console.log(`Month changed to: ${months[selectedMonth === 11 ? 0 : selectedMonth + 1]}, Year: ${selectedYear}`);
    };

    const handleDateClick = (day) => {
        setSelectedDate(day);
        setisCalendarVisible(prev => !prev)
        console.log(`Date selected: ${day}/${selectedMonth + 1}/${selectedYear}`);
    };

    const renderCalendar = () => {
        const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
        const lastDate = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        let datesHtml = [];

        // Render blank spaces for days before the 1st of the month
        for (let i = 0; i < firstDay; i++) {
            datesHtml.push(<div className={`${styles.date} ${styles.blank}`} key={`blank-${i}`}></div>);
        }

        // Render days of the month
        for (let day = 1; day <= lastDate; day++) {
            datesHtml.push(
                <div
                    className={`${styles.date} ${selectedDate === day &&
                        selectedMonth === currentMonth &&
                        selectedYear === currentYear
                        ? styles.selected
                        : ''
                        }`}
                    key={day}
                    onClick={() => handleDateClick(day)}
                >
                    {day}
                </div>
            );
        }

        return datesHtml;
    };

    function showHidCalendar() {
        setisCalendarVisible(prev => !prev)
    }

    return (
        <div className={styles.container}>
            <div className={styles.pickDateButton} onClick={showHidCalendar}>
                {fullDate}
                <CiCalendarDate />
            </div>
            <div className={styles.calendar} style={{ transform: isCalendarVisible ? 'scale(1)' : 'scale(0)' }}>
                {/* month picker div  */}
                {showMonthPicker && (
                    <div className={styles.monthPicker}>
                        {months.map((month, index) => (
                            <div
                                key={index}
                                className={styles.monthPickerItem}
                                onClick={() => handleMonthSelect(index)}
                            >
                                {month}
                            </div>
                        ))}
                    </div>
                )}

                {/* year picker div */}
                {showYearPicker && (
                    <div className={styles.yearPicker}>
                        {years.map(year => (
                            <div
                                key={year}
                                className={styles.yearPickerItem}
                                onClick={() => handleYearSelect(year)}
                            >
                                {year}
                            </div>
                        ))}
                    </div>
                )}
                <div className={styles.header}>
                    <HiOutlineArrowLongLeft className={styles.navBtn} onClick={handlePrevMonth} />
                    <div className={styles.headerMonthYear}>
                        <div className={styles.headerMonthValue} onClick={handleMonthClick}>
                            {months[selectedMonth]}
                        </div>
                        <div className={styles.headerYearValue} onClick={handleYearClick}>
                            {selectedYear}
                        </div>
                    </div>
                    <HiOutlineArrowLongRight className={styles.navBtn} onClick={handleNextMonth} />
                </div>
                <div className={styles.days}>
                    <div className={styles.dayName}>S</div>
                    <div className={styles.dayName}>M</div>
                    <div className={styles.dayName}>T</div>
                    <div className={styles.dayName}>W</div>
                    <div className={styles.dayName}>T</div>
                    <div className={styles.dayName}>F</div>
                    <div className={styles.dayName}>S</div>
                </div>
                <div className={styles.calendarContent} id="calendar-content">
                    <div className={styles.dates} id="calendar-dates">
                        {renderCalendar()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomCalendar;
