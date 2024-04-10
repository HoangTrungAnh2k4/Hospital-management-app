'use client';

import clsx from 'clsx';
import style from './SCSS_module/Patients.module.scss';
import React, { useState, useEffect } from 'react';
import Table from './Table'
/*import { query, getDocs, collection, orderBy } from 'firebase/firestore';*/
import MockData from './Mock_data.json';
/*async function fecthDataFromFirebase() {
    /*const q = query(collection(dbPatient, "Patient"), orderBy("ID"));
    const querySnapshot = await getDocs(q);

    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ ID: doc.ID, ...doc.data() });
    });

    return data;
}*/

function Patients() {
    const [value, setValue] = useState([]);
    const [patients, setPatients] = useState(MockData);
    
    const search = (data)  => {
        return data.filter(item => 
            item.ID.toString().includes(value.toString()) ||
            item.Name.toLowerCase().includes(value.toString().toLowerCase()) || 
            item.Doctor.toLowerCase().includes(value.toString().toLowerCase()) || 
            item.Department.toLowerCase().includes(value.toString().toLowerCase()) || 
            item.Status.toLowerCase().includes(value.toString().toLowerCase())
        ) 
    };


    /*useEffect(() => {
        async function fetchData() {
            const data = await fecthDataFromFirebase();
            setPatients(data);
        }
        fetchData();
    }, []);*/



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
                        placeholder="Search here ...">
                        </input>
                    </div>
                </div>
                <span className={clsx(style.addPatient)}><button className={clsx(style.addButton)}>New Patient</button></span>

            </div>

            {<div className={clsx(style.patient_table)}>
                <Table
                    patients={search(patients)}
                    setPatients={setPatients}
                /> 
            </div>}
        </>
    );
}

export default Patients;