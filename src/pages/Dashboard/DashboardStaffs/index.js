import clsx from 'clsx';
import style from './DashboardStaffs.module.scss';
// import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardStaffs() {

    const navigate = useNavigate();

    useEffect(() => {
         if (localStorage.getItem('auth') !== 'staff') {
             navigate('/');
         }
     }, []);

    const customStyle = {
        backgroundColor: 'rgb(101, 197, 197)',
        color: 'black',
    };

    return (
        <div className={clsx(style.wrapper)}>
            <div className={clsx(style.wrapper1)}>
                <div className={clsx(style.row1)}>
                    <div id="demo" className="carousel slide" data-bs-ride="carousel">
                        {/* Indicators/dots */}
                        <div className="carousel-indicators">
                            <button
                                type="button"
                                data-bs-target="#demo"
                                data-bs-slide-to="0"
                                className="active"
                            ></button>
                            <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                            <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                        </div>

                        {/* The slideshow/carousel */}
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                {/* information Patient  */}
                                <div className={clsx(style.box)}>
                                    <div className={clsx(style.img)}>
                                        <img
                                            src="https://toplist.vn/images/800px/studio-quoc-khai-318820.jpg"
                                            alt="Ảnh bệnh nhân"
                                        />
                                    </div>

                                    <nav className={clsx(style.infor)}>
                                        <ul>
                                            <h1>Thông tin bệnh nhân</h1>
                                            <li>Tên: Châu Bảo Ngọc </li>

                                            <li>Tuổi: 20</li>
                                            <li>
                                                SĐT: <span>0352134515</span>
                                            </li>
                                            <li>
                                                Bác sĩ điều trị: <span>Nguyễn Văn Sơn</span>
                                            </li>
                                            <li>
                                                Chuẩn đoán: <span>Dấu hiệu bệnh sốt xuất huyết</span>
                                            </li>

                                            <li>
                                                Tình trạng sức khỏe:{' '}
                                                <span>Sốt cao, đau mỏi khắp người, không ăn được cơm </span>
                                            </li>
                                            <li>
                                                Tiền sử bệnh án: <span>Khỏe mạnh</span>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="carousel-item">
                                {/* information Patient  */}
                                <div className={clsx(style.box)}>
                                    <div className={clsx(style.img)}>
                                        <img
                                            src="https://faceinch.vn/upload/elfinder/%E1%BA%A2nh/chup-chan-dung-5.jpg"
                                            alt="Ảnh bệnh nhân"
                                        />
                                    </div>

                                    <nav className={clsx(style.infor)}>
                                        <ul>
                                            <h1>Thông tin bệnh nhân</h1>
                                            <li>Tên: Châu Bảo Ngọc </li>

                                            <li>Tuổi: 20</li>
                                            <li>
                                                SĐT: <span>0352134515</span>
                                            </li>
                                            <li>
                                                Bác sĩ điều trị: <span>Nguyễn Văn Sơn</span>
                                            </li>
                                            <li>
                                                Chuẩn đoán: <span>Dấu hiệu bệnh sốt xuất huyết</span>
                                            </li>

                                            <li>
                                                Tình trạng sức khỏe:{' '}
                                                <span>Sốt cao, đau mỏi khắp người, không ăn được cơm </span>
                                            </li>
                                            <li>
                                                Tiền sử bệnh án: <span>Khỏe mạnh</span>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="carousel-item">
                                {/* information Patient  */}
                                <div className={clsx(style.box)}>
                                    <div className={clsx(style.img)}>
                                        <img
                                            src="https://smilemedia.vn/wp-content/uploads/2022/09/cach-chup-anh-the-dep-e1664379835782.jpg"
                                            alt="Ảnh bệnh nhân"
                                        />
                                    </div>

                                    <nav className={clsx(style.infor)}>
                                        <ul>
                                            <h1>Thông tin bệnh nhân</h1>
                                            <li>Tên: Châu Bảo Ngọc </li>

                                            <li>Tuổi: 20</li>
                                            <li>
                                                SĐT: <span>0352134515</span>
                                            </li>
                                            <li>
                                                Bác sĩ điều trị: <span>Nguyễn Văn Sơn</span>
                                            </li>
                                            <li>
                                                Chuẩn đoán: <span>Dấu hiệu bệnh sốt xuất huyết</span>
                                            </li>

                                            <li>
                                                Tình trạng sức khỏe:{' '}
                                                <span>Sốt cao, đau mỏi khắp người, không ăn được cơm </span>
                                            </li>
                                            <li>
                                                Tiền sử bệnh án: <span>Khỏe mạnh</span>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>

                        <div className={clsx(style.carousel__icon)}>
                            {/* Left and right controls/icons */}
                            <button
                                type="button"
                                className={clsx('carousel-control-prev', style.mybutton)}
                                data-bs-target="#demo"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon"></span>
                            </button>
                            <button
                                type="button"
                                className={clsx('carousel-control-next', style.mybutton)}
                                data-bs-target="#demo"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon"></span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={clsx(style.row2)}>
                    {/* Notification board */}
                    <div className={clsx(style.notify)}>
                        <header>Thông báo chung</header>
                        <main className={clsx(style.notify_Main)}>
                            <ul className={clsx(style.ul__notice)}>
                                <li>
                                    <div className={clsx('container mt-3', style.mybutton)}>
                                        <div className="mt-4 p-5 rounded" style={customStyle}>
                                            <li className={clsx(style.index)}>
                                                <div className={clsx(style.icon)}>
                                                    <i class="fa-solid fa-user"></i>
                                                </div>
                                                <div className={clsx(style.content)}>
                                                    <div className={clsx(style.row5)}>
                                                        <span>Loan</span>
                                                        <span className={clsx(style.date)}>4/7/2024</span>
                                                    </div>
                                                </div>
                                            </li>

                                            <div className={clsx(style.row6)}>
                                                <h4>Thông báo lịch trực đột xuất của Khoa Nhi.</h4>
                                                <p>
                                                    {' '}
                                                    Do tình hình hiện tại, bệnh viện gặp hải một số vấn đề phức tạp nên
                                                    mọi người cần tham gia cuoc họ để tình cách giải quyết
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className={clsx('container mt-3', style.mybutton)}>
                                        <div className="mt-4 p-5 rounded" style={customStyle}>
                                            <li className={clsx(style.index)}>
                                                <div className={clsx(style.icon)}>
                                                    <i class="fa-solid fa-user"></i>
                                                </div>
                                                <div className={clsx(style.content)}>
                                                    <div className={clsx(style.row5)}>
                                                        <span>Admin</span>
                                                        <span className={clsx(style.date)}>4/10/2024</span>
                                                    </div>
                                                </div>
                                            </li>

                                            <div className={clsx(style.row6)}>
                                                <h4>Thông báo lịch nghỉ 30/4 và 1/5 .</h4>
                                                <p>
                                                    {' '}
                                                    Do tình hình hiện tại, bệnh viện gặp hải một số vấn đề phức tạp nên
                                                    mọi người cần tham gia cuoc họ để tình cách giải quyết
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className={clsx('container mt-3', style.mybutton)}>
                                        <div className="mt-4 p-5 rounded" style={customStyle}>
                                            <li className={clsx(style.index)}>
                                                <div className={clsx(style.icon)}>
                                                    <i class="fa-solid fa-user"></i>
                                                </div>
                                                <div className={clsx(style.content)}>
                                                    <div className={clsx(style.row5)}>
                                                        <span>Loan</span>
                                                        <span className={clsx(style.date)}>4/7/2024</span>
                                                    </div>
                                                </div>
                                            </li>

                                            <div className={clsx(style.row6)}>
                                                <h4>Thông báo lịch trực đột xuất của Khoa Nhi.</h4>
                                                <p>
                                                    {' '}
                                                    Do tình hình hiện tại, bệnh viện gặp hải một số vấn đề phức tạp nên
                                                    mọi người cần tham gia cuoc họ để tình cách giải quyết
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardStaffs;
