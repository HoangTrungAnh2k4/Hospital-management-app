import clsx from 'clsx';
import style from '../SCSS_module/Patients_Infor.module.scss';

function Note(){
    return(
        <div className={clsx(style.note)}>
            <span></span>
            <div>
            </div>
        </div>
    )
}

function Notes({patient}){
    const registrationDate = new Date(patient.RegistrationDate.seconds * 1000 + patient.RegistrationDate.nanoseconds / 1000000);
    
    return (
        <>
            <div className={clsx(style.notes)}>
                <div className={clsx(style.HeadLine)}>
                    <strong>Ghi chú</strong>
                    <span className={clsx(style.buttonRight)}> 
                        <button className={clsx(style.colorButton)}>
                            <strong>Xem tất cả</strong>
                        </button>
                    </span>
                </div>
                <div>
                    {Note()}
                </div>
                <div className={clsx(style.noteTail)}>
                    <h4>Ghi chú 1</h4>
                    <i class="fa-solid fa-user-doctor"></i>
                    <span className={clsx(style.noteDoctor)}>{patient.Doctor}</span>
                    <span className={clsx(style.noteDate)}>{registrationDate.toDateString()}</span>
                </div>
            </div>
        </>
    )
}

export default Notes