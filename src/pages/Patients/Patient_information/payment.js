import clsx from 'clsx';
import style from '../SCSS_module/Patients_Infor.module.scss';
import React, { useState } from 'react';
import Popup from '../Action/Popup';
import Notification from "../Action/Notification";



function Pay(Transaction ,Price){
    return(
        <div>
            <div className={clsx(style.payContainer)}>
                <div className={clsx(style.item_1)}>
                    <i className="fa-solid fa-circle" style={{color: "#63E6BE",}}></i>
                    <span className={clsx(style.payContent)}>{Transaction}</span>
                </div>

                <div className={clsx(style.item_2)}>
                    <i className="fa-solid fa-arrow-right" style={{color: "#74C0FC",}} />
                </div>
                
                <div className={clsx(style.item_3)}>
                    <span className={clsx(style.payAmount)}>{Price}</span>
                </div>
            </div>
        </div>
        
    )
}

function Payment({subcollectionPayment, totalPayment}){
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    return(
        <>
            <div className={clsx(style.swaper2)}>
                <div className={clsx(style.payment)}>
                    <div className={clsx(style.HeadLine)}>
                        <strong>Các khoản thanh toán</strong>
                        <span className={clsx(style.buttonRight)}> 
                            <button className={clsx(style.colorButton)} onClick={() =>  setOpenPopup(true)}>
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </span>
                    </div>
                        
                    <div className={clsx(style.paymentInfor)}>
                        <div className={clsx(style.payContainer)}>
                            <div className={clsx(style.item_1)}>Nội dung</div>
                            <div className={clsx(style.item_2)}></div>     
                            <div className={clsx(style.item_3)}>Giá </div>
                        </div>
                        <div className={clsx(style.payList)}>
                            {subcollectionPayment && subcollectionPayment.length > 0 ? (
                                subcollectionPayment.map((item) => (
                                    Pay(item.Transaction, item.Price)
                                ))
                            ) : (
                                <p>Không có thông tin</p>
                            )}
                        </div>
                        <div className={clsx(style.payContainer)}>
                            <div className={clsx(style.item_1)}>Tổng</div>
                            <div className={clsx(style.item_2)}></div>     
                            <div className={clsx(style.item_3)}><span class="border-top">
                                {totalPayment !== null ? (
                                    totalPayment.total
                                ) : (
                                    <p>Không có thông tin</p>
                                )}
                            </span></div>
                        </div>
                    </div>
                </div>
            </div>
            <Popup 
                title="Chỉnh sữa thông tin"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}

export default Payment;