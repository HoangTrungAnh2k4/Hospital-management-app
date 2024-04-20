import clsx from 'clsx';
import style from './DashboardStaffs.module.scss';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoardNotify } from '~/pages/Dashboard/DashboardAdmin';
import { database } from '~/firebase';
import { collection, getDocs, addDoc, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { set } from 'date-fns';
import myImg from '~/img/user.png';

function DashboardStaffs() {
    const navigate = useNavigate();
    const [ownPatients, setOwnPatients] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('auth') !== 'staff') {
            navigate('/');
        }
    }, []);

    const customStyle = {
        backgroundColor: 'rgb(101, 197, 197)',
        color: 'black',
    };

    useEffect(() => {
        async function showInfor() {
            let patients = [];
            const name = localStorage.getItem('name');
            const q = query(collection(database, 'Patients'), where('Doctor', '==', name));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                patients.push(doc.data());
            });
            setOwnPatients(patients);
        }
        showInfor();
    }, []);

    console.log(ownPatients);

    return (
        <div className={clsx(style.wrapper)}>
            <div className={clsx(style.wrapper1)}>
                <div className={clsx(style.row1)}>
                    <div id="demo" className="carousel slide" data-bs-ride="carousel">
                        {/* Indicators/dots */}
                        <div className="carousel-indicators">
                            <button
                                type="button"
                                data-bs-target="#demo"
                                data-bs-slide-to="0"
                                className="active"
                            ></button>
                            <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                            <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                        </div>

                        {/* The slideshow/carousel */}
                        <div className="carousel-inner">
                            {ownPatients &&
                                ownPatients.map((patient, index) => {
                                    return (
                                        <div className="carousel-item active ">
                                            {/* information Patient  */}
                                            <div className={clsx(style.box)}>
                                                <div className={clsx(style.img)}>
                                                    <img src={myImg} alt="Ảnh bệnh nhân" />
                                                </div>
                                                <nav className={clsx(style.infor)}>
                                                    <ul>
                                                        <h1>Thông tin bệnh nhân</h1>
                                                        <li>
                                                            ID:<span> {patient.ID}</span>{' '}
                                                        </li>
                                                        <li>
                                                            Tên:<span> {patient.Name}</span>{' '}
                                                        </li>
                                                        <li>
                                                            Giới tính:<span> {patient.Gender}</span>{' '}
                                                        </li>
                                                       
                                                        
                                                        <li>
                                                            Chuẩn đoán: <span>{patient.Sickness}</span>
                                                        </li>
                                                        <li>
                                                            Tình trạng sức khỏe:{' '}
                                                            <span>{patient.Status} </span>
                                                        </li>
                                                        
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>

                        <div className={clsx(style.carousel__icon)}>
                            {/* Left and right controls/icons */}
                            <button
                                type="button"
                                className={clsx('carousel-control-prev', style.mybutton)}
                                data-bs-target="#demo"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon"></span>
                            </button>
                            <button
                                type="button"
                                className={clsx('carousel-control-next', style.mybutton)}
                                data-bs-target="#demo"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon"></span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={clsx(style.row2)}>
                    {/* Notification board */}
                    <BoardNotify />
                </div>
            </div>
        </div>
    );
}

export default DashboardStaffs;
