import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import style from './SCSS_module/Patients_Infor.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import appointmentData from './Appointment_data.json';
import { getDocs, collection} from 'firebase/firestore';
import { database } from 'src/firebase'

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
            <span></span>
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
                    <span className={clsx(style.payContent)}>Thanh Toán</span>
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


const checkSubcollection = async (docId, subcollectionName) => {
    const subcollectionRef = collection(database, "Patients", docId, subcollectionName);

    try {
        const querySnapshot = await getDocs(subcollectionRef);
        const data = [];
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
        } 
        return data;
    } catch (error) {
        console.error("Error checking and displaying subcollection:", error);
    }
};



const Information = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [subcollectionData, setSubcollectionData] = useState(null);

    const registrationDate = new Date(location.state.patient.RegistrationDate.seconds * 1000 + location.state.patient.RegistrationDate.nanoseconds / 1000000);
    const Birthday = new Date(location.state.patient.Birthday.seconds * 1000 + location.state.patient.Birthday.nanoseconds / 1000000);

    const [toggle, setToggle] = useState(1);
    function updateToggle(id) {
        setToggle(id)
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await checkSubcollection(location.state.patient.id, "MedicalHistory");
                setSubcollectionData(data);
            } catch (error) {
                console.error("Error fetching subcollection data:", error);
            }
        };

        fetchData();
    }, []);

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
                                    <h3>Các cuộc hẹn</h3>
                                    <table>
                                        <tr>
                                            <th><h1>5</h1></th>                                                                                  
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
                                        <th><span class="border-bottom">{location.state.patient.Gender}</span></th>
                                        <th><span class="border-bottom">{Birthday.toDateString()}</span></th>
                                        
                                    </tr>
                                    <tr>
                                        <td>Số điện thoại</td>                                   
                                        <td>Địa chị</td>                                                                                 
                                    </tr>
                                    <tr>
                                        <th><span class="border-bottom">{location.state.patient.PhoneNumber}</span></th>
                                        <th><span class="border-bottom">{location.state.patient.Address}</span></th>
                                        
                                    </tr>
                                    <tr>
                                        <td>Thành phố</td>                                   
                                        <td>CCCD</td>                                                                                 
                                    </tr>
                                    <tr>
                                        <th><span class="border-bottom">{location.state.patient.City}</span></th>
                                        <th><span class="border-bottom">{location.state.patient.CCCD}</span></th>
                                        
                                    </tr><tr>
                                        <td>Ngày đăng ký</td>                                   
                                        <td>Trạng thái</td>                                                                                 
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
                                <span className={clsx(style.noteDoctor)}>{location.state.patient.Doctor}</span>
                                <span className={clsx(style.noteDate)}>{registrationDate.toDateString()}</span>
                            </div>
                        </div>
                        
                    </div>

                    {/** Tiền án bệnh lý và dị ứng */}
                    <div className={clsx(style.right)}>
                        <div className={clsx(style.medical_history)}>
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
                                    {subcollectionData && subcollectionData.length > 0 ? (
                                        <ul>
                                            {subcollectionData.map((item, index) => (
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
                                    
                                </div>
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
                                <strong>Các khoản thanh toán</strong>
                            <div className={clsx(style.paymentInfor)}>
                                <div className={clsx(style.payContainer)}>
                                    <div className={clsx(style.item_1)}>Nội dung</div>
                                    <div className={clsx(style.item_2)}></div>     
                                    <div className={clsx(style.item_3)}>Giá </div>
                                </div>
                                <div className={clsx(style.payList)}>
                                    {Pay()}
                                </div>
                                <div className={clsx(style.payContainer)}>
                                    <div className={clsx(style.item_1)}>Tổng</div>
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