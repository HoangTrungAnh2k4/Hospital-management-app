import SearchIcon from '@mui/icons-material/Search';
import clsx from 'clsx';
import styles from "./Equidment.module.scss"
import Equipments from "./equipment_data"
import Edetail_1 from '~/components/Slicebar/Edetail_1';
import { useState } from 'react';
import ECarausel from '~/components/Carausel/Equipment_carausel';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Equipment() {
    const navigate = useNavigate();

   useEffect(() => {
        if (localStorage.getItem('auth') !== 'admin') {
            navigate('/');
        }
    }, []);

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
                <button class="btn btn-toggle align-items-center rounded collapsed ps-3" aria-expanded="false" data-bs-toggle="modal" data-bs-target="#addEquipModal">
                    <PlaylistAddOutlinedIcon/> Thêm
                </button>
            </div>
            {checkData()}
            <div className={"modal fade"} id="addEquipModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={"modal-dialog"}>
                    <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"} id="exampleModalLabel">Thêm vật tư</h5>
                        <button type="button" className={"btn-close"} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className={"modal-body"}>
                        <input className={"form-control m-2"} type="text" name="catelogue_1" placeholder="Danh mục lớn"/>
                        <input className={"form-control m-2"} type="text" name="catelogue_2" placeholder="Danh mục nhỏ"/>
                        <input className={"form-control m-2"} type="text" name="name" placeholder="Tên thiết bị"/>
                        <input className={"form-control m-2"} type="text" name="produce" placeholder="Nơi sản xuất"/>
                        <input className={"form-control m-2"} type="text" name="expiry" placeholder="Hạng sử dụng"/>
                        <input className={"form-control m-2"} type="file" name="img_url" placeholder="Link ảnh"/>
                    </div>
                    <div className={"modal-footer"}>
                        <button type="button" className={"btn btn-secondary"} data-bs-dismiss="modal">Hủy</button>
                        <button type="button" className={"btn btn-primary"} data-bs-dismiss="modal">Lưu</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Equipment;
