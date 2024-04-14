import React from 'react';
import clsx from 'clsx';
import style from './SCSS_module/Patients.module.scss';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getDocs, collection, deleteDoc } from "firebase/firestore";
import { database } from 'src/firebase'
import EditForm from './Forms/editForm.js';
import Popup from './Popup';



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

    const handleStatus = (status) => {
        switch (status) {
            case 'Recovered':
                return 'success';
            case 'New patient':
                return 'warning';
            case 'In treatment':
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
            const querySnapshot = await getDocs(collection(database, "Patients"));
    
            const documentsToDelete = querySnapshot.docs.filter(doc => doc.data().ID === id);
    
            await Promise.all(documentsToDelete.map(async (doc) => {
                await deleteDoc(doc.ref);
            }));

            const updatedPatientsSnapshot = await getDocs(collection(database, "Patients"));

            const updatedPatients = updatedPatientsSnapshot.docs.map(doc => doc.data());

            setPatients(updatedPatients);
            getPatient();
    
            setNotify({
                isOpen: true,
                message: 'Deleted Successfully',
                type: 'error'
            });
        } catch (error) {
            console.error("Error deleting document: ", error);
            setNotify({
                isOpen: true,
                message: 'Error deleting document',
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
                        <th onClick={() => sorting('Name')}>Patient Name {<i class="fa-solid fa-sort"></i>}</th>
                        <th onClick={() => sorting('Department')}>Department {<i class="fa-solid fa-sort"></i>}</th>
                        <th onClick={() => sorting('Doctor')}>Doctor Assgined {<i class="fa-solid fa-sort"></i>}</th>
                        <th onClick={() => sorting('RegistrationDate')}>Date Check In {<i class="fa-solid fa-sort"></i>}</th>
                        <th onClick={() => sorting('Status')}>Status {<i class="fa-solid fa-sort"></i>}</th>
                        <th colSpan={2} className="text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {patients ? (
                        records.map((patient, i) => (
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
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { handleDelete(patient.ID) }
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
            title="Edit Patient Information"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            >

                <EditForm
                    patients={patients}
                    setPatients={setPatients}
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
