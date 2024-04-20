import clsx from 'clsx';
import style from './staffs.module.scss';
import React, { useState } from 'react';
// import { doctors_data } from './doctors_data';
// import { nurses_data } from './nurses_data';
import Calendar from 'src/components/Calendar/CalendarDay';
import { database } from '~/firebase';
import { collection, getDocs, addDoc, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { set } from 'date-fns';

function StaffsDisplay() {
    const [doctors_data, setDoctorsData] = useState([]);
    const [nurses_data, setNursesData] = useState([]);
    const [infor, setInfor] = useState({});
    const [hasInfor, setHasInfor] = useState(false);
    const [arrCalendar, setArrCalendar] = useState([]);
    const [ownPatients, setOwnPatients] = useState([]);
    const [reload, setReload] = useState(false);

    function reloadPage() {
        setReload(!reload);
    }

    useEffect(() => {
        async function getDoctors() {
            const querySnapshot = await getDocs(collection(database, 'Doctors'));
            let doctors = [];

            querySnapshot.forEach((doc) => {
                doctors.push(doc.data());
            });

            setDoctorsData(doctors);
        }

        async function getNurses() {
            const querySnapshot = await getDocs(collection(database, 'Nurses'));
            let nurses = [];

            querySnapshot.forEach((doc) => {
                nurses.push(doc.data());
            });
            setNursesData(nurses);
        }

        getNurses();
        getDoctors();

        setHasInfor(false);
        setInfor({});
    }, [reload]);

    async function showInfor(id) {
        const q = query(collection(database, 'Doctors'), where('id', '==', id));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty === false) {
            const tmp = querySnapshot.docs[0].data();

            const patients = [];
            const q2 = query(collection(database, 'Patients'), where('DoctorID', '==', id));
            const querySnapshot2 = await getDocs(q2);

            querySnapshot2.forEach((doc) => {
                patients.push(doc.data());
            });

            setOwnPatients(patients);
            setArrCalendar(tmp.calendar);
            setInfor(tmp);
            setHasInfor(true);

            return;
        }
        // --------------------- get nurses----------------------------------------
        const q2 = query(collection(database, 'Nurses'), where('id', '==', id));
        const querySnapshot2 = await getDocs(q2);

        if (querySnapshot2.empty === false) {
            const tmp = querySnapshot2.docs[0].data();
            setArrCalendar(tmp.calendar);
            setInfor(tmp);
        }
        setOwnPatients([{ ID: 'Không có bệnh nhân', Name: '' }]);
        setHasInfor(true);
    }

    async function addCalendar(job_name, job_time, job_place, job_date) {
        const newCalendar = {
            jobName: job_name,
            jobTime: job_time,
            jobPlace: job_place,
            jobDate: job_date,
        };
        // --------------------- add to doctors----------------------------------------
        const q = query(collection(database, 'Doctors'), where('id', '==', infor.id));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty === false) {
            const docRef = doc(database, 'Doctors', querySnapshot.docs[0].id);
            await updateDoc(docRef, {
                calendar: [newCalendar, ...querySnapshot.docs[0].data().calendar],
            });
            return;
        }
        // --------------------- add to nurses----------------------------------------
        const q2 = query(collection(database, 'Nurses'), where('id', '==', infor.id));
        const querySnapshot2 = await getDocs(q2);

        if (querySnapshot2.empty === false) {
            const docRef2 = doc(database, 'Nurses', querySnapshot2.docs[0].id);
            await updateDoc(docRef2, {
                calendar: [newCalendar, ...querySnapshot2.docs[0].data().calendar],
            });
        }
    }

    return (
        <div className={clsx(style.colum)}>
            {/* ----------------------------------- Danh sách nhân viên --------------------------------------------*/}
            <div className={clsx(style.col1)}>
                <div className={clsx(style.headerBox)}>
                    <h2>Bác sĩ</h2>
                </div>
                <AddStaffs />
                <SortTable data={doctors_data} showInfor={showInfor} />
                <div className={clsx(style.headerBox)}>
                    <h2>Y tá</h2>
                </div>
                <SortTable data={nurses_data} showInfor={showInfor} />
            </div>
            {/*---------------------------------------Thông tin nhân viên -----------------------------------------*/}
            <div className={clsx(style.col2)}>
                <div className={clsx(style.col2__row1)}>
                    <div className={clsx(style.defaultCard)}>
                        <div className={clsx('col-md-4', style.imgColum)}>
                            <img
                                src="https://community.swordsandravens.net/ext/dark1/memberavatarstatus/image/avatar.png"
                                className={clsx(style.myimg)}
                                alt="defaultimg"
                            />
                        </div>
                        <div className={clsx('col-md-8', style.bodyColum)}>
                            <div className={clsx('card-body', style.cardbody)}>
                                <div className={clsx(style.cardtitle)}>
                                    <h2 className={clsx('card-title', style.headerCard)}>Thông tin chi tiết</h2>
                                </div>
                                <div className={clsx('card-text', style.cardtext)}>
                                    <span style={{ fontWeight: 'bold' }}>Họ tên: </span>
                                    <span className={clsx(style.textInfor)}>{infor.fullName}</span> <br />
                                    <span style={{ fontWeight: 'bold' }}>Giới tính: </span>
                                    <span className={clsx(style.textInfor)}>{infor.gender}</span> <br />
                                    <span style={{ fontWeight: 'bold' }}>Ngày sinh: </span>
                                    <span className={clsx(style.textInfor)}>{infor.birthdate}</span> <br />
                                    <span style={{ fontWeight: 'bold' }}>Quê quán: </span>
                                    <span className={clsx(style.textInfor)}>{infor.hometown}</span> <br />
                                    <span style={{ fontWeight: 'bold' }}>Chuyên ngành: </span>
                                    <span className={clsx(style.textInfor)}>{infor.faculty}</span>
                                    <span style={{ marginLeft: '30px', fontWeight: 'bold' }}>Bằng cấp: </span>
                                    <span className={clsx(style.textInfor)}>{infor.degree}</span> <br />
                                    {/* <span style={{ fontWeight: 'bold' }}>Chức vụ: </span> <br /> */}
                                    <span style={{ fontWeight: 'bold' }}>Email: </span>
                                    <span className={clsx(style.textInfor)}>{infor.email}</span>
                                    <span style={{ marginLeft: '30px', fontWeight: 'bold' }}>SĐT: </span>
                                    <span className={clsx(style.textInfor)}>{infor.phone}</span> <br />
                                    <span style={{ fontWeight: 'bold' }}>Địa chỉ: </span>
                                    <span className={clsx(style.textInfor)}>{infor.address}</span> <br />
                                </div>
                            </div>
                            <EditInfoStaff id={infor.id} reloadPage={reloadPage} />
                        </div>
                    </div>
                </div>
                <div className={clsx(style.col2__row2)}>
                    {/* -------------------------------------------------- Calendar ------------------------------------------------ */}
                    <div className={clsx(style.col2__row2__col1)}>
                        <div className={clsx(style.headerBox)}>
                            <h2>Lịch</h2>
                        </div>
                        {hasInfor && <AddCalendar addCalendar={addCalendar} />}
                        {hasInfor && <Calendar arrCalendar={arrCalendar} />}
                    </div>
                    {/* -------------------------------------------------- Bệnh nhân ------------------------------------------------ */}
                    <div className={clsx(style.col2__row2__col2)}>
                        <div className={clsx(style.headerBox)}>
                            <h2>Bệnh nhân</h2>
                        </div>
                        {hasInfor && <PatientInfo patients={ownPatients} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

//--------------------------------------------------Thông tin bệnh nhân --------------------------------------------------------
function PatientInfo({ patients }) {
    
    patients.sort((a, b) => {
        return a.ID - b.ID;
    });

    return (
        <div>
            {/* ----------table infor patients */}
            <div className={clsx(style.PatientInfo)}>
                <div className={clsx(style.infoTable)}>
                    <table className={clsx(style.myTable)}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Họ tên</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients &&
                                patients.map((patient) => (
                                    <tr>
                                        <td>{patient.ID}</td>
                                        <td>{patient.Name}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
//-------------------------------------------------- ADD ------------------------------------------------------------------
function AddStaffs() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    async function generateId() {
        const querySnapshot = await getDocs(collection(database, 'Doctors'));
        const querySnapshot2 = await getDocs(collection(database, 'Nurses'));

        const newId = Math.floor(100000 + Math.random() * 900000);
        let newIdString = newId.toString();

        if (
            querySnapshot.docs.find((doc) => doc.id === newIdString) ||
            querySnapshot2.docs.find((doc) => doc.id === newIdString)
        ) {
            newIdString = generateId();
        } else {
            return newIdString;
        }
        return newIdString;
    }

    async function handleAdd() {
        const fullName = document.querySelector('input[name="fullName"]').value;
        const birthdate = document.querySelector('input[name=birthdate]').value;
        const email = document.querySelector('input[name=email]').value;
        const hometown = document.querySelector('input[name=hometown]').value;
        const phone = document.querySelector('input[name=phone]').value;
        const address = document.querySelector('input[name=address]').value;
        const faculty = document.querySelector('select').value;
        const degree = document.querySelector('input[name=degree]').value;

        var tmp1 = document.getElementsByName('gender');
        const gender = tmp1[0].checked ? 'male' : 'female';

        var tmp2 = document.getElementsByName('optradio');
        const job = tmp2[0].checked ? 'doctor' : 'nurse';

        if ([fullName, gender, faculty, birthdate, email, hometown, phone, address, job, degree].includes('')) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (['Khoa nội', 'Khoa ngoại', 'Khoa sản', 'Khoa nhi', 'Khoa truyền nhiễm'].indexOf(faculty) === -1) {
            alert('Chuyên ngành không hợp lệ');
            return;
        }

        if (job !== 'doctor' && job !== 'nurse') {
            alert('Chức vụ không hợp lệ');
            return;
        }

        document.querySelector('input[name="fullName"]').value = '';
        document.querySelector('input[name=gender]').value = '';
        document.querySelector('input[name=birthdate]').value = '';
        document.querySelector('input[name=email]').value = '';
        document.querySelector('input[name=hometown]').value = '';
        document.querySelector('input[name=phone]').value = '';
        document.querySelector('input[name=address]').value = '';
        document.querySelector('select').value = '';
        document.querySelector('input[name=degree]').value = '';

        const newId = await generateId();

        if (job === 'doctor') {
            await addDoc(collection(database, 'Doctors'), {
                id: newId,
                fullName: fullName,
                gender: gender,
                faculty: faculty,
                degree: degree,
                birthdate: birthdate,
                email: email,
                hometown: hometown,
                phone: phone,
                address: address,
                calendar: [],
            });
        } else if (job === 'nurse') {
            await addDoc(collection(database, 'Nurses'), {
                id: newId,
                fullName: fullName,
                gender: gender,
                faculty: faculty,
                degree: degree,
                birthdate: birthdate,
                email: email,
                hometown: hometown,
                phone: phone,
                address: address,
                calendar: [],
            });
        }
    }

    return (
        <div>
            <div className={clsx(style.AddButton)}>
                <button onClick={handleOpenModal} className={clsx(style.addButton)}>
                    Thêm nhân viên
                </button>
            </div>
            {showModal && (
                <div id="myModal" className={clsx(style.modal)}>
                    <div className={clsx(style.modalContent)}>
                        <div className={clsx(style.modalHeader)}>
                            <span onClick={handleCloseModal} className={clsx(style.close)}>
                                &times;
                            </span>
                            <h3>Điền thông tin nhân viên</h3>
                        </div>
                        <div className={clsx(style.modalBody)}>
                            <form>
                                <div class="row">
                                    <div class="col">
                                        {/* --------------fullName--------------- */}
                                        <div class="mb-3 mt-3">
                                            <label for="email" class="form-label">
                                                Họ và tên:
                                            </label>
                                            <input type="text" class="form-control" name="fullName" />
                                        </div>
                                        {/* ----------------gender--------------- */}
                                        <div class="mb-3" className={clsx(style.gender)}>
                                            <label class="form-label">Gioi tinh</label>
                                            <div class="form-check ms-4">
                                                <input
                                                    type="radio"
                                                    class="form-check-input"
                                                    id="male"
                                                    name="gender"
                                                    value="nam"
                                                />
                                                <label class="form-check-label" for="male">
                                                    Nam
                                                </label>
                                            </div>
                                            <div class="form-check ms-4">
                                                <input
                                                    type="radio"
                                                    class="form-check-input"
                                                    id="female"
                                                    name="gender"
                                                    value="nữ"
                                                />
                                                <label class="form-check-label" for="female">
                                                    {' '}
                                                    Nữ
                                                </label>
                                            </div>
                                        </div>

                                        {/* -----------role-------------------- */}
                                        <div class="mb-3">
                                            <label class="form-label">Vai trò: </label>
                                            <div class="form-check ms-4">
                                                <input
                                                    type="radio"
                                                    class="form-check-input"
                                                    id="Doctor"
                                                    name="optradio"
                                                    value="option1"
                                                />
                                                <label class="form-check-label" for="Doctor">
                                                    Doctor
                                                </label>
                                            </div>
                                            <div class="form-check ms-4">
                                                <input
                                                    type="radio"
                                                    class="form-check-input"
                                                    id="Nurse"
                                                    name="optradio"
                                                    value="option2"
                                                />
                                                <label class="form-check-label" for="Nurse">
                                                    {' '}
                                                    Nurse
                                                </label>
                                            </div>
                                        </div>
                                        {/* ----------------faculty---------------- */}
                                        <div class="mb-3 ">
                                            <label class="form-label">Khoa</label>
                                            <select class="form-select">
                                                <option>Khoa nội</option>
                                                <option>Khoa ngoại</option>
                                                <option>Khoa sản</option>
                                                <option>Khoa nhi</option>
                                                <option>Khoa truyền nhiễm</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        {/* -----------birthdate------------- */}
                                        <div class=" mb-3 mt-3">
                                            <label for="birthDay" class="form-label">
                                                Ngày tháng năm sinh:
                                            </label>
                                            <input type="text" class="form-control" id="birthDay" name="birthdate" />
                                        </div>
                                        {/* ----------------certificate */}
                                        <div class="mb-3 ">
                                            <label for="degree" class="form-label">
                                                Bằng cấp:
                                            </label>
                                            <input type="text" class="form-control" name="degree" />
                                        </div>
                                        {/* ----------------email---------------- */}
                                        <div class="mb-3">
                                            <label for="email" class="form-label">
                                                Email:
                                            </label>
                                            <input type="text" class="form-control" name="email" />
                                        </div>
                                        {/* ----------------phone---------------- */}
                                        <div class="mb-3">
                                            <label for="email" class="form-label">
                                                SĐT:
                                            </label>
                                            <input type="text" class="form-control" name="phone" />
                                        </div>
                                        {/* ----------------hometown---------------- */}
                                        <div class="mb-3">
                                            <label for="email" class="form-label">
                                                Quê quán:
                                            </label>
                                            <input type="text" class="form-control" name="hometown" />
                                        </div>

                                        {/* ----------------address---------------- */}
                                        <div class="mb-3">
                                            <label for="email" class="form-label">
                                                Địa chỉ:
                                            </label>
                                            <input type="text" class="form-control" name="address" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* ---------------------model footer-------------------- */}
                        <div className={clsx(style.modalFooter)}>
                            <button className={clsx(style.submitButton)} onClick={handleAdd}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
//---------------------------------------------Show card ------------------------------------------------------------------

// function getCard(id) {
//     const cardSelected = document.querySelector(`.${style.cards}`);
//     const hideDefault = document.querySelector(`.${style.defaultCard}`);
//     console.log(cardSelected);
//     if (cardSelected.style.display === 'flex') {
//         cardSelected.style.display = 'none';
//         hideDefault.style.display = 'flex';
//     } else {
//         cardSelected.style.display = 'flex';
//         hideDefault.style.display = 'none';
//     }
// }

//------------------------------------------------------ Sort ----------------------------------------------------------------

const SortTable = ({ data, showInfor }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortedColumn, setSortedColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('desc');

    const filteredData = data.filter((item) =>
        Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
    );

    const sortedData = [...filteredData].sort((a, b) => {
        if (!a[sortedColumn] || !b[sortedColumn]) {
            return 0;
        }

        if (sortDirection === 'asc') {
            return a[sortedColumn].toString().localeCompare(b[sortedColumn].toString());
        } else {
            return b[sortedColumn].toString().localeCompare(a[sortedColumn].toString());
        }
    });

    const handleSort = (columnName) => {
        setSortedColumn(columnName);
        setSortDirection((prevDirection) => (prevDirection === 'desc' ? 'asc' : 'desc'));
    };

    return (
        <div className={clsx(style.col1__row)}>
            <div className={clsx(style.searchbox)}>
                <i className="fas fa-search"></i>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className={clsx(style.infoTable)}>
                <table className={clsx(style.myTable)}>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('id')}>ID {<i class="fa-solid fa-sort"></i>} </th>
                            <th onClick={() => handleSort('fullName')}>Họ tên {<i class="fa-solid fa-sort"></i>}</th>
                            <th onClick={() => handleSort('faculty')}>
                                Chuyên ngành {<i class="fa-solid fa-sort"></i>}
                            </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((item) => (
                            // <tr onClick={() => getCard(item.id)}></tr>
                            <tr>
                                <td> {item.id}</td>
                                <td>{item.fullName}</td>
                                <td>{item.faculty} </td>
                                <td
                                    onClick={() => {
                                        showInfor(item.id);
                                    }}
                                >
                                    {<i class="fa-regular fa-address-card"></i>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
//----------------------------------------------------- add calendar --------------------------------------------------------
function AddCalendar({ addCalendar }) {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    function handleAdd() {
        const job_name = document.querySelector('input[name=job_name]').value;
        const job_time = document.querySelector('input[name=job_time]').value;
        const job_place = document.querySelector('input[name=job_place]').value;
        const job_date = document.querySelector('input[name=job_date]').value;

        if (job_name === '' || job_time === '' || job_place === '' || job_date === '') {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        const date = new Date(job_date);
        if (date.toString() === 'Invalid Date') {
            document.querySelector('input[name=job_date]').value = '';
            alert('Ngày tháng không hợp lệ');

            return;
        }

        document.querySelector('input[name=job_name]').value = '';
        document.querySelector('input[name=job_time]').value = '';
        document.querySelector('input[name=job_place]').value = '';
        document.querySelector('input[name=job_date]').value = '';

        addCalendar(job_name, job_time, job_place, job_date);
    }

    return (
        <div>
            <div className={clsx(style.AddButton)}>
                <button onClick={handleOpenModal} className={clsx(style.addButton)}>
                    Thêm lịch
                </button>
            </div>
            {showModal && (
                <div id="myModal" className={clsx(style.modal, style.addCalendar)}>
                    <div className={clsx(style.modalContent)}>
                        <div className={clsx(style.modalHeader)}>
                            <span onClick={handleCloseModal} className={clsx(style.close)}>
                                &times;
                            </span>
                            <h3>Thêm thông tin lịch</h3>
                        </div>
                        <div className={clsx(style.modalBody)}>
                            <form>
                                {/* --------------name task--------------- */}
                                <div class="mb-3 mt-1">
                                    <label for="email" class="form-label">
                                        Tên công việc:
                                    </label>
                                    <input type="text" class="form-control" name="job_name" />
                                </div>
                                {/* --------------time--------------- */}
                                <div class="mb-3 mt-3">
                                    <label for="email" class="form-label">
                                        Thời gian:
                                    </label>
                                    <input type="text" class="form-control" name="job_time" />
                                </div>
                                {/* --------------place--------------- */}
                                <div class="mb-3 mt-3">
                                    <label for="email" class="form-label">
                                        Địa điểm:
                                    </label>
                                    <input type="text" class="form-control" name="job_place" />
                                </div>
                                {/* --------------place--------------- */}
                                <div class="mb-3 mt-3">
                                    <label for="email" class="form-label">
                                        Ngày tháng:
                                    </label>
                                    <input type="text" class="form-control" name="job_date" placeholder="mm/dd/yyyy" />
                                </div>
                            </form>
                        </div>
                        <div className={clsx(style.modalFooter)}>
                            <button className={clsx(style.submitButton)} onClick={handleAdd}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

//----------------------------------------------------edit staff ---------------------------------------------------------------
function EditInfoStaff({ id, reloadPage }) {
    if (id === undefined) {
        return <div></div>;
    }
    async function handleRemove() {
        // --------------------- remove doctors----------------------------------------
        const q = query(collection(database, 'Doctors'), where('id', '==', id));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty === false) {
            await deleteDoc(doc(database, 'Doctors', querySnapshot.docs[0].id));
            reloadPage();
            return;
        }

        // --------------------- remove nurses----------------------------------------
        // --------------------- remove doctors----------------------------------------
        const q2 = query(collection(database, 'Nurses'), where('id', '==', id));
        const querySnapshot2 = await getDocs(q2);

        if (querySnapshot2.empty === false) {
            await deleteDoc(doc(database, 'Nurses', querySnapshot2.docs[0].id));
            reloadPage();
            return;
        }
    }

    return (
        <div className={clsx(style.EditStaff)}>
            {/* <div>
                <div className={clsx(style.EditButton)}>
                    <button onClick={handleOpenModal} className={clsx(style.editButton)}>
                        Chỉnh sửa
                    </button>
                </div>
                {showModal && (
                    <div id="myModal" className={clsx(style.modal)}>
                        <div className={clsx(style.modalContent)}>
                            <div className={clsx(style.modalHeader)}>
                                <span onClick={handleCloseModal} className={clsx(style.close)}>
                                    &times;
                                </span>
                                <h3>Chỉnh sửa thông tin nhân viên</h3>
                            </div>
                            <div className={clsx(style.modalBody)}>
                                <label>
                                    Họ tên:
                                    <input type="text" name="fullName" placeholder="Nguyen Van A" />
                                </label>
                                <label>
                                    Giới tính:
                                    <input type="text" name="gender" placeholder="Gender" />
                                </label>
                                <label>
                                    Chuyên ngành:
                                    <input type="text" name="faculty" placeholder="Faculty" />
                                </label>
                                <label>
                                    Ngày sinh:
                                    <input type="text" name="birthdate" placeholder="mm/dd/yyy" />
                                </label>
                                <label>
                                    Chức vụ:
                                    <input type="text" name="job" placeholder="doctor or nurse" />
                                </label>
                                <label>
                                    Email:
                                    <input type="text" name="email" placeholder="abc@gmail.com" />
                                </label>
                                <label>
                                    Quê quán:
                                    <input type="text" name="hometown" placeholder="Hometown" />
                                </label>
                                <label>
                                    SĐT:
                                    <input type="text" name="phone" placeholder="Phone number" />
                                </label>
                                <label>
                                    Địa chỉ:
                                    <input type="text" name="address" placeholder="Address" />
                                </label>
                            </div>
                            <div className={clsx(style.modalFooter)}>
                                <button className={clsx(style.submitButton)}>Submit</button>
                            </div>
                        </div>
                    </div>
                )}
            </div> */}
            <div className={clsx(style.ClearButton)}>
                <button className={clsx(style.clearButton)} onClick={handleRemove}>
                    Xóa
                </button>
            </div>
        </div>
    );
}

// --------------------------------------------------- main --------------------------------------------------------------
function Staffs() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('auth') !== 'admin') {
            navigate('/');
        }
    }, []);

    return (
        <div className={clsx(style.wrapper)}>
            <StaffsDisplay />
        </div>
    );
}

export default Staffs;
