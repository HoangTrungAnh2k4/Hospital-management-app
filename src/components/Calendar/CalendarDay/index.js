import { useEffect, useState } from 'react';
import styles from './CalendarDay.module.scss';
import clsx from 'clsx';

function CalendarDay({ arrCalendar }) {
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [dayOfMonth, setDayOfMonth] = useState(0);

    function randomColor() {
        const colors = ['#6AD4DD', '#BE9FE1', '#8576FF', '#E4C59E', '#FFC7C7', '#ADC2A9', '#C2DEDC'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    useEffect(() => {
        const today = new Date();
        const daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        setDayOfWeek(daysOfWeek[today.getDay()]);
        setDayOfMonth(today.getDate());
    }, []);

    return (
        <div className={clsx(styles.wrapper)}>
            <table>
                <tr>
                    <th>{dayOfWeek}</th>
                </tr>
                <td>
                    <div className={clsx(styles.date)}>{dayOfMonth}</div>
                    {arrCalendar &&
                        arrCalendar.map((event) => {
                            const date = new Date(event.jobDate);
                            if (date.getDate() === dayOfMonth)
                                return (
                                    <div className={clsx(styles.event)} style={{ backgroundColor: randomColor() }}>
                                        <p>{event.jobName}</p>
                                        <span>{event.jobTime}</span>
                                        <span>{event.jobPlace}</span>
                                    </div>
                                );
                            return;
                        })}
                </td>
            </table>
        </div>
    );
}

export default CalendarDay;
