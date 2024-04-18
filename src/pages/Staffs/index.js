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
                <AddStaffs />
                <SortTable data={doctors_data} />
                <div className={clsx(style.headerBox)}>
                    <h2>Y tá</h2>
                </div>
                <SortTable data={nurses_data} />
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
                                    <span style={{ fontWeight: 'bold' }}>Ngày sinh: </span> <br />
                                    <span style={{ fontWeight: 'bold' }}>Quê quán: </span> <br />
                                    <span style={{ fontWeight: 'bold' }}>Chuyên ngành: </span>
                                    <span style={{ marginLeft: '30px', fontWeight: 'bold' }}>Bằng cấp: </span> <br />
                                    <span style={{ fontWeight: 'bold' }}>Chức vụ: </span> <br />
                                    <span style={{ fontWeight: 'bold' }}>Email: </span>
                                    <span style={{ marginLeft: '30px', fontWeight: 'bold' }}>SĐT: </span> <br />
                                    <span style={{ fontWeight: 'bold' }}>Địa chỉ: </span> <br />
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
                                    <span style={{ fontWeight: 'bold' }}>Họ tên: </span> Trần Thu Thảo <br />
                                    <span style={{ fontWeight: 'bold' }}>Giới tính: </span> Nữ <br />
                                    <span style={{ fontWeight: 'bold' }}>Ngày sinh: </span> 19/06/1990 <br />
                                    <span style={{ fontWeight: 'bold' }}>Quê quán: </span> Đồng Tháp <br />
                                    <span style={{ fontWeight: 'bold' }}>Chuyên ngành: </span> Khoa nhi
                                    <span style={{ marginLeft: '30px', fontWeight: 'bold' }}>Bằng cấp: </span> <br />
                                    <span style={{ fontWeight: 'bold' }}>Chức vụ: </span> Bác sĩ <br />
                                    <span style={{ fontWeight: 'bold' }}>Email: </span> mjane@gmail.com
                                    <span style={{ marginLeft: '30px', fontWeight: 'bold' }}>
                                        SĐT:{' '}
                                    </span> 0988423367 <br />
                                    <span style={{ fontWeight: 'bold' }}>Địa chỉ: </span> Đông Hòa, Dĩ An, Bình Dương{' '}
                                    <br />
                                </div>
                            </div>
                            <EditInfoStaff />
                        </div>
                    </div>
                </div>
                <div className={clsx(style.col2__row2)}>
                    {/* -------------------------------------------------- Calendar ------------------------------------------------ */}
                    <div className={clsx(style.col2__row2__col1)}>
                        <div className={clsx(style.headerBox)}>
                            <h2>Lịch</h2>
                        </div>
                        <AddCalendar />
                        <Calendar />
                    </div>
                    {/* -------------------------------------------------- Bệnh nhân ------------------------------------------------ */}
                    <div className={clsx(style.col2__row2__col2)}>
                        <div className={clsx(style.headerBox)}>
                            <h2>Bệnh nhân</h2>
                        </div>
                        <PatientInfo/>
                    </div>
                </div>
            </div>
        </div>
    );
}
//--------------------------------------------------Thông tin bệnh nhân --------------------------------------------------------
function PatientInfo() {
    return (
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
                        <tr>
                            <td>3216</td>
                            <td>Nguyễn Văn A</td>
                        </tr>
                        <tr>
                            <td>4357</td>
                            <td>Trần Văn B</td>
                        </tr>
                    </tbody>
                </table>
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
        const gender = document.querySelector('input[name=gender]').value;
        const faculty = document.querySelector('input[name=faculty]').value;
        const birthdate = document.querySelector('input[name=birthdate]').value;
        const email = document.querySelector('input[name=email]').value;
        const hometown = document.querySelector('input[name=hometown]').value;
        const phone = document.querySelector('input[name=phone]').value;
        const address = document.querySelector('input[name=address]').value;
        const job = document.querySelector('input[name=job]').value;

        document.querySelector('input[name="fullName"]').value = '';
        document.querySelector('input[name=gender]').value = '';
        document.querySelector('input[name=faculty]').value = '';
        document.querySelector('input[name=birthdate]').value = '';
        document.querySelector('input[name=email]').value = '';
        document.querySelector('input[name=hometown]').value = '';
        document.querySelector('input[name=phone]').value = '';
        document.querySelector('input[name=address]').value = '';
        document.querySelector('input[name=job]').value = '';

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
                calendar: [{}],
            });
        } else if (job === 'nurse') {
            await addDoc(collection(database, 'Nurses'), {
                id: newId,
                fullName: fullName,
                gender: gender,
                faculty: faculty,
                birthdate: birthdate,
                email: email,
                hometown: hometown,
                phone: phone,
                address: address,
                calendar: [{}],
            });
        }
    }

    return (
        <div>
            <div className={clsx(style.AddButton)}>
                <button onClick={handleOpenModal} className={clsx(style.addButton)}>
                    <i class="fa-solid fa-plus"></i> Thêm nhân viên
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
                            <th onClick={() => handleSort('full_name')}>Họ tên {<i class="fa-solid fa-sort"></i>}</th>
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
                                <td>{item.full_name}</td>
                                <td>{item.faculty} </td>
                                <td onClick={getCard}>{<i class="fa-regular fa-address-card"></i>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
//----------------------------------------------------- add calendar --------------------------------------------------------
function AddCalendar() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    async function handleAdd() {
        const job_name = document.querySelector('input[name=job_name]').value;
        const job_time = document.querySelector('input[name=job_time]').value;
        const job_place = document.querySelector('input[name=job_place]').value;
        const job_date = document.querySelector('input[name=job_date]').value;
        
        document.querySelector('input[name=job_name]').value = '';
        document.querySelector('input[name=job_time]').value = '';
        document.querySelector('input[name=job_place]').value = '';
        document.querySelector('input[name=job_date]').value = '';
        
        await addDoc(collection(database, 'Calendar'), {
            job_name: job_name,
            job_time: job_time,
            job_place: job_place,
            job_date: job_date,
        });
    }

    return (
        <div>
            <div className={clsx(style.AddButton)}>
                <button onClick={handleOpenModal} className={clsx(style.addButton)}>
                    <i class="fa-solid fa-plus"></i> Thêm lịch
                </button>
            </div>
            {showModal && (
                <div id="myModal" className={clsx(style.modal)}>
                    <div className={clsx(style.modalContent)}>
                        <div className={clsx(style.modalHeader)}>
                            <span onClick={handleCloseModal} className={clsx(style.close)}>
                                &times;
                            </span>
                            <h3>Thêm thông tin lịch</h3>
                        </div>
                        <div className={clsx(style.modalBody)}>
                            <label>
                                Tên công việc:
                                <input type="text" name="job_name" />
                            </label>
                            <label>
                                Thời gian:
                                <input type="text" name="job_time" />
                            </label>
                            <label>
                                Địa điểm:
                                <input type="text" name="job_place" />
                            </label>
                            <label>
                                Ngày thực hiện: 
                                <input type="text" name="job_date"  placeholder='04/06/2024'/> 
                            </label> 
                        </div>
                        <div className={clsx(style.modalFooter)}>
                            <button className={clsx(style.submitButton)}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

//----------------------------------------------------edit staff ---------------------------------------------------------------
function EditInfoStaff() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div className={clsx(style.EditStaff)}>
            <div>
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
            </div>
            <div className={clsx(style.ClearButton)}>
                <button className={clsx(style.clearButton)}>Xóa</button>
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
