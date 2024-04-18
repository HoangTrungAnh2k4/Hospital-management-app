import clsx from 'clsx';
import style from '../SCSS_module/Patients_Infor.module.scss';

function Allergies({subcollectionAllergies}){
    return (
        <>
            <div className={clsx(style.allergies)}>
                <div className={clsx(style.HeadLine)}>
                    <strong>Dị ứng</strong>
                    <span className={clsx(style.buttonRight)}> 
                        <button className={clsx(style.colorButton)}>
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
        </>
    )
}

export default Allergies;