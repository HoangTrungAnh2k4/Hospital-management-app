import clsx from 'clsx';
import style from '../SCSS_module/Patients_Infor.module.scss';
import appointmentData from './Appointment_data.json';
import React, { useState } from 'react';

function Appointment({patient}){
    const [toggle, setToggle] = useState(1);
    function updateToggle(id) {
        setToggle(id)
    }

    return(
        <>
            <div className={clsx(style.swaper3)}>
            <div className={clsx(style.appointment)}>
                <div className={clsx(style.tabBoxHead)}>
                    <div className={clsx(style.tabBox)}>
                        <button className={toggle === 1 ? clsx(style.tabButton_active) : clsx(style.tabButton)} onClick={ () => updateToggle(1)}><strong>Các cuộc hẹn sắp tới</strong></button>
                        <button className={toggle === 2 ? clsx(style.tabButton_active) : clsx(style.tabButton)} onClick={ () => updateToggle(2)}><strong>Các cuộc hẹn đã qua</strong></button>
                        <button className={toggle === 3 ? clsx(style.tabButton_active) : clsx(style.tabButton)} onClick={ () => updateToggle(3)}><strong>Trạng thái sức khỏe</strong></button>
                    </div>
                    <span className={clsx(style.addAppointment)}><button className={clsx(style.colorButton)}><strong>Thêm cuộc hẹn</strong></button></span>
                </div>

                {/* Upcomming Appointment*/}
                <div className={toggle === 1 ? clsx(style.tabContentBox) : clsx(style.unshowContent)}>
                    <div className={clsx(style.tabContent)}>
                        {
                            appointmentData && appointmentData.map( (appointment, index) => {
                                if(appointment.Status === "Upcoming"){
                                    return (
                                        <div className={clsx(style.appointmentContent)} key={index}>
                                            <table >
                                                <tr>
                                                    <td>{appointment.Date}</td>
                                                    <td>Loại</td>
                                                    <td>Bác sĩ</td>
                                                    <td>Y tá</td>                                                                                                                                       
                                                </tr>
                                                <tr>
                                                    <th>{appointment.Time}</th> 
                                                    <th>{appointment.Type}</th>
                                                    <th>{patient.Doctor}</th>
                                                    <th>{appointment.Nurse}</th>
                                                </tr>
                                            </table>
                                        </div>
                                    )
                                } 
                                else {
                                    return (null)
                                }
                            })
                        }
                    </div>
                </div>

                {/* Past Appointment */}
                <div className={toggle === 2 ? clsx(style.tabContentBox) : clsx(style.unshowContent)}>
                    <div className={clsx(style.tabContent)}>
                        {
                            appointmentData && appointmentData.map( (appointment, index) => {
                                if(appointment.Status === "Past"){
                                    return (
                                        <div className={clsx(style.appointmentContent)} key={index}>
                                            <table >
                                                <tr>
                                                    <td>{appointment.Date}</td>
                                                    <td>Loại</td>
                                                    <td>Bác sĩ</td>
                                                    <td>Y tá</td>
                                                    <td rowSpan="2">
                                                        <i class="fa-regular fa-clipboard fa-xl" style={{color: "#2b7fbf"}}></i>
                                                        <button><strong>Nội dung chi tiết</strong></button>
                                                    </td>                                                                                                                                       
                                                </tr>
                                                <tr>
                                                    <th>{appointment.Time}</th> 
                                                    <th>{appointment.Type}</th>
                                                    <th>{patient.Doctor}</th>
                                                    <th>{appointment.Nurse}</th>
                                                </tr>
                                            </table>
                                        </div>
                                    )
                                } 
                                else {
                                    return (null)
                                }
                            })
                        }
                    </div>
                </div>

                <div className={toggle === 3 ? clsx(style.tabContentBox) : clsx(style.unshowContent)}>
                    <div className={clsx(style.tabContent)}>
                        <div className={clsx(style.swaper4)}>
                            <div className={clsx(style.Diseased)}>
                                <h2>Vấn đề sức khỏe</h2>
                                <p>{patient.Sickness}</p>
                            </div>
                            <div className={clsx(style.BodyRecord)}>
                                <h2>Các thông số sức khỏe</h2>
                                <p>Chưa có thông tin...</p>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
export default Appointment;