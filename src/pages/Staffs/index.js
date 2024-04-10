import clsx from 'clsx';
import style from './staffs.module.scss';
import React from 'react';
import doctorImage from 'src/img/doctor.png';

function StaffsDisplay() {
    return (
        <div className={clsx(style.colum)}>
            <div className={clsx(style.col1)}>
                <div className={clsx(style.headerBox)}>
                    <h2>Bác sĩ</h2>
                </div>
                <div className={clsx(style.col1__row1)}>
                    <li>
                        <div className={clsx(style.searchbox)}>
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tìm kiếm..." />
                        </div>
                    </li>
                    <li>
                        <div class="btn-group">
                            <div class="dropdown">
                                <button
                                    type="button"
                                    className={clsx('btn btn-primary dropdown-toggle', style.mydrop)}
                                    data-bs-toggle="dropdown"
                                >
                                    Khoa
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li>
                                        <a className={clsx('dropdown-item', style.dropitem)} href=" ">
                                            Khoa nội
                                        </a>
                                    </li>
                                    <li>
                                        <a className={clsx('dropdown-item', style.dropitem)} href=" ">
                                            Khoa ngoại
                                        </a>
                                    </li>
                                    <li>
                                        <a className={clsx('dropdown-item', style.dropitem)} href=" ">
                                            Khoa nhi
                                        </a>
                                    </li>
                                    <li>
                                        <a className={clsx('dropdown-item', style.dropitem)} href=" ">
                                            Khoa sản
                                        </a>
                                    </li>
                                    <li>
                                        <a className={clsx('dropdown-item', style.dropitem)} href=" ">
                                            Khoa truyền nhiễm
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="dropdown">
                                <button
                                    type="button"
                                    className={clsx('btn btn-primary dropdown-toggle', style.mydrop)}
                                    data-bs-toggle="dropdown"
                                >
                                    Sắp xếp
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                    <li>
                                        <a className={clsx('dropdown-item', style.dropitem)} href=" ">
                                            Thứ tự a-z
                                        </a>
                                    </li>
                                    <li>
                                        <a className={clsx('dropdown-item', style.dropitem)} href=" ">
                                            Tuổi
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className={clsx("container mt-3", style.listgroup)}>
                            <div class="list-group" style={{ marginRight: '0px' }}>
                                <a
                                    href=" "
                                    class="list-group-item list-group-item-action"
                                    onClick={() => showCard('Marry Jane')}
                                >
                                    Marry Jane
                                </a>
                                <a
                                    href=" "
                                    class="list-group-item list-group-item-action"
                                    onClick={() => showCard('Emma Jane')}
                                >
                                    Emma Jane
                                </a>
                                <a
                                    href=" "
                                    class="list-group-item list-group-item-action"
                                    onClick={() => showCard('Trần Văn Tuấn')}
                                >
                                    Trần Văn Tuấn
                                </a>
                            </div>
                        </div>
                    </li>
                </div>
                <div className={clsx(style.headerBox)}>
                    <h2>Y tá</h2>
                </div>
                <div className={clsx(style.col1__row2)}>
                    <li>
                        <div className={clsx(style.searchbox)}>
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tìm kiếm..." />
                        </div>
                    </li>
                    <li>
                        <div class="btn-group">
                            <div class="dropdown">
                                <button
                                    type="button"
                                    className={clsx('btn btn-primary dropdown-toggle', style.mydrop)}
                                    data-bs-toggle="dropdown"
                                >
                                    Khoa
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li>
                                        <a className={clsx('dropdown-item', style.dropitem)} href=" ">
                                            Khoa nội
                                        </a>
                                    </li>
                                    <li>
                                        <a className={clsx('dropdown-item', style.dropitem)} href=" ">
                                            Khoa ngoại
                                        </a>
                                    </li>
                                    <li>
                                        <a className={clsx('dropdown-item', style.dropitem)} href=" ">
                                            Khoa nhi
                                        </a>
                                    </li>
                                    <li>
                                        <a className={clsx('dropdown-item', style.dropitem)} href=" ">
                                            Khoa sản
                                        </a>
                                    </li>
                                    <li>
                                        <a className={clsx('dropdown-item', style.dropitem)} href=" ">
                                            Khoa truyền nhiễm
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="dropdown">
                                <button
                                    type="button"
                                    className={clsx('btn btn-primary dropdown-toggle', style.mydrop)}
                                    data-bs-toggle="dropdown"
                                >
                                    Sắp xếp
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                    <li>
                                        <a className={clsx('dropdown-item', style.dropitem)} href=" ">
                                            Thứ tự a-z
                                        </a>
                                    </li>
                                    <li>
                                        <a className={clsx('dropdown-item', style.dropitem)} href=" ">
                                            Tuổi
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className={clsx("container mt-3", style.listgroup)}>
                            <div class="list-group" style={{ marginRight: '0' }}>
                                <a href=" " class="list-group-item list-group-item-action">
                                    Nguyễn Tấn Tài
                                </a>
                                <a href=" " class="list-group-item list-group-item-action">
                                    Hồ Mỹ Hân
                                </a>
                                <a href=" " class="list-group-item list-group-item-action">
                                    Trần Như Ngọc
                                </a>
                            </div>
                        </div>
                    </li>
                </div>
            </div>
            {/* Thông tin nhân viên */}
            <div className={clsx(style.col2)}>
                <div className={clsx(style.col2__row1)}>
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img
                                src={doctorImage}
                                className={clsx('img-fluid rounded-start', style.myimg)}
                                alt="Doctor"
                            />
                        </div>
                        <div class="col-md-8">
                            <div className={clsx('card-body', style.cardbody)}>
                                <h2 class="card-title">Thông tin chi tiết</h2>
                                <p className={clsx('card-text', style.cardtext)}>
                                    Họ tên: Marry Jane <br />
                                    Giới tính: Nữ <br />
                                    Ngày sinh: 19/06/1990
                                    <span style={{ marginLeft: '30px' }}>Nơi sinh: Đồng Nai</span> <br />
                                    Quê quán: Dĩ An, Bình Dương <br />
                                    Hộ khẩu: thành phố Dĩ An, tỉnh Bình Dương
                                    <br />
                                    Khoa nhi <br />
                                    Chức vụ: Bác sĩ <br />
                                    Email: mjane@gmail.com
                                    <span style={{ marginLeft: '30px' }}>SĐT: 0988423367</span>{' '}
                                </p>
                                {/* <p className={clsx("card-text", style.cardtext)}>Họ tên: Marry Jane</p> */}
                            </div>
                            <div class="d-flex justify-content-end" style={{ marginRight: '20px' }}>
                                <div class="btn-group">
                                    <div className={clsx(style.button__edit)}>
                                        {/* <!-- Button trigger modal --> */}
                                        <button
                                            type="button"
                                            className={clsx('btn btn-primary', style.button__edit__mod)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#editModal"
                                        >
                                            Chỉnh sửa
                                        </button>

                                        {/* <!-- Modal --> */}
                                        <div
                                            class="modal fade"
                                            id="editModal"
                                            tabindex="-1"
                                            aria-labelledby="editModalLabel"
                                            aria-hidden="true"
                                        >
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h3 class="modal-title" id="editModalLabel">
                                                            Chỉnh sửa thông tin nhân viên
                                                        </h3>
                                                        <button
                                                            type="button"
                                                            class="btn-close"
                                                            data-bs-dismiss="modal"
                                                            aria-label="Close"
                                                        ></button>
                                                    </div>
                                                    <div class="container mt-3">
                                                        <form action="/action_page.php">
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="Họ tên"
                                                                    name="name"
                                                                />
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="Giới tính"
                                                                    name="sex"
                                                                />
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="Ngày sinh"
                                                                    name="birthdate"
                                                                />
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="Nơi sinh"
                                                                    name="birthplace"
                                                                />
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="Quê quán"
                                                                    name="hometown"
                                                                />
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="Hộ khẩu"
                                                                    name="residence"
                                                                />
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="Khoa"
                                                                    name="faculty"
                                                                />
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="Chức vụ"
                                                                    name="position"
                                                                />
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="Email"
                                                                    name="email"
                                                                />
                                                                <span class="input-group-text">@gmail.com</span>
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className={clsx('form-control', style.textform)}
                                                                    placeholder="SĐT"
                                                                    name="tel"
                                                                />
                                                            </div>
                                                            <button
                                                                type="submit"
                                                                className={clsx(
                                                                    'btn btn-primary',
                                                                    style.button__clear__save,
                                                                )}
                                                            >
                                                                Submit
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={clsx(style.button__clear)}>
                                        {/* <!-- Button trigger modal --> */}
                                        <button
                                            type="button"
                                            className={clsx('btn btn-primary', style.button__clear__mod)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#clearModal"
                                        >
                                            Xóa
                                        </button>

                                        {/* <!-- Modal --> */}
                                        <div
                                            class="modal fade"
                                            id="clearModal"
                                            tabindex="-1"
                                            aria-labelledby="clearModalLabel"
                                            aria-hidden="true"
                                        >
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h3 class="modal-title" id="clearModalLabel">
                                                            Bạn muốn xóa nhân viên này?
                                                        </h3>
                                                        <button
                                                            type="button"
                                                            class="btn-close"
                                                            data-bs-dismiss="modal"
                                                            aria-label="Close"
                                                        ></button>
                                                    </div>
                                                    <div class="modal-body">...</div>
                                                    <div class="modal-footer">
                                                        <button
                                                            type="button"
                                                            className={clsx(
                                                                'btn btn-primary',
                                                                style.button__clear__close,
                                                            )}
                                                            data-bs-dismiss="modal"
                                                        >
                                                            Close
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={clsx(
                                                                'btn btn-primary',
                                                                style.button__clear__save,
                                                            )}
                                                        >
                                                            Save changes
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={clsx(style.col2__row2)}>
                    <div className={clsx(style.col2__row2__col1)}>
                    <div className={clsx(style.headerBox)}>
                            <h2>Lịch</h2>
                        </div>
                    </div>
                    <div className={clsx(style.col2__row2__col2)}>
                        <div className={clsx(style.headerBox)}>
                            <h2>Bệnh nhân</h2>
                        </div>
                        <div className={clsx(style.patientInfor)}>
                            <p>Nguyễn Văn A</p>
                            <p>Trần Văn B</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
function showCard(name) {
    hideAllCards();

    var selectedCard = document.querySelector(`[data-name="${name}"]`);
    if (selectedCard) {
        selectedCard.style.display = 'block';
    }
}

function hideAllCards() {
    var cards = document.querySelectorAll('.col2__row1');
    cards.forEach((card) => {
        card.style.display = 'none';
    });
}
function Staffs() {
    return (
        <div className={clsx(style.wrapper)}>
            <StaffsDisplay />
        </div>
    );
}

export default Staffs;
