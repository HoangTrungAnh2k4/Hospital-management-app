import styles from './CalendarWeek.module.scss';
import clsx from 'clsx';

function CalendarWeek({ children }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.buffer)}></div>
            <table>
                <tr>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                </tr>

                <tr>
                    <td>
                        <div className={clsx(styles.date)}>17</div>
                        <div className={clsx(styles.event)} style={{ backgroundColor: 'aquamarine' }}>
                            <p>Phẫu thuật</p>
                            <span>8:00 - 13:30</span>
                            <span>H6-408</span>
                            <span></span>
                        </div>
                    </td>
                    <td>
                        <div className={clsx(styles.date)}>18</div>
                    </td>
                    <td>
                        <div className={clsx(styles.date)}>19</div>
                    </td>
                    <td>
                        <div className={clsx(styles.date)}>20</div>
                        <div className={clsx(styles.event)} style={{ backgroundColor: 'red' }}>
                            <p>Phẫu thuật</p>
                            <span>8:00 - 13:30</span>
                            <span>H6-408</span>
                            <span></span>
                        </div>
                        <div className={clsx(styles.event)} style={{ backgroundColor: 'orange' }}>
                            <p>Phẫu thuật</p>
                            <span>8:00 - 13:30</span>
                            <span>H6-408</span>
                            <span></span>
                        </div>
                    </td>
                    <td>
                        <div className={clsx(styles.date)}>21</div>
                    </td>
                    <td>
                        <div className={clsx(styles.date)}>22</div>
                        <div className={clsx(styles.event)} style={{ backgroundColor: 'burlywood' }}>
                            <p>Phẫu thuật</p>
                            <span>8:00 - 13:30</span>
                            <span>H6-408</span>
                            <span></span>
                        </div>
                        <div className={clsx(styles.event)} style={{ backgroundColor: 'cornflowerblue' }}>
                            <p>Phẫu thuật</p>
                            <span>8:00 - 13:30</span>
                            <span>H6-408</span>
                            <span></span>
                        </div>
                    </td>
                    <td>
                        <div className={clsx(styles.date)}>23</div>
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default CalendarWeek;
