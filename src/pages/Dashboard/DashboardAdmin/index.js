import clsx from 'clsx';
import style from './DashboardAmin.module.scss';
import { useEffect, useRef, useState } from 'react';

function PatientQuantity() {
    return (
        <div className={clsx(style.quantityPatient)}>
            {/* quantity box */}
            <div>
                <div className={clsx(style.boxInfor, style.khoa1)}>
                    <div className={clsx(style.icon)}>
                        <i class="fa-solid fa-lungs"></i>
                    </div>
                    <div>
                        <p>Khoa nội</p>
                        <span>23/45</span>
                    </div>
                </div>
                <div className={clsx(style.boxInfor, style.khoa2)}>
                    <div className={clsx(style.icon)}>
                        <i class="fa-solid fa-bandage"></i>
                    </div>
                    <div>
                        <p>Khoa ngoại</p>
                        <span>20/38</span>
                    </div>
                </div>
                <div className={clsx(style.boxInfor, style.khoa3)}>
                    <div className={clsx(style.icon)}>
                        <i class="fa-solid fa-baby-carriage"></i>
                    </div>
                    <div>
                        <p>Khoa nhi</p>
                        <span>12/50</span>
                    </div>
                </div>
                <div className={clsx(style.boxInfor, style.khoa4)}>
                    <div className={clsx(style.icon)}>
                        <i class="fa-solid fa-person-pregnant"></i>
                    </div>
                    <div>
                        <p>Khoa sản</p>
                        <span>9/40</span>
                    </div>
                </div>
                <div className={clsx(style.boxInfor, style.khoa5)}>
                    <div className={clsx(style.icon)}>
                        <i className="fa-solid fa-bacteria"></i>
                    </div>
                    <div>
                        <p>Khoa truyền nhiễm</p>
                        <span>36/56</span>
                    </div>
                </div>
            </div>

            {/* chart */}
            <div className={clsx(style.boxChart)}>
                <div className={clsx(style.chart)}>
                    <div className={style.center}>1244</div>
                </div>
                <div className={clsx(style.detail)}>
                    <div className={clsx(style.item)}>
                        <div className={clsx(style.wrap)}>
                            <div className={clsx(style.dot1)}></div>
                            <span>0-14 tuổi</span>
                        </div>
                        <span className={clsx(style.quantity1)}>23% (427)</span>
                    </div>
                    <div className={clsx(style.item)}>
                        <div className={clsx(style.wrap)}>
                            <div className={clsx(style.dot2)}></div>
                            <span>15-64 tuổi</span>
                        </div>
                        <span className={clsx(style.quantity2)}>23% (427)</span>
                    </div>
                    <div className={clsx(style.item)}>
                        <div className={clsx(style.wrap)}>
                            <div className={clsx(style.dot3)}></div>
                            <span>&gt; 65 tuổi</span>
                        </div>
                        <span className={clsx(style.quantity3)}>23% (427)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BoardNotify({ listNotify }) {
    const addNotify = useRef();
    useEffect(() => {
        addNotify.current.onclick = () => {
            const addBtn = document.querySelector(`.${style.addNotify}`);
            addBtn.style.display = 'block';

            const textarea = document.querySelector(`.${style.addNotify} textarea`);
            textarea.focus();
        };
    }, []);

    useEffect(() => {
        const removeBtn = document.querySelector(`.${style.removeBtn}`);
        removeBtn.onclick = () => {
            const listNotify = document.querySelectorAll(`.${style.notify} input[type="checkbox"]`);
            listNotify.forEach((notify) => {
                if (notify.checked) {
                    notify.parentElement.parentElement.parentElement.remove();
                }
            });
        };
    }, []);

    return (
        <div className={clsx(style.notify)}>
            <header className={clsx(style.notify__header)}>Thông báo chung</header>
            <main className={clsx(style.notify__main)}>
                <NotifyList listNotify={listNotify} />

                <footer className={clsx(style.notify__footer)}>
                    <button ref={addNotify} className={clsx(style.addBtn, style.btn)} type="button">
                        Thêm
                    </button>
                    <button className={clsx(style.removeBtn)} type="button">
                        Xóa
                    </button>
                </footer>
            </main>
        </div>
    );
}

function NotifyList({ listNotify }) {
    return (
        <ul>
            {listNotify.map((notify, index) => {
                return (
                    <li key={index}>
                        <div className={clsx(style.icon)}>
                            <i class="fa-solid fa-user"></i>
                        </div>
                        <div className={clsx(style.content)}>
                            <div className={clsx(style.row1)}>
                                <span>Admin</span>
                                <span className={clsx(style.date)}>{notify.date}</span>
                            </div>
                            <div className={clsx(style.row2)}>
                                <p>{notify.content}</p>
                                <input type="checkbox" />
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

function ModalAddNotify({ addNotification }) {
    const closeNotify = useRef();

    useEffect(() => {
        closeNotify.current.onclick = () => {
            const addNotify = document.querySelector(`.${style.addNotify}`);
            addNotify.style.display = 'none';
        };
    }, []);

    const handleAddNotify = () => {
        const message = document.querySelector(`.${style.addNotify} textarea`).value;

        if (message) {
            addNotification(message);
            document.querySelector(`.${style.addNotify} textarea`).value = '';
        }
    };

    return (
        <div className={clsx(style.addNotify)}>
            <div className={style.wrap}>
                <header>
                    <p>Viết thông báo</p>
                    <button ref={closeNotify}>
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </header>
                <main>
                    <textarea name="message" rows="4" cols="50" placeholder="Nhập thông báo"></textarea>
                </main>
                <footer>
                    <button type="button" className={clsx(style.rerender)} onClick={handleAddNotify}>
                        Thêm
                    </button>
                </footer>
            </div>
        </div>
    );
}

function DashboardAdmin() {
    const [listNotify, setListNotify] = useState([]);

    const addNotification = (message) => {
        setListNotify([
            {
                content: message,
                date: new Date().toLocaleDateString(),
            },
            ...listNotify,
        ]);
    };

    return (
        <div className={clsx(style.wrapper)}>
            {/* quantity patient and notification board */}
            <div className={clsx(style.row1)}>
                <PatientQuantity />

                {/* Notification board */}
                <BoardNotify listNotify={listNotify} />
            </div>

            <ModalAddNotify addNotification={addNotification} />
        </div>
    );
}

export default DashboardAdmin;
