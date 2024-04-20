import clsx from 'clsx';
import styles from "./Blood.module.scss";
import SearchIcon from '@mui/icons-material/Search';
//import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import { useState, useEffect } from 'react';
//import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
//import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import { useNavigate } from 'react-router-dom';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';


import BloodMCarausel from '~/components/Carausel/Blood_carausel';

import { addBlood, getBlood, queryByFirstChar_blood, queryMedByName_blood, queryMedBCatOrAct_blood} from '~/firebase';
import { uploadImageBlood } from '~/firebase';



function Blood() {

    const navigate = useNavigate();

    useEffect(() => {
         if (localStorage.getItem('auth') !== 'admin') {
             navigate('/');
         }
     }, []);

    const initialState = {
        name: "",
        catelogue: [],
        type: "",
        packing: "",
        expiry: "",
        produce: "",
        price: "",
        unit: "",
        quantity: 0,
        img_url: "",
        win_bid: []
    };
    
    const [data, setData] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [addItem, setAddItem] =useState(initialState);
    useEffect(() => {
        getBlood((documents) => {
            setData(documents);
        });
    }, []);

    function checkData() {
        if (data.length === 0) {
          return <div class="d-flex justify-content-center p-5"><h1>Không tìm thấy thông tin...</h1></div>;
        }
        return <BloodMCarausel bloods={data} />;
    }
    function changeInput(event){
        setSearchItem(event.target.value);
    }
    function submitSearch(event){
        event.preventDefault();
            queryMedByName_blood( searchItem, (bloods) => {
                setData(bloods);
            })
    }
    function changeSaveItem(event) {
        const { name, value, files } = event.target;
    
        if (name === "img_url" && files[0]) {
            uploadImageBlood(files[0], (downloadURL) => {
                setAddItem(prevState => ({
                    ...prevState,
                    [name]: downloadURL
                }));
            });
        } else {
            setAddItem(prevState => ({
                ...prevState,
                [name]: name === "catelogue" ? value.split(",").map(item => item.trim()) : name === "price" || name === "quantity" ? Number(value) : value
            }));
        }
    }
    
    function submitAdd(event){
        addBlood(addItem).then(() => {
            setAddItem(initialState);
        })
    }

    return (
        <div>
            <div className={clsx(styles.searchWrapper)}> 
                <div class="container py-md-5"> 
                    <div  class="row justify-content-center"> 
                        <div class="col-md-8"> 
                            <div class="search-content"> 
                                <form className={"ng-untouched ng-pristine ng-valid"} padding="5px" role="search" onSubmit={submitSearch}> 
                                    <div className={"input-group mb-3"} padding="5px">  
                                        <input className={"form-control w-50"} type="search" placeholder={`Tìm kiếm theo nhóm máu`} aria-label="Search" value={searchItem} onChange={changeInput}/>
                                        <button className={"btn btn-info"} type="submit"> 
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
            <div className={"d-grid col-3 mx-auto pb-5"}>
                <button className={"btn btn-info btn-lg"} type="button"  data-bs-toggle="modal" data-bs-target="#addMedModal"><h4><PlaylistAddOutlinedIcon/> Thêm</h4></button>
            </div>
            <div className={"modal fade"} id="addMedModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={"modal-dialog"}>
                    <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"} id="exampleModalLabel">Thêm máu</h5>
                        <button type="button" className={"btn-close"} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className={"modal-body"}>
                        <input className={"form-control form-control-lg m-2"} type="text" name="name" placeholder="Tên máu" value={addItem.name} onChange={changeSaveItem}/>
                        <input className={"form-control form-control-lg m-2"} type="text" name="catelogue" placeholder="Danh mục" value={addItem.catelogue} onChange={changeSaveItem}/>
                        <input className={"form-control form-control-lg m-2"} type="text" name="type" placeholder="Loại nhóm máu" value={addItem.type} onChange={changeSaveItem}/>
                        <input className={"form-control form-control-lg m-2"} type="text" name="packing" placeholder="Đóng gói" value={addItem.packing} onChange={changeSaveItem}/>
                        <input className={"form-control form-control-lg m-2"} type="text" name="expiry" placeholder="Hạng sử dụng" value={addItem.expiry} onChange={changeSaveItem}/>
                        <input className={"form-control form-control-lg m-2"} type="text" name="produce" placeholder="Công ty sản xuất" value={addItem.produce} onChange={changeSaveItem}/>
                        <input className={"form-control form-control-lg m-2"} type="file" name="img_url" placeholder="Link ảnh" onChange={changeSaveItem}/>
                        <div class="input-group m-2">
                            <span className={"input-group-text"} id="basic-addon1">đ</span>
                            <input type="number" className={"form-control form-control-lg"} name="price" placeholder="Giá bán" value={addItem.price} onChange={changeSaveItem}/>
                            <span className={"input-group-text"} id="basic-addon2">/</span>
                            <input type="text" className={"form-control form-control-lg"} name="unit" placeholder="Đơn vị" value={addItem.unit} onChange={changeSaveItem}/>
                        </div>
                    </div>
                    <div className={"modal-footer"}>
                        <button type="button" className={"btn btn-lg btn-secondary"} data-bs-dismiss="modal">Hủy</button>
                        <button type="button" className={"btn btn-lg btn-primary"} data-bs-dismiss="modal" onClick={submitAdd}>Lưu</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blood;