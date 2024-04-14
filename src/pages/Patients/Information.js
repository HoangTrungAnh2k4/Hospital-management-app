import React, {useState} from 'react';
import clsx from 'clsx';
import style from './SCSS_module/Patients_Infor.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import appointmentData from './Appointment_data.json';

function inforPicture() {
    return (
        <img
            className={clsx(style.profile_pic)}
            src="http://ghost.skillshub.info/content/images/2017/01/profile-girl-square.png"
            alt="profile_img"
        />
    );
}

function Note(){
    return(
        <div className={clsx(style.note)}>
            <span>Some Thing</span>
            <div>
            </div>
        </div>
    )
}

function Pay(){
    return(
        <div>
            <div className={clsx(style.payContainer)}>
                <div className={clsx(style.item_1)}>
                    <i className="fa-solid fa-circle" style={{color: "#63E6BE",}}></i>
                    <span className={clsx(style.payContent)}>Pay this</span>
                </div>

                <div className={clsx(style.item_2)}>
                    <i className="fa-solid fa-arrow-right" style={{color: "#74C0FC",}} />
                </div>
                
                <div className={clsx(style.item_3)}>
                    <span className={clsx(style.payAmount)}>1000</span>
                </div>
            </div>
        </div>
        
    )
}

const Information = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state);
    const registrationDate = new Date(location.state.patient.RegistrationDate.seconds * 1000 + location.state.patient.RegistrationDate.nanoseconds / 1000000);
    const Birthday = new Date(location.state.patient.Birthday.seconds * 1000 + location.state.patient.Birthday.nanoseconds / 1000000);

    const [toggle, setToggle] = useState(1);
    function updateToggle(id) {
        setToggle(id)
    }

    return (
        <>
            <div className={clsx(style.HeadLine)}>
                <button className={clsx(style.navigateButton)} onClick={() => navigate(-1)}>
                    <strong>Patients</strong>
                </button>
                <span>
                    <i class="fa-solid fa-angle-right"></i>
                </span>
                <span className={clsx(style.navigatePattientName)}>
                    {' '}
                    <strong>{location.state.patient.Name}</strong>
                </span>
            </div>
            <div className={clsx(style.mainInforContainer)}>
                <div className={clsx(style.top)}>
                    <div className={clsx(style.left)}>
                        {/* Phần profile*/}
                        <div className={clsx(style.swaper1)}>
                        <div className={clsx(style.patientProfile)}>
                            {/* Phần profile có ảnh*/}
                            <div className={clsx(style.profileWithPicture)}>
                                <div className={clsx(style.picContainer)}>{inforPicture()}</div>
                                <div className={clsx(style.BelowPic)}>
                                    <h1>{location.state.patient.Name}</h1>
                                    <h3>Appointments</h3>
                                    <table>
                                        <tr>
                                            <th><h1>5</h1></th>                                                                                  
                                            <th className={clsx(style.colRight)}><h1>2</h1></th>                                                                             
                                        </tr>
                                        <tr>
                                            <td>Past</td>
                                            <td className={clsx(style.colRight)}>Upcoming</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                            {/* Phần profile không có ảnh*/}
                            <div className={clsx(style.shortInfor)}>
                                <table>
                                    <tr>
                                        <td className={clsx(style.firstTd)}>Gender</td>                                   
                                        <td className={clsx(style.firstTd)}>Birthday</td>                                                                                 
                                    </tr>
                                    <tr>
                                        <th><span class="border-bottom">{location.state.patient.Gender}</span></th>
                                        <th><span class="border-bottom">{Birthday.toDateString()}</span></th>
                                        
                                    </tr>
                                    <tr>
                                        <td>Phone number</td>                                   
                                        <td>Adress</td>                                                                                 
                                    </tr>
                                    <tr>
                                        <th><span class="border-bottom">{location.state.patient.PhoneNumber}</span></th>
                                        <th><span class="border-bottom">{location.state.patient.Address}</span></th>
                                        
                                    </tr>
                                    <tr>
                                        <td>City</td>                                   
                                        <td>CCCD</td>                                                                                 
                                    </tr>
                                    <tr>
                                        <th><span class="border-bottom">{location.state.patient.City}</span></th>
                                        <th><span class="border-bottom">{location.state.patient.CCCD}</span></th>
                                        
                                    </tr><tr>
                                        <td>Registration date</td>                                   
                                        <td>Member status</td>                                                                                 
                                    </tr>
                                    <tr>
                                        <th><span class="border-bottom">{registrationDate.toDateString()}</span></th>
                                        <th><span class="border-bottom">{location.state.patient.Status}</span></th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        </div>


                        {/* This is the note*/}
                        <div className={clsx(style.notes)}>
                            <div className={clsx(style.HeadLine)}>
                                <strong>Note</strong>
                                <span className={clsx(style.buttonRight)}> 
                                    <button className={clsx(style.colorButton)}>
                                        <strong>See all</strong>
                                    </button>
                                </span>
                            </div>
                            <div>
                                {Note()}
                            </div>
                            <div className={clsx(style.noteTail)}>
                                <h4>Note 1</h4>
                                <i class="fa-solid fa-user-doctor"></i>
                                <span className={clsx(style.noteDoctor)}>{location.state.patient.Doctor}</span>
                                <span className={clsx(style.noteDate)}>{registrationDate.toDateString()}</span>
                            </div>
                        </div>
                        
                    </div>

                    {/** Tiền án và dị ứng */}
                    <div className={clsx(style.right)}>
                        <div className={clsx(style.medical_history)}>
                            <div className={clsx(style.medical)}>
                                <div className={clsx(style.HeadLine)}>
                                    <strong>Medical History</strong>
                                    <span className={clsx(style.buttonRight)}> 
                                        <button className={clsx(style.colorButton)}>
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    </span>
                                </div>
                                <div className={clsx(style.content)}></div>
                            </div>


                            <div className={clsx(style.allergies)}>
                                <div className={clsx(style.HeadLine)}>
                                    <strong>Allergies</strong>
                                    <span className={clsx(style.buttonRight)}> 
                                        <button className={clsx(style.colorButton)}>
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    </span>
                                </div>
                                <div className={clsx(style.content)}></div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className={clsx(style.bottom)}>
                    {/* Appointment*/}
                    <div className={clsx(style.left)}>
                        <div className={clsx(style.swaper3)}>
                        <div className={clsx(style.appointment)}>
                            <div className={clsx(style.tabBoxHead)}>
                                <div className={clsx(style.tabBox)}>
                                    <button className={toggle === 1 ? clsx(style.tabButton_active) : clsx(style.tabButton)} onClick={ () => updateToggle(1)}><strong>Upcomming Appointments</strong></button>
                                    <button className={toggle === 2 ? clsx(style.tabButton_active) : clsx(style.tabButton)} onClick={ () => updateToggle(2)}><strong>Past Appointments</strong></button>
                                    <button className={toggle === 3 ? clsx(style.tabButton_active) : clsx(style.tabButton)} onClick={ () => updateToggle(3)}><strong>Medical Record</strong></button>
                                </div>
                                <span className={clsx(style.addAppointment)}><button className={clsx(style.colorButton)}><strong>Add Appointment</strong></button></span>
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
                                                                <td>Type</td>
                                                                <td>Doctor</td>
                                                                <td>Nurse</td>                                                                                                                                       
                                                            </tr>
                                                            <tr>
                                                                <th>{appointment.Time}</th> 
                                                                <th>{appointment.Type}</th>
                                                                <th>{location.state.patient.Doctor}</th>
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
                                                                <td>Type</td>
                                                                <td>Doctor</td>
                                                                <td>Nurse</td>
                                                                <td rowSpan="2">
                                                                    <i class="fa-regular fa-clipboard fa-xl" style={{color: "#2b7fbf"}}></i>
                                                                    <button><strong>Nội dung chi tiết</strong></button>
                                                                </td>                                                                                                                                       
                                                            </tr>
                                                            <tr>
                                                                <th>{appointment.Time}</th> 
                                                                <th>{appointment.Type}</th>
                                                                <th>{location.state.patient.Doctor}</th>
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
                            <div className={toggle === 3 ? clsx(style.tabContentBox) : clsx(style.unshowContent)}></div>
                        </div>
                        </div>
                    </div>

                    {/** Payment */}                    
                    <div className={clsx(style.right)}>
                        <div className={clsx(style.swaper2)}>
                        <div className={clsx(style.payment)}>
                                <strong>Payment</strong>
                            <div className={clsx(style.paymentInfor)}>
                                <div className={clsx(style.payContainer)}>
                                    <div className={clsx(style.item_1)}>Transaction</div>
                                    <div className={clsx(style.item_2)}></div>     
                                    <div className={clsx(style.item_3)}>Amount </div>
                                </div>
                                <div className={clsx(style.payList)}>
                                    {Pay()}
                                </div>
                                <div className={clsx(style.payContainer)}>
                                    <div className={clsx(style.item_1)}>Total</div>
                                    <div className={clsx(style.item_2)}></div>     
                                    <div className={clsx(style.item_3)}><span class="border-top">1000</span></div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Information;