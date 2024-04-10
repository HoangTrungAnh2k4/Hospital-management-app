import SearchIcon from '@mui/icons-material/Search';
import clsx from 'clsx';
import styles from "./Equidment.module.scss"
import Equipments from "./equipment_data"
import Edetail_1 from '~/components/Slicebar/Edetail_1';
import { useState } from 'react';
import ECarausel from '~/components/Carausel/Equipment_carausel';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';

function Equipment() {
    const [target, setTarget] = useState([0, 0]);
    const [data, setData] = useState(Equipments);
    const [searchItem, setSearchItem] = useState('')
    function handleInputChange(event){
        setSearchItem(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        setData( Equipments.filter(equipment => {
            return equipment.detail.some(detail_1 => {
                return detail_1.detail.some(detail_2 => {
                    return detail_2.name.toLowerCase().includes(searchItem.toLowerCase());
                });
            });
        }));
    }
    function checkData() {
        if (data.length === 0) {

          return <div class="d-flex justify-content-center p-5"><h1>Không tìm thấy thông tin...</h1></div>;
        }
        return <ECarausel equipments={data[target[0]].detail[target[1]].detail}/>;
    }
    
    return (
        <div className={clsx(styles.Equipment)}>
            <div className={clsx("flex-shrink-0 bg-white --bs-primary-border-subtle rounded-3", styles.SlicebarArea)}>
                <div style={{ backgroundColor: "rgb(101, 197, 197)" }}>
                    <h3 style={{ padding: "10px" }}>Danh mục vật tư</h3>
                </div>
                <form role="search" class="input-group mb-3 p-2" padding="5px" onSubmit={handleSubmit}>
                    <input class="form-control" type="search" placeholder="Search" aria-label="Search" value={searchItem} onChange={handleInputChange}/>
                    <button class="btn btn-outline-info" type="submit"><SearchIcon/></button>  
                </form>
                <hr/>
                <Edetail_1 equipments={Equipments}  setTarget={setTarget}/>
                <hr/>
                <button class="btn btn-toggle align-items-center rounded collapsed ps-3" aria-expanded="false">
                    <PlaylistAddOutlinedIcon/> Thêm
                </button>
            </div>
            {checkData()}
        </div>
    )
}

export default Equipment;
