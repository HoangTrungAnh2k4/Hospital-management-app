'use client';

import clsx from 'clsx';
import style from './SCSS_module/Patients.module.scss';
import React, { useState, useEffect } from 'react';
import { query, getDocs, collection, orderBy } from 'firebase/firestore';
import { database } from 'src/firebase'
import Table from './Table'
import Popup from './Action/Popup';
import AddForm from './Forms/addForm.js';
import Notification from "./Action/Notification";
import ConfirmDialog from "./Action/ConfirmDialog";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';




function Patients() {
    const navigate = useNavigate();

    useEffect(() => {
         if (localStorage.getItem('auth') !== 'admin') {
             navigate('/');
         }
     }, []);
    
    const [value, setValue] = useState([]);
    const [patients, setPatients] = useState([]);
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const search = (data)  => {
        return data.filter(item => 
            item.ID.toString().includes(value.toString()) ||
            item.Name.toLowerCase().includes(value.toString().toLowerCase()) || 
            item.Doctor.toLowerCase().includes(value.toString().toLowerCase()) || 
            item.Department.toLowerCase().includes(value.toString().toLowerCase()) || 
            item.Status.toLowerCase().includes(value.toString().toLowerCase())
        ) 
    };

    const getPatient = async () => {
        const q = query(collection(database, "Patients"), orderBy("ID"));
        const querySnapshot = await getDocs(q);
        const patients = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        setPatients(patients)
    }

    useEffect(() => {
        getPatient()
    },[]);

    return (
        <>
            {/* Search bar and dropdown select box */}
            <div className={clsx(style.searchContainer)}>
                <div className={clsx(style.Search)}>
                    <div className={clsx(style.searchBar)}>
                        <button type="button" className={clsx(style.Button)}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <input type="text" className={clsx(style.searchInput)} onChange={
                            (e) => setValue(e.target.value)
                        }
                        placeholder="Nhập để tìm kiếm ...">
                        </input>
                    </div>
                </div>
                <span className={clsx(style.addPatient)}> 
                    <button className={clsx(style.addButton)}  onClick={() =>  setOpenPopup(true) }>
                        <AddIcon /> 
                        <span>Bệnh Nhân Mới</span>
                    </button>
                </span>
            </div>

            {<div className={clsx(style.patient_table)}>
                <Table
                    patients={search(patients)}
                    setPatients={setPatients}
                    getPatient={getPatient}
                    setNotify={setNotify}
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                /> 
            </div>}
            <Popup
                title="Tạo bệnh nhân mới"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}>

                <AddForm
                    setOpenPopup={setOpenPopup}
                    setNotify={setNotify}
                    getPatient={getPatient}
                />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    );
}

export default Patients;