import clsx from 'clsx';
import style from '../SCSS_module/Patients_Infor.module.scss';

function MedicalHistory({subcollectionMedicalHistory}){
    return (
        <>
            <div className={clsx(style.medical)}>
                <div className={clsx(style.HeadLine)}>
                    <strong>Bệnh sử</strong>
                    <span className={clsx(style.buttonRight)}> 
                        <button className={clsx(style.colorButton)}>
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
        </>
    )
}

export default MedicalHistory;