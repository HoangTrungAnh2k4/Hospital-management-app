import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import style from './SCSS_module/Patients_Infor.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import checkSubcollection from './Action/CheckSubcollection';
import getTotalPayment from './Action/GetTotalPayment';
import Profile from './Patient_information/profile';
import Appointment from './Patient_information/appointment';
import Notes from './Patient_information/notes';
import Payment from './Patient_information/payment'
import MedicalHistory from './Patient_information/medicalHistory';
import Allergies from './Patient_information/allergies';

const Information = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { patient } = location.state;
    const docId = patient.id;

    const [subcollectionMedicalHistory, setSubcollectionMedicalHistory] = useState(null);
    const [subcollectionAllergies, setSubcollectionAllergies] = useState(null);
    const [subcollectionPayment, setSubcollectionPayment] = useState(null);
    const [totalPayment, setTotalPayment] = useState(null);

    const getSubcollections = async () => {
        const subcollectionMH = await checkSubcollection(docId, "MedicalHistory");
        setSubcollectionMedicalHistory(subcollectionMH);

        const subcollectionA = await checkSubcollection(docId, "Allergies");
        setSubcollectionAllergies(subcollectionA);

        const subcollectionP = await checkSubcollection(docId, "Payment");
        setSubcollectionPayment(subcollectionP);

        const totalP = await getTotalPayment(docId);
        setTotalPayment(totalP);
    };

    useEffect(() => {
        getSubcollections()
    }, []);

    return (
        <>
            <div className={clsx(style.HeadLine)}>
                <button className={clsx(style.navigateButton)} onClick={() => navigate(-1)}>
                    <strong>Bệnh nhân</strong>
                </button>
                <span>
                    <i class="fa-solid fa-angle-right"></i>
                </span>
                <span className={clsx(style.navigatePattientName)}>
                    {' '}
                    <strong>{patient.Name}</strong>
                </span>
            </div>
            <div className={clsx(style.mainInforContainer)}>

{/*----------------------------------------------------------- Head Part ---------------------------------------------------*/}

                <div className={clsx(style.top)}>

{/*------------------------------------------------------- Profile Bệnh Nhân -------------------------------------------*/}

                    <div className={clsx(style.left)}>                        
                        <Profile 
                            patient={patient}
                        >  
                        </Profile>

                        <Notes 
                            patient={patient}
                        >
                        </Notes>
                    </div>

{/*------------------------------------------------------ Tiền án bệnh lý và dị ứng ---------------------------------------*/}
                    <div className={clsx(style.right)}>
                        <div className={clsx(style.medical_history)}>
                            <MedicalHistory 
                                subcollectionMedicalHistory={subcollectionMedicalHistory}
                                patient={patient}
                                getSubcollections={getSubcollections}
                            > 
                            </MedicalHistory>
                            
                            <Allergies 
                                subcollectionAllergies={subcollectionAllergies}
                                patient={patient}
                                getSubcollections={getSubcollections}
                            >
                            </Allergies>
                        </div>
                    </div>               
                </div>
{/*------------------------------------------------------------ Bottom Part  ---------------------------------------------------*/}
                <div className={clsx(style.bottom)}>
                    <div className={clsx(style.left)}>
                        <Appointment 
                            patient={patient}
                        >
                        </Appointment>
                    </div>                
{/*-------------------------------------------------------------- Payment ------------------------------------------------------*/}                    
                    <div className={clsx(style.right)}>
                        <Payment
                            subcollectionPayment={subcollectionPayment} 
                            totalPayment={totalPayment}
                        >
                        </Payment>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Information;