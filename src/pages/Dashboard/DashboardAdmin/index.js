import clsx from 'clsx';
import style from './DashboardAmin.module.scss';

function DashboardAdmin() {
    return (
        <div className={clsx(style.wrapper)}>
            {/* quantity patient and notification board */}
            <div className={clsx(style.row1)}>
                {/* box quantity patient */}
                <div className={clsx(style.quantityPatient)}>
                    <div className={clsx(style.boxInfor)}>
                        <div className={clsx(style.icon)}>
                            <i class="fa-solid fa-lungs"></i>
                        </div>
                        <div>
                            <p>Khoa nội</p>
                            <span>23/45</span>
                        </div>
                    </div>
                    <div className={clsx(style.boxInfor)}>
                        <div className={clsx(style.icon)}>
                            <i class="fa-solid fa-bandage"></i>
                        </div>
                        <div>
                            <p>Khoa ngoại</p>
                            <span>20/38</span>
                        </div>
                    </div>
                    <div className={clsx(style.boxInfor)}>
                        <div className={clsx(style.icon)}>
                            <i class="fa-solid fa-baby-carriage"></i>
                        </div>
                        <div>
                            <p>Khoa nhi</p>
                            <span>12/50</span>
                        </div>
                    </div>
                    <div className={clsx(style.boxInfor)}>
                        <div className={clsx(style.icon)}>
                            <i class="fa-solid fa-person-pregnant"></i>
                        </div>
                        <div>
                            <p>Khoa sản</p>
                            <span>9/40</span>
                        </div>
                    </div>
                    <div className={clsx(style.boxInfor)}>
                        <div className={clsx(style.icon)}>
                            <i class="fa-solid fa-bacteria"></i>
                        </div>
                        <div>
                            <p>Khoa truyền nhiễm</p>
                            <span>36/56</span>
                        </div>
                    </div>
                </div>

                {/* Notification board */}
                <div className={clsx(style.notify)}>
                    <header>Thông báo chung</header>
                    <main></main>
                </div>
            </div>
        </div>
    );
}

export default DashboardAdmin;
