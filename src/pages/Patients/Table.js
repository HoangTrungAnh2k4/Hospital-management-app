import React from 'react';
import clsx from 'clsx';
import style from './SCSS_module/Patients.module.scss';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Table = ({ patients, setPatients /*, handleEdit, handleDelete*/ }) => {
    //Order variables
    const [order, setOrder] = useState('ASC');
    //Pagination variables
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = patients.slice(firstIndex, lastIndex);
    const npage = Math.ceil(patients.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    //Navigate variables
    
    const navigate = useNavigate();

    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function changeCPage(page) {
        setCurrentPage(page);
    }

    const sorting = (col) => {
        let sorted;
        if (order === 'ASC') {
            if (col === 'timestamp') {
                sorted = [...patients].sort((a, b) => a[col] - b[col]);
            } else {
                sorted = [...patients].sort((a, b) =>
                    typeof a[col] === 'string'
                        ? a[col].toLowerCase() > b[col].toLowerCase()
                            ? 1
                            : -1
                        : a[col] - b[col],
                );
            }
            setOrder('DSC');
        } else if (order === 'DSC') {
            if (col === 'timestamp') {
                sorted = [...patients].sort((a, b) => b[col] - a[col]);
            } else {
                sorted = [...patients].sort((a, b) =>
                    typeof a[col] === 'string'
                        ? a[col].toLowerCase() < b[col].toLowerCase()
                            ? 1
                            : -1
                        : b[col] - a[col],
                );
            }
            setOrder('ASC');
        }
        setPatients(sorted);
    };

    const handleStatus = (status) => {
        switch (status) {
            case 'Recovered':
                return 'success';
                break;
            case 'New patient':
                return 'warning';
                break;
            case 'In treatment':
                return 'danger';
                break;
            default:
                return 'succeeded';
        }
    };

    return (
        <div className={clsx(style.contain_table)}>
            <table className={clsx(style.striped_table)}>
                <thead>
                    <tr>
                        <th onClick={() => sorting('ID')}>ID {<i class="fa-solid fa-sort"></i>}</th>
                        <th onClick={() => sorting('Name')}>Patient Name {<i class="fa-solid fa-sort"></i>}</th>
                        <th onClick={() => sorting('Department')}>Department {<i class="fa-solid fa-sort"></i>}</th>
                        <th onClick={() => sorting('Doctor')}>Doctor Assgined {<i class="fa-solid fa-sort"></i>}</th>
                        <th onClick={() => sorting('Date')}>Date Check In {<i class="fa-solid fa-sort"></i>}</th>
                        <th onClick={() => sorting('Status')}>Status {<i class="fa-solid fa-sort"></i>}</th>
                        <th colSpan={2} className="text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {patients ? (
                        records.map((patient, i) => (
                            <tr key={patient.ID}>
                                <td>{patient.ID}</td>
                                <td>{patient.Name}</td>
                                <td>{patient.Department}</td>
                                <td>{patient.Doctor}</td>
                                <td>
                                    {patient.Date /*.toDate().toLocaleString(undefined, { timeZoneName: 'short' })*/}{' '}
                                </td>
                                <td>
                                    <span className={`badge rounded-pill bg-${handleStatus(patient.Status)}`}>
                                        {patient.Status}
                                    </span>
                                </td>
                                <td className={clsx(style.alignCenter)}>
                                    <span>
                                        <button className={clsx(style.circleButton)} onClick={() => {navigate('/patient/information', {state : {patient : patient}})}}>
                                            <i class="fa-solid fa-user"></i>
                                        </button>

                                        <button className={clsx(style.circleButton)}>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                        </button>

                                        <button className={clsx(style.circleButton)}>
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </span>        
                                </td>
                                {/*<td className="text-right">
                  <button
                    onClick={() => handleEdit(patient.ID)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(patient.ID)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>*/}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className={clsx(style.paginationContainer)}>
                <nav>
                    <ul className="pagination pagination-lg">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <a href="#top" className="page-link" onClick={prePage}>
                                Prev
                            </a>
                        </li>
                        {numbers.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a href="#top" className="page-link" onClick={() => changeCPage(n)}>
                                    {n}
                                </a>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === npage ? 'disabled' : ''}`}>
                            <a href="#top" className="page-link" onClick={nextPage}>
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Table;
