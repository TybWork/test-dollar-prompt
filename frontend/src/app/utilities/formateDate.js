'use client'
export const formateDate = (time) => {

    const myTime = new Date(time);
    const monthsArr = [
        'Jan', // January
        'Feb', // February
        'Mar', // March
        'Apr', // April
        'May', // May
        'Jun', // June
        'Jul', // July
        'Aug', // August
        'Sep', // September
        'Oct', // October
        'Nov', // November
        'Dec'  // December
    ];
    const monthIndex = myTime.getMonth()
    const formatedTime = `${myTime.getDate()} ${monthsArr[monthIndex]} ${myTime.getHours()}:${myTime.getMinutes()}`

    return {
        date: formatedTime
    }
}