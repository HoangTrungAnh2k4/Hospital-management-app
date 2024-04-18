import clsx from 'clsx';
import style from '../SCSS_module/Patients_Infor.module.scss';
import React, { useState, useEffect } from 'react';
import Popup from '../Action/Popup';
import EditAllergies from '../Forms/editAllergiesForm';
import Notification from "../Action/Notification";

function Allergies({subcollectionAllergies, patient, getSubcollections}){
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    
    return (
        <>
            <div className={clsx(style.allergies)}>
                <div className={clsx(style.HeadLine)}>
                    <strong>Dị ứng</strong>
                    <span className={clsx(style.buttonRight)}> 
                        <button className={clsx(style.colorButton)} onClick={() =>  setOpenPopup(true)}>
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </span>
                </div>
                <div className={clsx(style.content)}>
                    {subcollectionAllergies && subcollectionAllergies.length > 0 ? (
                        <ul>
                            {subcollectionAllergies.map((item, index) => (
                                <li key={index}>
                                    - {item.Kind} : {item.Level}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Không có thông tin</p>
                    )}
                </div>
            </div>
            <Popup 
                title="Chỉnh sữa thông tin"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EditAllergies
                    subcollectionAllergies={subcollectionAllergies}
                    patient={patient}
                    setOpenPopup={setOpenPopup}
                    setNotify={setNotify}
                    getSubcollections={getSubcollections}
                >
                </EditAllergies>
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}

export default Allergies;