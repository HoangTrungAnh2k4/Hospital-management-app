import React from 'react';
import clsx from 'clsx';
import style from './SCSS_module/Patients.module.scss';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { database } from 'src/firebase'
import EditForm from './Forms/editForm.js';
import Popup from './Action/Popup';



const Table = ({ patients, setPatients, getPatient, setNotify, confirmDialog, setConfirmDialog/*, handleEdit, handleDelete*/ }) => {
    //Order variables
    const [order, setOrder] = useState('ASC');
    const [openPopup, setOpenPopup] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null);

    //Pagination variables
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = patients.slice(firstIndex, lastIndex);
    const npage = Math.ceil(patients.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    
    //Navigate variables
    const navigate = useNavigate();

    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function changeCPage(page) {
        setCurrentPage(page);
    }

    //Sorting table
    const sorting = (col) => {
        let sorted;
        if (order === 'ASC') {
            if (col === 'timestamp') {
                sorted = [...patients].sort((a, b) => a[col] - b[col]);
            } else {
                sorted = [...patients].sort((a, b) =>
                    typeof a[col] === 'string'
                        ? a[col].toLowerCase() > b[col].toLowerCase()
                            ? 1
                            : -1
                        : a[col] - b[col],
                );
            }
            setOrder('DSC');
        } else if (order === 'DSC') {
            if (col === 'timestamp') {
                sorted = [...patients].sort((a, b) => b[col] - a[col]);
            } else {
                sorted = [...patients].sort((a, b) =>
                    typeof a[col] === 'string'
                        ? a[col].toLowerCase() < b[col].toLowerCase()
                            ? 1
                            : -1
                        : b[col] - a[col],
                );
            }
            setOrder('ASC');
        }
        setPatients(sorted);
    };


    //Event handle function
    const handleStatus = (status) => {
        switch (status) {
            case 'Đã phục hồi':
                return 'success';
            case 'Bệnh nhân mới':
                return 'warning';
            case 'Đang điều trị':
                return 'danger';
            default:
                return 'succeeded';
        }
    };

    const handleDelete = async (id) => {
        // Đóng confirm dialog
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });

        try {
            const docRef = doc(database, "Patients", id);
            const subcollections = ["MedicalHistory", "Allergies", "Amount", "Payment", "Notes", "HealthRecord", "Appointments"];

            for (const subcollection of subcollections) {
                const subcollectionRef = collection(docRef, subcollection);
                const querySnapshot = await getDocs(subcollectionRef);
                querySnapshot.forEach(async (doc) => {
                    try {
                        await deleteDoc(doc.ref);
                    } catch (error) {
                        console.error("Error deleting subcollection document:", error);
                    }
                });
            }

            // Xóa tài liệu chính
            await deleteDoc(docRef);
            getPatient();
    
            setNotify({
                isOpen: true,
                message: 'Đã xóa thành công',
                type: 'error'
            });
        } catch (error) {
            console.error("Error deleting document: ", error);
            setNotify({
                isOpen: true,
                message: 'Đã gặp lỗi khi xóa dữ liệu',
                type: 'error'
            });
        }
    };
    
    const handleEdit = id => {
        const [patient] = patients.filter(patient => patient.id === id);
        setSelectedPatient(patient);
        setOpenPopup(true); // Mở popup chỉnh sửa
    };
    

    return (
        <>
        <div className={clsx(style.contain_table)}>
            <table className={clsx(style.striped_table)}>
                <thead>
                    <tr>
                        <th onClick={() => sorting('ID')}>ID {<i class="fa-solid fa-sort"></i>}</th>
                        <th onClick={() => sorting('Name')}>Tên bệnh nhân {<i class="fa-solid fa-sort"></i>}</th>
                        <th onClick={() => sorting('Department')}>Khoa {<i class="fa-solid fa-sort"></i>}</th>
                        <th onClick={() => sorting('Doctor')}>Bác sĩ điều trị {<i class="fa-solid fa-sort"></i>}</th>
                        <th onClick={() => sorting('RegistrationDate')}>Ngày đăng ký {<i class="fa-solid fa-sort"></i>}</th>
                        <th onClick={() => sorting('Status')}>Trạng thái {<i class="fa-solid fa-sort"></i>}</th>
                        <th colSpan={2} className="text-center">
                            Hành động
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {patients ? (
                        records.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.ID}</td>
                                <td>{patient.Name}</td>
                                <td>{patient.Department}</td>
                                <td>{patient.Doctor}</td>
                                <td>
                                {new Date(patient.RegistrationDate.seconds * 1000 + patient.RegistrationDate.nanoseconds / 1000000).toDateString()}
                                </td>
                                <td>
                                    <span className={`badge rounded-pill bg-${handleStatus(patient.Status)}`}>
                                        {patient.Status}
                                    </span>
                                </td>
                                <td className={clsx(style.alignCenter)}>
                                    <span>
                                        <button className={clsx(style.circleButton)} onClick={() => {navigate('/patient/information', {state : {patient : patient}})}}>
                                            <i class="fa-solid fa-user"></i>
                                        </button>

                                        <button className={clsx(style.circleButton)} onClick={() => { handleEdit(patient.id)}}>
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>

                                        <button className={clsx(style.circleButton)} onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Bạn có chắc chắn muốn xóa bệnh nhân này?',
                                                    subTitle: "Hành động này sẽ không thể hoàn tác",
                                                    onConfirm: () => { handleDelete(patient.id) }
                                                })
                                            }}>
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </span>        
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className={clsx(style.paginationContainer)}>
                <nav>
                    <ul className="pagination pagination-lg">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <a href="#top" className="page-link" onClick={prePage}>
                                Prev
                            </a>
                        </li>
                        {numbers.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a href="#top" className="page-link" onClick={() => changeCPage(n)}>
                                    {n}
                                </a>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === npage ? 'disabled' : ''}`}>
                            <a href="#top" className="page-link" onClick={nextPage}>
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
            <Popup
            title="Điều chỉnh thông tin bệnh nhân"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            >
                <EditForm
                    selectedPatient={selectedPatient}
                    getPatient={getPatient}
                    setOpenPopup={setOpenPopup}
                    setNotify={setNotify}
                />
            </Popup>
        </>
    );
};

export default Table;
