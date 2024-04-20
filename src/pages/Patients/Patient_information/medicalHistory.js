import clsx from 'clsx';
import style from '../SCSS_module/Patients_Infor.module.scss';
import React, { useState } from 'react';
import Popup from '../Action/Popup';
import EditMedicalHistory from '../Forms/editMedicalHistoryForm';
import Notification from "../Action/Notification";


function MedicalHistory({subcollectionMedicalHistory, patient, getSubcollections}){
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    return (
        <>
            <div className={clsx(style.medical)}>
                <div className={clsx(style.HeadLine)}>
                    <strong>Bệnh sử</strong>
                    <span className={clsx(style.buttonRight)}> 
                        <button className={clsx(style.colorButton)} onClick={() =>  setOpenPopup(true)}>
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </span>
                </div>
                <div className={clsx(style.content)}>
                    {subcollectionMedicalHistory && subcollectionMedicalHistory.length > 0 ? (
                        <ul>
                            {subcollectionMedicalHistory.map((item, index) => (
                                <li key={index}>
                                    - {item.Describe}
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
                <EditMedicalHistory
                    subcollectionMedicalHistory={subcollectionMedicalHistory}
                    patient={patient}
                    setOpenPopup={setOpenPopup}
                    setNotify={setNotify}
                    getSubcollections={getSubcollections}
                >
                </EditMedicalHistory>
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}

export default MedicalHistory;