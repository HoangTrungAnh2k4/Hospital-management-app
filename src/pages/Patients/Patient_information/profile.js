import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import style from '../SCSS_module/Patients_Infor.module.scss';

function inforPicture() {
    return (
        <img
            className={clsx(style.profile_pic)}
            src="http://ghost.skillshub.info/content/images/2017/01/profile-girl-square.png"
            alt="profile_img"
        />
    );
}                        
                        
function Profile ({ patient }){
    
    const registrationDate = new Date(patient.RegistrationDate.seconds * 1000 + patient.RegistrationDate.nanoseconds / 1000000);
    const Birthday = new Date(patient.Birthday.seconds * 1000 + patient.Birthday.nanoseconds / 1000000);

    return (
        <>
            <div className={clsx(style.swaper1)}>
            <div className={clsx(style.patientProfile)}>
                {/* Phần profile có ảnh*/}
                <div className={clsx(style.profileWithPicture)}>
                    <div className={clsx(style.picContainer)}>{inforPicture()}</div>
                    <div className={clsx(style.BelowPic)}>
                        <h1>{patient.Name}</h1>
                        <h3>Các cuộc hẹn</h3>
                        <table>
                            <tr>
                                <th><h1>4</h1></th>                                                                                  
                                <th className={clsx(style.colRight)}><h1>2</h1></th>                                                                             
                            </tr>
                            <tr>
                                <td>Đã qua</td>
                                <td className={clsx(style.colRight)}>Sắp tới</td>
                            </tr>
                        </table>
                    </div>
                </div>

                {/* Phần profile không có ảnh*/}
                <div className={clsx(style.shortInfor)}>
                    <table>
                        <tr>
                            <td className={clsx(style.firstTd)}>Giới tính</td>                                   
                            <td className={clsx(style.firstTd)}>Ngày sinh</td>                                                                                 
                        </tr>
                        <tr>
                            <th><span class="border-bottom">{patient.Gender}</span></th>
                            <th><span class="border-bottom">{Birthday.toDateString()}</span></th>
                            
                        </tr>
                        <tr>
                            <td>Số điện thoại</td>                                   
                            <td>Địa chị</td>                                                                                 
                        </tr>
                        <tr>
                            <th><span class="border-bottom">{patient.PhoneNumber}</span></th>
                            <th><span class="border-bottom">{patient.Address}</span></th>
                            
                        </tr>
                        <tr>
                            <td>Thành phố</td>                                   
                            <td>CCCD</td>                                                                                 
                        </tr>
                        <tr>
                            <th><span class="border-bottom">{patient.City}</span></th>
                            <th><span class="border-bottom">{patient.CCCD}</span></th>
                            
                        </tr><tr>
                            <td>Ngày đăng ký</td>                                   
                            <td>Trạng thái</td>                                                                                 
                        </tr>
                        <tr>
                            <th><span class="border-bottom">{registrationDate.toDateString()}</span></th>
                            <th><span class="border-bottom">{patient.Status}</span></th>
                        </tr>
                    </table>
                </div>
            </div>
            </div>
        </>
    )
}                        

export default Profile;