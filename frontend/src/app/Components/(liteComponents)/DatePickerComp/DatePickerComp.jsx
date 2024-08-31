import styles from '@/app/Components/(liteComponents)/DatePickerComp/DatePickerComp.module.css'
import { useEffect, useState } from 'react';
import { CiCalendarDate } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';

const DatePickerComp = ({ onClick, background, fullDate }) => {
    return (
        <div
            className={styles.pickDateButton}
            style={{ background: background || 'var(--tertiaryClr)' }}
            onClick={() => {
                console.log('DatePickerComp clicked');
                if (onClick) onClick();
            }}
        >
            <span className={styles.fullDate}>{fullDate}</span>
            <CiCalendarDate />
        </div>
    );
};

export default DatePickerComp