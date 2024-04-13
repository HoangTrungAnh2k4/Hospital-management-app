import clsx from 'clsx';
import styles from "./Blood.module.scss";
import SearchIcon from '@mui/icons-material/Search';

import { useState } from 'react';
import Blood_type from './Blood_data';

import MCarausel from '~/components/Carausel/Medicine_carausel';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';

function Blood() {

    const [data, setData] = useState(Blood_type);
    const [searchItem, setSearchItem] = useState('');

    function checkData() {
        if (data.length === 0) {

            return <div class="d-flex justify-content-center p-5"><h1>Không tìm thấy thông tin...</h1></div>;
        }
        return <MCarausel medicines={data} />;
    }
    function handleInputChange(event) {
        setSearchItem(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();

        setData(Blood_type.filter((item) => {
            return (item.name.toLowerCase().includes(searchItem.toLowerCase()));
        }))

    }

    return (
        <div style={{ width: "95vw", margin: "auto" }}>
            <div className={clsx(styles.searchWrapper)}>
                <div class="container py-md-5">
                    <div class="row justify-content-center">
                        <div class="col-md-8">
                            <div class="search-content">

                                <form class="ng-untouched ng-pristine ng-valid" padding="5px" role="search" onSubmit={handleSubmit}>
                                    <div class="input-group mb-3" padding="5px">
                                        <input class="form-control w-50" type="search" placeholder={`Tìm kiếm theo nhóm máu`} aria-label="Search" value={searchItem} onChange={handleInputChange} />
                                        <button class="btn btn-info" type="submit">
                                            <SearchIcon />
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {checkData()}
            <div class="d-grid col-3 mx-auto pb-5">
                <button class="btn btn-info btn-lg" type="button"><h4><PlaylistAddOutlinedIcon /> Thêm</h4></button>
            </div>
        </div>
    )
}

export default Blood;
