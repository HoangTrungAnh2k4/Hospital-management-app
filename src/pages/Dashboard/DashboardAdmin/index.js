import clsx from 'clsx';
import styles from './DashboardAmin.module.scss';
import { useEffect, useRef, useState } from 'react';
import CalendarWeek from '~/components/Calendar/CalendarWeek';
import { useNavigate } from 'react-router-dom';
import { database } from '~/firebase';
import { addDoc, collection, getDocs, orderBy, query, where, doc, deleteDoc } from 'firebase/firestore';
import { set } from 'date-fns';

function Chart1({ countAge }) {
    return (
        <div className={clsx(styles.chart_1)}>
            <p className={clsx(styles.header)}>Biểu đồ độ tuổi</p>
            <div
                className={clsx(styles.chart1)}
                style={{
                    background: `conic-gradient( 
                        var(--color4) 0deg, 
                        var(--color4) ${countAge[3] * 3.6}deg, 
                        var(--color1) ${countAge[3] * 3.6}deg, 
                        var(--color1)  ${countAge[4] * 3.6 + countAge[3] * 3.6}deg,
                        var(--color2)  ${countAge[4] * 3.6 + countAge[3] * 3.6}deg,
                        var(--color2)  ${countAge[5] * 3.6}deg)`,
                }}
            >
                <div className={styles.center}>{countAge[6]}</div>
            </div>
            <div className={clsx(styles.detail1)}>
                <div className={clsx(styles.item)}>
                    <div className={clsx(styles.wrap)}>
                        <div className={clsx(styles.dot1)}></div>
                        <span>0-14 tuổi</span>
                    </div>
                    <span className={clsx(styles.quantity1)}>
                        {countAge[3]}% ({countAge[0]})
                    </span>
                </div>
                <div className={clsx(styles.item)}>
                    <div className={clsx(styles.wrap)}>
                        <div className={clsx(styles.dot2)}></div>
                        <span>15-64 tuổi</span>
                    </div>
                    <span className={clsx(styles.quantity2)}>
                        {countAge[4]}% ({countAge[1]})
                    </span>
                </div>
                <div className={clsx(styles.item)}>
                    <div className={clsx(styles.wrap)}>
                        <div className={clsx(styles.dot3)}></div>
                        <span>&gt; 65 tuổi</span>
                    </div>
                    <span className={clsx(styles.quantity3)}>
                        {countAge[5]}% ({countAge[2]})
                    </span>
                </div>
            </div>
        </div>
    );
}

function Chart2({ countBlood }) {
    console.log(countBlood);
    return (
        <div className={clsx(styles.chart_2)}>
            <p className={clsx(styles.header)}>Kho máu</p>

            {/* chart */}
            <div className={clsx(styles.chart2)}>
                <div className={clsx(styles.bloodWrap)}>
                    <div className={clsx(styles.bloodCol)}></div>
                    <p className={clsx(styles.type)}>A+</p>
                </div>
                <div className={clsx(styles.bloodWrap)}>
                    <div className={clsx(styles.bloodCol)}></div>
                    <p className={clsx(styles.type)}>A-</p>
                </div>
                <div className={clsx(styles.bloodWrap)}>
                    <div className={clsx(styles.bloodCol)}></div>
                    <p className={clsx(styles.type)}>B+</p>
                </div>
                <div className={clsx(styles.bloodWrap)}>
                    <div className={clsx(styles.bloodCol)}></div>
                    <p className={clsx(styles.type)}>B-</p>
                </div>
                <div className={clsx(styles.bloodWrap)}>
                    <div className={clsx(styles.bloodCol)}></div>
                    <p className={clsx(styles.type)}>O+</p>
                </div>
                <div className={clsx(styles.bloodWrap)}>
                    <div className={clsx(styles.bloodCol)}></div>
                    <p className={clsx(styles.type)}>O-</p>
                </div>
                <div className={clsx(styles.bloodWrap)}>
                    <div className={clsx(styles.bloodCol)}></div>
                    <p className={clsx(styles.type)}>AB+</p>
                </div>
                <div className={clsx(styles.bloodWrap)}>
                    <div className={clsx(styles.bloodCol)}></div>
                    <p className={clsx(styles.type)}>AB-</p>
                </div>
            </div>
            {/* detail */}
            <div className={clsx(styles.detail2)}>
                <div className={clsx(styles.item)}>
                    <div className={clsx(styles.wrap)}>
                        <div className={clsx(styles.dot)}></div>
                        <span>A+</span>
                    </div>
                    <span className={clsx(styles.quantity)}>23% (427)</span>
                </div>
                <div className={clsx(styles.item)}>
                    <div className={clsx(styles.wrap)}>
                        <div className={clsx(styles.dot)}></div>
                        <span>B+</span>
                    </div>
                    <span className={clsx(styles.quantity)}>23% (427)</span>
                </div>
                <div className={clsx(styles.item)}>
                    <div className={clsx(styles.wrap)}>
                        <div className={clsx(styles.dot)}></div>
                        <span>O+</span>
                    </div>
                    <span className={clsx(styles.quantity)}>23% (427)</span>
                </div>
                <div className={clsx(styles.item)}>
                    <div className={clsx(styles.wrap)}>
                        <div className={clsx(styles.dot)}></div>
                        <span>AB+</span>
                    </div>
                    <span className={clsx(styles.quantity)}>23% (427)</span>
                </div>

                <div className={clsx(styles.item)}>
                    <div className={clsx(styles.wrap)}>
                        <div className={clsx(styles.dot)}></div>
                        <span>A-</span>
                    </div>
                    <span className={clsx(styles.quantity)}>23% (427)</span>
                </div>

                <div className={clsx(styles.item)}>
                    <div className={clsx(styles.wrap)}>
                        <div className={clsx(styles.dot)}></div>
                        <span>B-</span>
                    </div>
                    <span className={clsx(styles.quantity)}>23% (427)</span>
                </div>

                <div className={clsx(styles.item)}>
                    <div className={clsx(styles.wrap)}>
                        <div className={clsx(styles.dot)}></div>
                        <span>O-</span>
                    </div>
                    <span className={clsx(styles.quantity)}>23% (427)</span>
                </div>
                <div className={clsx(styles.item)}>
                    <div className={clsx(styles.wrap)}>
                        <div className={clsx(styles.dot)}></div>
                        <span>AB-</span>
                    </div>
                    <span className={clsx(styles.quantity)}>23% (427)</span>
                </div>
            </div>
        </div>
    );
}

function PatientQuantity({ countAge, countBlood, quantityPatient }) {
    return (
        <div className={clsx(styles.quantityPatient)}>
            {/* quantity box */}
            <div className={clsx(styles.row1)}>
                <div className={clsx(styles.boxInfor, styles.khoa1)}>
                    <div className={clsx(styles.icon)}>
                        <i class="fa-solid fa-lungs"></i>
                    </div>
                    <div>
                        <p>Khoa nội</p>
                        <span>{quantityPatient[0]}/45</span>
                    </div>
                </div>
                <div className={clsx(styles.boxInfor, styles.khoa2)}>
                    <div className={clsx(styles.icon)}>
                        <i class="fa-solid fa-bandage"></i>
                    </div>
                    <div>
                        <p>Khoa ngoại</p>
                        <span>{quantityPatient[1]}/38</span>
                    </div>
                </div>
                <div className={clsx(styles.boxInfor, styles.khoa3)}>
                    <div className={clsx(styles.icon)}>
                        <i class="fa-solid fa-baby-carriage"></i>
                    </div>
                    <div>
                        <p>Khoa nhi</p>
                        <span>{quantityPatient[2]}/50</span>
                    </div>
                </div>
                <div className={clsx(styles.boxInfor, styles.khoa4)}>
                    <div className={clsx(styles.icon)}>
                        <i class="fa-solid fa-person-pregnant"></i>
                    </div>
                    <div>
                        <p>Khoa sản</p>
                        <span>{quantityPatient[3]}/40</span>
                    </div>
                </div>
                <div className={clsx(styles.boxInfor, styles.khoa5)}>
                    <div className={clsx(styles.icon)}>
                        <i className="fa-solid fa-bacteria"></i>
                    </div>
                    <div>
                        <p>Khoa truyền nhiễm</p>
                        <span>{quantityPatient[4]}/56</span>
                    </div>
                </div>
            </div>

            {/* chart */}
            <div className={clsx(styles.boxChart)}>
                <Chart1 countAge={countAge} />

                <Chart2 countBlood={countBlood} />
            </div>
        </div>
    );
}

function BoardNotify({ listNotify }) {
    const addNotify = useRef();
    const [reload, setReload] = useState(0);

    function reloadBoard() {
        reload === 0 ? setReload(1) : setReload(0);
    }

    useEffect(() => {
        addNotify.current.onclick = () => {
            const addBtn = document.querySelector(`.${styles.addNotify}`);
            addBtn.style.display = 'block';

            const textarea = document.querySelector(`.${styles.addNotify} textarea`);
            textarea.focus();
        };
    }, []);

    useEffect(() => {
        const removeBtn = document.querySelector(`.${styles.removeBtn}`);
        const listNotifyRemove = [];

        removeBtn.onclick = () => {
            const listNotify = document.querySelectorAll(`.${styles.notify} input[type="checkbox"]`);
            listNotify.forEach((notify) => {
                if (notify.checked) {
                    listNotifyRemove.push(notify.parentElement.innerText);
                }
            });

            async function removeNotify() {
                listNotifyRemove.forEach(async (notify) => {
                    const querySnapshot = await getDocs(collection(database, 'Notifications'));
                    querySnapshot.forEach((doc) => {
                        if (doc.data().title === notify) {
                            deleteDoc(doc.ref);
                        }
                    });
                });
            }
            removeNotify();
        };
        // delete footer button with staff
        if (localStorage.getItem('auth') === 'staff') {
            const footer = document.querySelector(`.${styles.notify__footer}`);
            footer.style.display = 'none';
        }
    }, []);

    return (
        <div className={clsx(styles.notify)}>
            <header className={clsx(styles.notify__header)}>Thông báo chung</header>
            <main className={clsx(styles.notify__main)}>
                <NotifyList listNotify={listNotify} />

                <footer className={clsx(styles.notify__footer)}>
                    <button ref={addNotify} className={clsx(styles.addBtn, styles.btn)} type="button">
                        Thêm
                    </button>
                    <button className={clsx(styles.removeBtn)} type="button">
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

            notifies.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
            setListNotify(notifies);
        }
        getNotify();
    }, [listNotify]);

    return (
        <main className={clsx(styles.notify_list)}>
            <ul className={clsx(styles.ul__notice)}>
                {listNotify.map((notify, index) => {
                    return (
                        <li key={index} className={clsx(styles.item)}>
                            <div className={clsx('container mt-3')}>
                                <div className="mt-4  rounded">
                                    <li className={clsx(styles.index)}>
                                        <div className={clsx(styles.icon)}>
                                            <i class="fa-solid fa-user"></i>
                                        </div>
                                        <div className={clsx(styles.content)}>
                                            <div className={clsx(styles.row5)}>
                                                <span>Admin</span>
                                                <span className={clsx(styles.date)}>{notify.date}</span>
                                            </div>
                                        </div>
                                    </li>

                                    <div className={clsx(styles.row6)}>
                                        <h4>
                                            {notify.title}
                                            <input type="checkbox" />
                                        </h4>
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
            const addNotify = document.querySelector(`.${styles.addNotify}`);
            addNotify.style.display = 'none';
        };
    }, []);

    async function handleAddNotify() {
        const title = document.querySelector(`.${styles.addNotify} input`).value;
        const content = document.querySelector(`.${styles.addNotify} textarea`).value;

        document.querySelector(`.${styles.addNotify} textarea`).value = '';
        document.querySelector(`.${styles.addNotify} input`).value = '';

        if (title !== '' || content !== '') {
            await addDoc(collection(database, 'Notifications'), {
                title: title,
                content: content,
                date: new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString(),
            });

            reload();
        } else {
            alert('Hãy nhập đầy đủ thông tin');
        }
    }

    return (
        <div className={clsx(styles.addNotify)}>
            <div className={styles.wrap}>
                <header>
                    <p>Viết thông báo</p>
                    <button ref={closeNotify}>
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </header>
                <main>
                    <input className={clsx(styles.title)} type="text" placeholder="Title" />
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

    // get age of patients from firebase
    const [countAge, setCountAge] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [quantityPatient, setQuantityPatient] = useState([0, 0, 0, 0, 0]);
    const [countBlood, setCountBlood] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    useEffect(() => {
        async function getAge() {
            const querySnapshot = await getDocs(collection(database, 'Patients'));
            let cntAge = [0, 0, 0, 0, 0, 0, 0];
            let quantityPatient = [0, 0, 0, 0, 0];

            querySnapshot.forEach((doc) => {
                // count age
                cntAge[6]++;
                const birthDay = new Date(doc.data().Birthday.toDate()).getFullYear();
                if (birthDay >= 2010) {
                    cntAge[0]++;
                } else if (birthDay <= 2010 && birthDay >= 1959) {
                    cntAge[1]++;
                } else {
                    cntAge[2]++;
                }

                // count quantity patient
                if (doc.data().Department === 'Khoa nội') {
                    quantityPatient[0]++;
                } else if (doc.data().Department === 'Khoa ngoại') {
                    quantityPatient[1]++;
                } else if (doc.data().Department === 'Khoa nhi') {
                    quantityPatient[2]++;
                } else if (doc.data().Department === 'Khoa sản') {
                    quantityPatient[3]++;
                } else {
                    quantityPatient[4]++;
                }
            });

            cntAge[3] = ((cntAge[0] / cntAge[6]) * 100).toFixed(0);
            cntAge[4] = ((cntAge[1] / cntAge[6]) * 100).toFixed(0);
            cntAge[5] = ((cntAge[2] / cntAge[6]) * 100).toFixed(0);

            setCountAge([cntAge[0], cntAge[1], cntAge[2], cntAge[3], cntAge[4], cntAge[5], cntAge[6]]);
            setQuantityPatient(quantityPatient);
        }

        async function getBlood() {
            const querySnapshot = await getDocs(collection(database, 'blood'));
            let cntBlood = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            querySnapshot.forEach((doc) => {
                console.log(doc.data().type,doc.data().quantity);
                // count age
                cntBlood[16]++;
                switch (doc.data().type) {
                    case 'A+':
                        cntBlood[0]+= doc.data().quantity;
                        break;
                    case 'A-':
                        cntBlood[1]+= doc.data().quantity;
                        break;
                    case 'B+':
                        cntBlood[2]+= doc.data().quantity;
                        break;
                    case 'B-':
                        cntBlood[3]+= doc.data().quantity;
                        break;
                    case 'O+':
                        cntBlood[4]+= doc.data().quantity;
                        break;
                    case 'O-':
                        cntBlood[5]+= doc.data().quantity;
                        break;
                    case 'AB+':
                        cntBlood[6]+= doc.data().quantity;
                        break;
                    case 'AB-':
                        cntBlood[7]+= doc.data().quantity;
                        break;
                    default:
                        break;
                }
            });

            cntBlood[8] = ((cntBlood[0] / cntBlood[16]) * 100).toFixed(0);
            cntBlood[9] = ((cntBlood[1] / cntBlood[16]) * 100).toFixed(0);
            cntBlood[10] = ((cntBlood[2] / cntBlood[16]) * 100).toFixed(0);
            cntBlood[11] = ((cntBlood[3] / cntBlood[16]) * 100).toFixed(0);
            cntBlood[12] = ((cntBlood[4] / cntBlood[16]) * 100).toFixed(0);
            cntBlood[13] = ((cntBlood[5] / cntBlood[16]) * 100).toFixed(0);
            cntBlood[14] = ((cntBlood[6] / cntBlood[16]) * 100).toFixed(0);
            cntBlood[15] = ((cntBlood[7] / cntBlood[16]) * 100).toFixed(0);

            setCountBlood(cntBlood);
        }
        getBlood();
        getAge();
    }, []);

    return (
        <div className={clsx(styles.wrapper)}>
            {/* quantity patient and notification board */}
            <div className={clsx(styles.row1)}>
                <PatientQuantity countAge={countAge} countBlood={countBlood} quantityPatient={quantityPatient} />

                {/* Notification board */}
                <div className={clsx(styles.boardNotifyWraper)}>
                    <BoardNotify />
                </div>
            </div>

            <header className={clsx(styles.headerCalendar)}>Lịch làm việc trong tuần</header>

            <div className={clsx(styles.calendar)}>
                <CalendarWeek />
            </div>

            <ModalAddNotify reload={reload} />
        </div>
    );
}

export { BoardNotify };
export default DashboardAdmin;
