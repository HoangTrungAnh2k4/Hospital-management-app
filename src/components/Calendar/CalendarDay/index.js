import styles from './CalendarDay.module.scss';
import clsx from 'clsx';

function CalendarDay() {
    return (
        <div className={clsx(styles.wrapper)}>
            <table>
                <tr>
                    <th>Monday</th>
                </tr>
                <td>
                    <div className={clsx(styles.date)}>17</div>
                    <div className={clsx(styles.event)} style={{ backgroundColor: 'aquamarine' }}>
                        <p>Phẫu thuật</p>
                        <span>8:00 - 13:30</span>
                        <span>H6-408</span>
                        <span>Hoang trung anh id:2210055</span>
                    </div>
                    <div className={clsx(styles.event)} style={{ backgroundColor: 'cornflowerblue' }}>
                        <p>Phẫu thuật</p>
                        <span>8:00 - 13:30</span>
                        <span>H6-408</span>
                        <span>Hoang trung anh id:2210055</span>
                    </div>
                </td>
            </table>
        </div>
    );
}

export default CalendarDay;
