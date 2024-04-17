import clsx from 'clsx';
import style from './DashboardAmin.module.scss';
import { useEffect, useRef, useState } from 'react';
import CalendarWeek from '~/components/Calendar/CalendarWeek';
import { useNavigate } from 'react-router-dom';
import { database } from '~/firebase';
import { addDoc, collection, getDocs, orderBy } from 'firebase/firestore';

function Chart1() {
    return (
        <div className={clsx(style.chart_1)}>
            <p className={clsx(style.header)}>Biểu đồ độ tuổi</p>
            <div className={clsx(style.chart1)}>
                <div className={style.center}>1244</div>
            </div>
            <div className={clsx(style.detail1)}>
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
    );
}

function Chart2() {
    return (
        <div className={clsx(style.chart_2)}>
            <p className={clsx(style.header)}>Kho máu</p>

            {/* chart */}
            <div className={clsx(style.chart2)}>
                <div className={clsx(style.bloodWrap)}>
                    <div className={clsx(style.bloodCol)}></div>
                    <p className={clsx(style.type)}>A+</p>
                </div>
                <div className={clsx(style.bloodWrap)}>
                    <div className={clsx(style.bloodCol)}></div>
                    <p className={clsx(style.type)}>A-</p>
                </div>
                <div className={clsx(style.bloodWrap)}>
                    <div className={clsx(style.bloodCol)}></div>
                    <p className={clsx(style.type)}>B+</p>
                </div>
                <div className={clsx(style.bloodWrap)}>
                    <div className={clsx(style.bloodCol)}></div>
                    <p className={clsx(style.type)}>B-</p>
                </div>
                <div className={clsx(style.bloodWrap)}>
                    <div className={clsx(style.bloodCol)}></div>
                    <p className={clsx(style.type)}>O+</p>
                </div>
                <div className={clsx(style.bloodWrap)}>
                    <div className={clsx(style.bloodCol)}></div>
                    <p className={clsx(style.type)}>O-</p>
                </div>
                <div className={clsx(style.bloodWrap)}>
                    <div className={clsx(style.bloodCol)}></div>
                    <p className={clsx(style.type)}>AB+</p>
                </div>
                <div className={clsx(style.bloodWrap)}>
                    <div className={clsx(style.bloodCol)}></div>
                    <p className={clsx(style.type)}>AB-</p>
                </div>
            </div>
            {/* detail */}
            <div className={clsx(style.detail2)}>
                <div className={clsx(style.item)}>
                    <div className={clsx(style.wrap)}>
                        <div className={clsx(style.dot)}></div>
                        <span>A+</span>
                    </div>
                    <span className={clsx(style.quantity)}>23% (427)</span>
                </div>
                <div className={clsx(style.item)}>
                    <div className={clsx(style.wrap)}>
                        <div className={clsx(style.dot)}></div>
                        <span>B+</span>
                    </div>
                    <span className={clsx(style.quantity)}>23% (427)</span>
                </div>
                <div className={clsx(style.item)}>
                    <div className={clsx(style.wrap)}>
                        <div className={clsx(style.dot)}></div>
                        <span>O+</span>
                    </div>
                    <span className={clsx(style.quantity)}>23% (427)</span>
                </div>
                <div className={clsx(style.item)}>
                    <div className={clsx(style.wrap)}>
                        <div className={clsx(style.dot)}></div>
                        <span>AB+</span>
                    </div>
                    <span className={clsx(style.quantity)}>23% (427)</span>
                </div>

                <div className={clsx(style.item)}>
                    <div className={clsx(style.wrap)}>
                        <div className={clsx(style.dot)}></div>
                        <span>A-</span>
                    </div>
                    <span className={clsx(style.quantity)}>23% (427)</span>
                </div>

                <div className={clsx(style.item)}>
                    <div className={clsx(style.wrap)}>
                        <div className={clsx(style.dot)}></div>
                        <span>B-</span>
                    </div>
                    <span className={clsx(style.quantity)}>23% (427)</span>
                </div>

                <div className={clsx(style.item)}>
                    <div className={clsx(style.wrap)}>
                        <div className={clsx(style.dot)}></div>
                        <span>O-</span>
                    </div>
                    <span className={clsx(style.quantity)}>23% (427)</span>
                </div>
                <div className={clsx(style.item)}>
                    <div className={clsx(style.wrap)}>
                        <div className={clsx(style.dot)}></div>
                        <span>AB-</span>
                    </div>
                    <span className={clsx(style.quantity)}>23% (427)</span>
                </div>
            </div>
        </div>
    );
}

function PatientQuantity() {
    return (
        <div className={clsx(style.quantityPatient)}>
            {/* quantity box */}
            <div className={clsx(style.row1)}>
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
                <Chart1 />

                <Chart2 />
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

        // delete footer button with staff
        const footer = document.querySelector(`.${style.notify__footer}`);
        if (localStorage.getItem('auth') === 'staff') {
            footer.style.display = 'none';
        }
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

function NotifyList() {
    let [listNotify, setListNotify] = useState([]);

    // get notify from firebase
    useEffect(() => {
        async function getNotify() {
            const querySnapshot = await getDocs(collection(database, 'Notifications'), orderBy('date', 'desc'));
            let notifies = [];
            querySnapshot.forEach((doc) => {
                notifies.push(doc.data());
            });

            setListNotify(notifies);
        }
        getNotify();
    }, []);

    return (
        <main className={clsx(style.notify_list)}>
            <ul className={clsx(style.ul__notice)}>
                {listNotify.map((notify, index) => {
                    return (
                        <li key={index} className={clsx(style.item)}>
                            <div className={clsx('container mt-3')}>
                                <div className="mt-4  rounded">
                                    <li className={clsx(style.index)}>
                                        <div className={clsx(style.icon)}>
                                            <i class="fa-solid fa-user"></i>
                                        </div>
                                        <div className={clsx(style.content)}>
                                            <div className={clsx(style.row5)}>
                                                <span>Admin</span>
                                                <span className={clsx(style.date)}>{notify.date}</span>
                                            </div>
                                        </div>
                                    </li>

                                    <div className={clsx(style.row6)}>
                                        <h4>{notify.title}</h4>
                                        <p>{notify.content}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}

function ModalAddNotify({ reload }) {
    const closeNotify = useRef();

    useEffect(() => {
        closeNotify.current.onclick = () => {
            const addNotify = document.querySelector(`.${style.addNotify}`);
            addNotify.style.display = 'none';
        };
    }, []);

    async function handleAddNotify() {
        const title = document.querySelector(`.${style.addNotify} input`).value;
        const content = document.querySelector(`.${style.addNotify} textarea`).value;

        document.querySelector(`.${style.addNotify} textarea`).value = '';
        document.querySelector(`.${style.addNotify} input`).value = '';

        await addDoc(collection(database, 'Notifications'), {
            title: title,
            content: content,
            date: new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString(),
        });

        reload();
    }

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
                    <input className={clsx(style.title)} type="text" placeholder="Title" />
                    <textarea name="message" rows="4" Cols="50" placeholder="Nhập thông báo"></textarea>
                </main>
                <footer>
                    <button type="button" onClick={handleAddNotify}>
                        Thêm
                    </button>
                </footer>
            </div>
        </div>
    );
}

function DashboardAdmin() {
    const navigate = useNavigate();
    const [varReload, setVarReload] = useState(0);

    function reload() {
        varReload === 0 ? setVarReload(1) : setVarReload(0);
    }

    // check auth
    useEffect(() => {
        if (localStorage.getItem('auth') !== 'admin') {
            navigate('/');
        }
    }, []);

    return (
        <div className={clsx(style.wrapper)}>
            {/* quantity patient and notification board */}
            <div className={clsx(style.row1)}>
                <PatientQuantity />

                {/* Notification board */}
                <div className={clsx(style.boardNotifyWraper)}>
                    <BoardNotify />
                </div>
            </div>

            <header className={clsx(style.headerCalendar)}>Lịch làm việc trong tuần</header>

            <div className={clsx(style.calendar)}>
                <CalendarWeek />
            </div>

            <ModalAddNotify reload={reload} />
        </div>
    );
}

export { BoardNotify };
export default DashboardAdmin;
