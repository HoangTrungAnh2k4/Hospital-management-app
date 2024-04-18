import { useEffect, useState } from 'react';
import { database } from '~/firebase';
import { collection, getDocs, where, query, doc, getDoc } from 'firebase/firestore';

import styles from './CalendarDay.module.scss';
import clsx from 'clsx';

function CalendarDay({ id }) {
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [dayOfMonth, setDayOfMonth] = useState(0);
    const [events, setEvents] = useState([]);

    function randomColor() {
        const colors = [
            'MediumPurple',
            'aquamarine',
            'LightGreen',
            'PaleTurquoise',
            'LightSteelBlue',
            'RoyalBlue',
            'Wheat',
            'Sienna',
            'SandyBrown',
            'SlateBlue',
            'RosyBrown',
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    useEffect(() => {
        const today = new Date();
        const daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        setDayOfWeek(daysOfWeek[today.getDay()]);
        setDayOfMonth(today.getDate());
    }, []);

    useEffect(() => {
        async function fetchData() {
            const q = query(collection(database, 'Doctors'), where('id', '==', id));
            const querySnapshot = await getDocs(q);

            const docRef = doc(database, 'Doctors', querySnapshot.docs[0].id);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            const events = data.calendar.filter((item) => {
                const date = new Date(item.jobDate);
                return date.getDate() === dayOfMonth;
            });
            setEvents(events);
        }
        fetchData();
    }, [id]);

    return (
        <div className={clsx(styles.wrapper)}>
            <table>
                <tr>
                    <th>{dayOfWeek}</th>
                </tr>
                <td>
                    <div className={clsx(styles.date)}>{dayOfMonth}</div>
                    {events &&
                        events.map((event) => {
                            return (
                                <div className={clsx(styles.event)} style={{ backgroundColor: randomColor() }}>
                                    <p>{event.jobName}</p>
                                    <span>{event.jobTime}</span>
                                    <span>{event.jobPlace}</span>
                                </div>
                            );
                        })}
                </td>
            </table>
        </div>
    );
}

export default CalendarDay;
