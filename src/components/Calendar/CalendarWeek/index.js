import styles from './CalendarWeek.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { database } from '~/firebase';
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from 'firebase/firestore';

function CalendarWeek({ children }) {
    function randomColor() {
        const colors = ['#6AD4DD', '#BE9FE1', '#8576FF', '#E4C59E', '#FFC7C7','#ADC2A9','#C2DEDC'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function getCurrentWeek() {
        const today = new Date();
        const currentDay = today.getDay(); // Lấy ngày trong tuần của ngày hiện tại (0: Chủ nhật, 1: Thứ hai, ..., 6: Thứ bảy)
        const startDate = new Date(today); // Sao chép ngày hiện tại
        startDate.setDate(today.getDate() - currentDay + 1); // Đặt ngày bắt đầu của tuần
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 5); // Đặt ngày cuối cùng của tuần

        const daysOfWeek = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];
        const formattedDays = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            formattedDays.push({ day: daysOfWeek[i], date: date.getDate() });
        }

        return { startDate, endDate, days: formattedDays };
    }

    // Sử dụng hàm getCurrentWeek() để lấy thông tin về tuần hiện tại
    const currentWeek = getCurrentWeek();
    const [monDayEvent, setMonDayEvent] = useState([]);
    const [tueDayEvent, setTueDayEvent] = useState([]);
    const [wedDayEvent, setWedDayEvent] = useState([]);
    const [thuDayEvent, setThuDayEvent] = useState([]);
    const [friDayEvent, setFriDayEvent] = useState([]);
    const [satDayEvent, setSatDayEvent] = useState([]);
    const [sunDayEvent, setSunDayEvent] = useState([]);

    useEffect(() => {
        async function fetchCalendar() {
            let arrCalendar = [];
            let arrMonDayEvent = [];
            let arrTueDayEvent = [];
            let arrWedDayEvent = [];
            let arrThuDayEvent = [];
            let arrFriDayEvent = [];
            let arrSatDayEvent = [];
            let arrSunDayEvent = [];

            if (localStorage.getItem('auth') !== 'staff') {
                const querySnapshot = await getDocs(collection(database, 'Doctors'));
                querySnapshot.forEach((doc) => {
                    if (doc.data().calendar.length > 0) {
                        arrCalendar.push({ name: doc.data().fullName, calendar: doc.data().calendar });
                    }
                });
            } else {
                const currentStaff = localStorage.getItem('name');
                const querySnapshot = await getDocs(collection(database, 'Doctors'));
                querySnapshot.forEach((doc) => {
                    if (doc.data().fullName === currentStaff) {
                        arrCalendar.push({ name: doc.data().fullName, calendar: doc.data().calendar });
                    }
                });
            }
            arrCalendar.forEach((event1) => {
                event1.calendar.forEach((event2) => {
                    const date = new Date(event2.jobDate);
                    if (date.getDate() === currentWeek.days[0].date)
                        arrMonDayEvent.push({ doctor: event1.name, calendar: event2 });
                    if (date.getDate() === currentWeek.days[1].date)
                        arrTueDayEvent.push({ doctor: event1.name, calendar: event2 });
                    if (date.getDate() === currentWeek.days[2].date)
                        arrWedDayEvent.push({ doctor: event1.name, calendar: event2 });
                    if (date.getDate() === currentWeek.days[3].date)
                        arrThuDayEvent.push({ doctor: event1.name, calendar: event2 });
                    if (date.getDate() === currentWeek.days[4].date)
                        arrFriDayEvent.push({ doctor: event1.name, calendar: event2 });
                    if (date.getDate() === currentWeek.days[5].date)
                        arrSatDayEvent.push({ doctor: event1.name, calendar: event2 });
                    if (date.getDate() === currentWeek.days[6].date)
                        arrSunDayEvent.push({ doctor: event1.name, calendar: event2 });
                });
            });

            setMonDayEvent(arrMonDayEvent);
            setTueDayEvent(arrTueDayEvent);
            setWedDayEvent(arrWedDayEvent);
            setThuDayEvent(arrThuDayEvent);
            setFriDayEvent(arrFriDayEvent);
            setSatDayEvent(arrSatDayEvent);
            setSunDayEvent(arrSunDayEvent);
        }
        fetchCalendar();
    }, []);

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.buffer)}></div>
            <table>
                <tr>
                    <th>Thứ hai</th>
                    <th>Thứ ba</th>
                    <th>Thứ tư</th>
                    <th>Thứ năm</th>
                    <th>Thứ sáu</th>
                    <th>Thứ bảy</th>
                    <th>Chủ nhật</th>
                </tr>
                <tr>
                    <td>
                        <div className={clsx(styles.date)}>{currentWeek.days[0].date}</div>
                        {monDayEvent &&
                            monDayEvent.map((event) => {
                                return (
                                    <div className={clsx(styles.event)} style={{ backgroundColor: randomColor() }}>
                                        <p>{event.calendar.jobName}</p>
                                        <span>{event.calendar.jobTime}</span>
                                        <span>{event.calendar.jobPlace}</span>
                                        <span>{event.doctor}</span>
                                    </div>
                                );
                            })}
                    </td>
                    <td>
                        <div className={clsx(styles.date)}>{currentWeek.days[1].date}</div>
                        {tueDayEvent &&
                            tueDayEvent.map((event) => {
                                return (
                                    <div className={clsx(styles.event)} style={{ backgroundColor: randomColor() }}>
                                        <p>{event.calendar.jobName}</p>
                                        <span>{event.calendar.jobTime}</span>
                                        <span>{event.calendar.jobPlace}</span>
                                        <span>{event.doctor}</span>
                                    </div>
                                );
                            })}
                    </td>
                    <td>
                        <div className={clsx(styles.date)}>{currentWeek.days[2].date}</div>
                        {wedDayEvent &&
                            wedDayEvent.map((event) => {
                                return (
                                    <div className={clsx(styles.event)} style={{ backgroundColor: randomColor() }}>
                                        <p>{event.calendar.jobName}</p>
                                        <span>{event.calendar.jobTime}</span>
                                        <span>{event.calendar.jobPlace}</span>
                                        <span>{event.doctor}</span>
                                    </div>
                                );
                            })}
                    </td>
                    <td>
                        <div className={clsx(styles.date)}>{currentWeek.days[3].date}</div>
                        {thuDayEvent &&
                            thuDayEvent.map((event) => {
                                return (
                                    <div className={clsx(styles.event)} style={{ backgroundColor: randomColor() }}>
                                        <p>{event.calendar.jobName}</p>
                                        <span>{event.calendar.jobTime}</span>
                                        <span>{event.calendar.jobPlace}</span>
                                        <span>{event.doctor}</span>
                                    </div>
                                );
                            })}
                    </td>
                    <td>
                        <div className={clsx(styles.date)}>{currentWeek.days[4].date}</div>
                        {friDayEvent &&
                            friDayEvent.map((event) => {
                                return (
                                    <div className={clsx(styles.event)} style={{ backgroundColor: randomColor() }}>
                                        <p>{event.calendar.jobName}</p>
                                        <span>{event.calendar.jobTime}</span>
                                        <span>{event.calendar.jobPlace}</span>
                                        <span>{event.doctor}</span>
                                    </div>
                                );
                            })}
                    </td>
                    <td>
                        <div className={clsx(styles.date)}>{currentWeek.days[5].date}</div>
                        {satDayEvent &&
                            satDayEvent.map((event) => {
                                return (
                                    <div className={clsx(styles.event)} style={{ backgroundColor: randomColor() }}>
                                        <p>{event.calendar.jobName}</p>
                                        <span>{event.calendar.jobTime}</span>
                                        <span>{event.calendar.jobPlace}</span>
                                        <span>{event.doctor}</span>
                                    </div>
                                );
                            })}
                    </td>
                    <td>
                        <div className={clsx(styles.date)}>{currentWeek.days[6].date}</div>
                        {sunDayEvent &&
                            sunDayEvent.map((event) => {
                                return (
                                    <div className={clsx(styles.event)} style={{ backgroundColor: randomColor() }}>
                                        <p>{event.calendar.jobName}</p>
                                        <span>{event.calendar.jobTime}</span>
                                        <span>{event.calendar.jobPlace}</span>
                                        <span>{event.doctor}</span>
                                    </div>
                                );
                            })}
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default CalendarWeek;
