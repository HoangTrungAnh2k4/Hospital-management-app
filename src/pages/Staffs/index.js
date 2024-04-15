import clsx from 'clsx';
import style from './staffs.module.scss';
import React, { useState } from 'react';
import doctorImage from 'src/img/doctor.png';
import { doctors_data } from './doctors_data';
import { nurses_data } from './nurses_data';
import Calendar from 'src/components/Calendar/CalendarDay';
import { database } from '~/firebase';
import { collection, getDocs, setDoc, doc, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function StaffsDisplay() {
    return (
        <div className={clsx(style.colum)}>
            {/* ----------------------------------- Danh sách nhân viên --------------------------------------------*/}
            <div className={clsx(style.col1)}>
                <div className={clsx(style.headerBox)}>
                    <h2>Bác sĩ</h2>
                </div>
                <SortTable data={doctors_data} />
                <AddStaffs />
                <div className={clsx(style.headerBox)}>
                    <h2>Y tá</h2>
                </div>
                <SortTable data={nurses_data} />
                <AddStaffs />
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
                                    <span style={{ fontWeight: 'bold' }}>Họ tên: </span> <br />
                                    <span style={{ fontWeight: 'bold' }}>Giới tính: </span> <br />
                                    <span style={{ fontWeight: 'bold' }}>Ngày sinh: </span>
                                    <span style={{ marginLeft: '30px', fontWeight: 'bold' }}>Nơi sinh: </span> <br />
                                    <span style={{ fontWeight: 'bold' }}>Quê quán: </span> <br />
                                    <span style={{ fontWeight: 'bold' }}>Khoa: </span> <br />
                                    <span style={{ fontWeight: 'bold' }}>Chức vụ: </span> <br />
                                    <span style={{ fontWeight: 'bold' }}>Email: </span>
                                    <span style={{ marginLeft: '30px', fontWeight: 'bold' }}>SĐT: </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={clsx('row g-0', style.cards)}>
                        <div className={clsx('col-md-4', style.imgColum)}>
                            <img src={doctorImage} className={clsx(style.myimg)} alt="Doctor" />
                        </div>
                        <div className={clsx('col-md-8', style.bodyColum)}>
                            <div className={clsx('card-body', style.cardbody)}>
                                <div className={clsx(style.cardtitle)}>
                                    <h2 className={clsx('card-title', style.headerCard)}>Thông tin chi tiết</h2>
                                </div>
                                <div className={clsx('card-text', style.cardtext)}>
                                    <span style={{ fontWeight: 'bold' }}>Họ tên: </span> Marry Jane <br />
                                    <span style={{ fontWeight: 'bold' }}>Giới tính: </span> Nữ <br />
                                    <span style={{ fontWeight: 'bold' }}>Ngày sinh: </span> 19/06/1990
                                    <span style={{ marginLeft: '30px', fontWeight: 'bold' }}>Nơi sinh: </span>Đồng Nai{' '}
                                    <br />
                                    <span style={{ fontWeight: 'bold' }}>Quê quán: </span> Đồng Tháp <br />
                                    <span style={{ fontWeight: 'bold' }}>Khoa: </span> Khoa nhi <br />
                                    <span style={{ fontWeight: 'bold' }}>Chức vụ: </span> Bác sĩ <br />
                                    <span style={{ fontWeight: 'bold' }}>Email: </span> mjane@gmail.com
                                    <span style={{ marginLeft: '30px', fontWeight: 'bold' }}>
                                        SĐT:{' '}
                                    </span> 0988423367{' '}
                                    {/* <p><span style={{ fontWeight:'bold' }}>Full name: </span> Marry Jane</p>
                                    <p><span style={{ fontWeight:'bold' }}>Gender: </span> Female</p>
                                    <p><span style={{ fontWeight:'bold' }}>Birthdate </span> 10/12/1990</p>
                                    <p><span style={{ fontWeight:'bold' }}>Họ tên: </span> Marry Jane</p>
                                    <p><span style={{ fontWeight:'bold' }}>Họ tên: </span> Marry Jane</p>
                                    <p><span style={{ fontWeight:'bold' }}>Họ tên: </span> Marry Jane</p>
                                    <p><span style={{ fontWeight:'bold' }}>Họ tên: </span> Marry Jane</p>
                                    <p><span style={{ fontWeight:'bold' }}>Họ tên: </span> Marry Jane</p>
                                    <p><span style={{ fontWeight:'bold' }}>Họ tên: </span> Marry Jane</p>
                                    <p><span style={{ fontWeight:'bold' }}>Họ tên: </span> Marry Jane</p> */}
                                </div>
                            </div>
                            <div class="d-flex justify-content-end" style={{ marginRight: '20px' }}>
                                <div class="btn-group">
                                    <div className={clsx(style.button__edit)}>
                                        {/* <!-- Button trigger modal --> */}
                                        <button
                                            type="button"
                                            className={clsx('btn btn-primary', style.button__edit__mod)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#editModal"
                                        >
                                            Chỉnh sửa
                                        </button>

                                        {/* <!-- Modal --> */}
                                        <div
                                            class="modal fade"
                                            id="editModal"
                                            tabindex="-1"
                                            aria-labelledby="editModalLabel"
                                            aria-hidden="true"
                                        >
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h3 class="modal-title" id="editModalLabel">
                                                            Chỉnh sửa thông tin nhân viên
                                                        </h3>
                                                        <button
                                                            type="button"
                                                            class="btn-close"
                                                            data-bs-dismiss="modal"
                                                            aria-label="Close"
                                                        ></button>
                                                    </div>
                                                    <div class="container mt-3">
                                                        <form action="/action_page.php">
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="Họ tên"
                                                                    name="name"
                                                                />
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="Giới tính"
                                                                    name="sex"
                                                                />
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="Ngày sinh"
                                                                    name="birthdate"
                                                                />
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="Nơi sinh"
                                                                    name="birthplace"
                                                                />
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="Quê quán"
                                                                    name="hometown"
                                                                />
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="Hộ khẩu"
                                                                    name="residence"
                                                                />
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="Khoa"
                                                                    name="faculty"
                                                                />
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="Chức vụ"
                                                                    name="position"
                                                                />
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="Email"
                                                                    name="email"
                                                                />
                                                                <span class="input-group-text">@gmail.com</span>
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="SĐT"
                                                                    name="tel"
                                                                />
                                                            </div>
                                                            <button
                                                                type="submit"
                                                                className={clsx(style.button__clear__save)}
                                                            >
                                                                Submit
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={clsx(style.button__clear)}>
                                        {/* <!-- Button trigger modal --> */}
                                        <button
                                            type="button"
                                            className={clsx('btn btn-primary', style.button__clear__mod)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#clearModal"
                                        >
                                            Xóa
                                        </button>

                                        {/* <!-- Modal --> */}
                                        <div
                                            class="modal fade"
                                            id="clearModal"
                                            tabindex="-1"
                                            aria-labelledby="clearModalLabel"
                                            aria-hidden="true"
                                        >
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h3 class="modal-title" id="clearModalLabel">
                                                            Bạn muốn xóa nhân viên này?
                                                        </h3>
                                                        <button
                                                            type="button"
                                                            class="btn-close"
                                                            data-bs-dismiss="modal"
                                                            aria-label="Close"
                                                        ></button>
                                                    </div>
                                                    <div class="modal-body">...</div>
                                                    <div class="modal-footer">
                                                        <button
                                                            type="button"
                                                            className={clsx(style.button__clear__close)}
                                                            data-bs-dismiss="modal"
                                                        >
                                                            Close
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={clsx(style.button__clear__save)}
                                                        >
                                                            Save changes
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={clsx(style.col2__row2)}>
                    {/* -------------------------------------------------- Calendar ------------------------------------------------ */}
                    <div className={clsx(style.col2__row2__col1)}>
                        <div className={clsx(style.headerBox)}>
                            <h2>Lịch</h2>
                        </div>
                        <Calendar />
                    </div>
                    {/* -------------------------------------------------- Bệnh nhân ------------------------------------------------ */}
                    <div className={clsx(style.col2__row2__col2)}>
                        <div className={clsx(style.headerBox)}>
                            <h2>Bệnh nhân</h2>
                        </div>
                        <div className={clsx(style.patientInfor)}>
                            <p>Nguyễn Văn A</p>
                            <p>Trần Văn B</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
//-------------------------------------------------- ADD ------------------------------------------------------------------

// function AddStaffs() {
//     var modal = document.getElementById('myModal');

//     // Get the button that opens the modal
//     var btn = document.getElementById('myBtn');

//     // Get the <span> element that closes the modal
//     var span = document.querySelector(`.${style.close}`)[0];

//     // When the user clicks the button, open the modal
//     btn.onclick = function () {
//         modal.style.display = 'block';
//     };

//     // When the user clicks on <span> (x), close the modal
//     span.onclick = function () {
//         modal.style.display = 'none';
//     };

//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function (event) {
//         if (event.target === modal) {
//             modal.style.display = 'none';
//         }
//     };
//     return (
//         <div>
//             <div className={clsx(style.AddButton)}>
//                 <button id="myBtn" className={clsx(style.addButton)}>
//                     ADD
//                 </button>
//             </div>
//             <div id="myModal" className={clsx(style.modal)}>
//                 <div className={clsx(style.modalContent)}>
//                     <div className={clsx(style.modalHeader)}>
//                         <span className={clsx(style.close)}>&times;</span>
//                         <h3>Điền thông tin nhân viên</h3>
//                     </div>
//                     <div className={clsx(style.modalBody)}>
//                         <p>Some text in the Modal..</p>
//                     </div>
//                     <div className={clsx(style.modalFooter)}>
//                         <button>Submit</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
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
        const querySnapshot2 = await getDocs(collection(database, 'Nurse'));

        const newId = Math.floor(100000 + Math.random() * 900000);
        let newIdString = newId.toString();

        if (
            querySnapshot.docs.find((doc) => doc.id === newIdString) ||
            querySnapshot2.docs.find((doc) => doc.id === newIdString)
        ) {
            return newIdString;
        } else {
            newIdString = generateId();
        }
        return newIdString;
    }

    async function handleAdd() {
        const fullName = document.querySelector('input[name="fullName"]').value;
        const gender = document.querySelector('input[name=gender]').value;
        const faculty = document.querySelector('input[name=faculty]').value;
        const birthdate = document.querySelector('input[name=birthdate]').value;
        const email = document.querySelector('input[name=email]').value;
        const hometown = document.querySelector('input[name=hometown]').value;
        const phone = document.querySelector('input[name=phone]').value;
        const address = document.querySelector('input[name=address]').value;
        const job = document.querySelector('input[name=job]').value;
        const newId = await generateId();

        if (job === 'doctor') {
            await addDoc(collection(database, 'Doctors'), {
                id: newId,
                fullName: fullName,
                gender: gender,
                faculty: faculty,
                birthdate: birthdate,
                email: email,
                hometown: hometown,
                phone: phone,
                address: address,
            });
        } else if (job === 'nurse') {
            await addDoc(collection(database, 'Nurse'), {
                id: newId,
                fullName: fullName,
                gender: gender,
                faculty: faculty,
                birthdate: birthdate,
                email: email,
                hometown: hometown,
                phone: phone,
                address: address,
            });
        }
    }

    return (
        <div>
            <div className={clsx(style.AddButton)}>
                <button onClick={handleOpenModal} className={clsx(style.addButton)}>
                    ADD
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
                            {/* <label>
                                ID: 
                                <input type="text" name="id" placeholder="####" /> 
                            </label> */}
                            <label>
                                Full Name:
                                <input type="text" name="fullName" placeholder="Nguyen Van A" />
                            </label>
                            <label>
                                Gender:
                                <input type="text" name="gender" placeholder="Gender" />
                            </label>
                            <label>
                                Faculty:
                                <input type="text" name="faculty" placeholder="Faculty" />
                            </label>
                            <label>
                                Birthdate:
                                <input type="text" name="birthdate" placeholder="mm/dd/yyy" />
                            </label>
                            <label>
                                Position:
                                <input type="text" name="job" placeholder="doctor or nurse" />
                            </label>
                            <label>
                                Email:
                                <input type="text" name="email" placeholder="abc@gmail.com" />
                            </label>
                            <label>
                                Hometown:
                                <input type="text" name="hometown" placeholder="Hometown" />
                            </label>
                            <label>
                                Phone number:
                                <input type="text" name="phone" placeholder="Phone number" />
                            </label>
                            <label>
                                Address:
                                <input type="text" name="address" placeholder="Address" />
                            </label>
                        </div>
                        <div className={clsx(style.modalFooter)}>
                            <button onClick={handleAdd}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
//---------------------------------------------Show card ------------------------------------------------------------------

function getCard() {
    var cardSelected = document.querySelector(`.${style.cards}`);
    var hideDefault = document.querySelector(`.${style.defaultCard}`);
    if (cardSelected.style.display === 'flex') {
        cardSelected.style.display = 'none';
        hideDefault.style.display = 'flex';
    } else {
        cardSelected.style.display = 'flex';
        hideDefault.style.display = 'none';
    }
}
//------------------------------------------------------ Sort ----------------------------------------------------------------

const SortTable = ({ data }) => {
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
                            <th onClick={() => handleSort('full_name')}>
                                Full Name {<i class="fa-solid fa-sort"></i>}
                            </th>
                            <th onClick={() => handleSort('faculty')}>Faculty {<i class="fa-solid fa-sort"></i>}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((item) => (
                            // <tr onClick={() => getCard(item.id)}></tr>
                            <tr onClick={getCard}>
                                <td>{item.id}</td>
                                <td>{item.full_name}</td>
                                <td>{item.faculty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

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
