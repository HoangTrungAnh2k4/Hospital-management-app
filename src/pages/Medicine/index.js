import clsx from 'clsx';
import styles from "./Medicine.module.scss";
import SearchIcon from '@mui/icons-material/Search';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import { useState, useEffect } from 'react';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import MCarausel from '~/components/Carausel/Medicine_carausel';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import { addMedicine, getMedicine, queryByFirstChar, queryMedByName, queryMedBCatOrAct} from '~/firebase';
import { uploadImage } from '~/firebase';
import { useNavigate } from 'react-router-dom';

function Medicine() {

    const navigate = useNavigate();

    useEffect(() => {
         if (localStorage.getItem('auth') !== 'admin') {
             navigate('/');
         }
     }, []);

    const initialState = {
        number: "",
        name: "",
        catelogue: [],
        type: "",
        packing: "",
        expiry: "",
        active_element: [],
        produce: "",
        price: "",
        unit: "",
        quantity: 0,
        img_url: "",
        win_bid: []
    };
    
    const [obFilter, setOjFilter] = useState("tên thuốc");
    const [data, setData] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [addItem, setAddItem] =useState(initialState);
    useEffect(() => {
        getMedicine((documents) => {
            setData(documents);
        });
    }, []);

    function changeSearch(event){
        const id = event.target.id;
        if ( id === "name"){
            setOjFilter("tên thuốc");
        } else if( id === "active_element"){
            setOjFilter("hoạt chất");
        }           
        else if ( id === "catalogue"){
            setOjFilter("danh mục");
        }
    }
    function searchByFirstChar(event){
        queryByFirstChar( event.target.id, (documents) => {
            setData(documents);
        })
    }
    function checkData() {
        if (data.length === 0) {
          return <div class="d-flex justify-content-center p-5"><h1>Không tìm thấy thông tin...</h1></div>;
        }
        return <MCarausel medicines={data} />;
    }
    function changeInput(event){
        setSearchItem(event.target.value);
    }
    function submitSearch(event){
        event.preventDefault();
        if ( obFilter === "tên thuốc"){
            queryMedByName( searchItem, (medicines) => {
                setData(medicines);
            })
        }
        else if ( obFilter === "danh mục"){
            queryMedBCatOrAct( searchItem, "catelogue", (medicines) => {
                setData(medicines);
            })
        }
        else if ( obFilter === "hoạt chất"){
            queryMedBCatOrAct( searchItem, "active_element", (medicines) => {
                setData(medicines);
            })
        }
    }
    function changeSaveItem(event) {
        const { name, value, files } = event.target;
    
        if (name === "img_url" && files[0]) {
            uploadImage(files[0], (downloadURL) => {
                setAddItem(prevState => ({
                    ...prevState,
                    [name]: downloadURL
                }));
            });
        } else {
            setAddItem(prevState => ({
                ...prevState,
                [name]: name === "catelogue" || name === "active_element" ? value.split(",").map(item => item.trim()) : name === "price" || name === "quantity" ? Number(value) : value
            }));
        }
    }
    
    function submitAdd(event){
        addMedicine(addItem).then(() => {
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
                                <div className={"jusbtn-toolbar d-flex flex-wrap justify-content-center"} role="toolbar" aria-label="Toolbar with button groups">
                                    <button   type="button" class="btn btn-outline-info" id="A" onClick={searchByFirstChar}> A </button>
                                    <button   type="button" class="btn btn-outline-info" id="B" onClick={searchByFirstChar}> B </button>
                                    <button   type="button" class="btn btn-outline-info" id="C" onClick={searchByFirstChar}> C </button>
                                    <button   type="button" class="btn btn-outline-info" id="D" onClick={searchByFirstChar}> D </button>
                                    <button   type="button" class="btn btn-outline-info" id="E" onClick={searchByFirstChar}> E </button>
                                    <button   type="button" class="btn btn-outline-info" id="F" onClick={searchByFirstChar}> F </button>
                                    <button   type="button" class="btn btn-outline-info" id="G" onClick={searchByFirstChar}> G </button>
                                    <button   type="button" class="btn btn-outline-info" id="H" onClick={searchByFirstChar}> H </button>
                                    <button   type="button" class="btn btn-outline-info" id="I" onClick={searchByFirstChar}> I </button>
                                    <button   type="button" class="btn btn-outline-info" id="J" onClick={searchByFirstChar}> J </button>
                                    <button   type="button" class="btn btn-outline-info" id="K" onClick={searchByFirstChar}> K </button>
                                    <button   type="button" class="btn btn-outline-info" id="L" onClick={searchByFirstChar}> L </button>
                                    <button   type="button" class="btn btn-outline-info" id="M" onClick={searchByFirstChar}> M </button>
                                    <button   type="button" class="btn btn-outline-info" id="N" onClick={searchByFirstChar}> N </button>
                                    <button   type="button" class="btn btn-outline-info" id="O" onClick={searchByFirstChar}> O </button>
                                    <button   type="button" class="btn btn-outline-info" id="P" onClick={searchByFirstChar}> P </button>
                                    <button   type="button" class="btn btn-outline-info" id="Q" onClick={searchByFirstChar}> Q </button>
                                    <button   type="button" class="btn btn-outline-info" id="R" onClick={searchByFirstChar}> R </button>
                                    <button   type="button" class="btn btn-outline-info" id="S" onClick={searchByFirstChar}> S </button>
                                    <button   type="button" class="btn btn-outline-info" id="T" onClick={searchByFirstChar}> T </button>
                                    <button   type="button" class="btn btn-outline-info" id="U" onClick={searchByFirstChar}> U </button>
                                    <button   type="button" class="btn btn-outline-info" id="V" onClick={searchByFirstChar}> V </button>
                                    <button   type="button" class="btn btn-outline-info" id="W" onClick={searchByFirstChar}> W </button>
                                    <button   type="button" class="btn btn-outline-info" id="X" onClick={searchByFirstChar}> X </button>
                                    <button   type="button" class="btn btn-outline-info" id="Y" onClick={searchByFirstChar}> Y </button>
                                    <button   type="button" class="btn btn-outline-info" id="Z" onClick={searchByFirstChar}> Z </button>
                                </div>
                                
                                <form className={"ng-untouched ng-pristine ng-valid"} padding="5px" role="search" onSubmit={submitSearch}> 
                                    <div className={"input-group mb-3"} padding="5px">  
                                        <input className={"form-control w-50"} type="search" placeholder={`Tìm kiếm theo ${obFilter}`} aria-label="Search" value={searchItem} onChange={changeInput}/>
                                        <button className={"btn btn-info"} type="submit"> 
                                            <SearchIcon />
                                        </button>  
                                    </div> 
                                </form>
                                <div className={"d-flex justify-content-center"}>
                                    <div className={"btn-group btn-group-lg"} role="group" aria-label="Basic radio toggle button group">
                                        <input type="radio" className={"btn-check"} name="btnradio" id="name" autocomplete="off" defaultChecked onChange={changeSearch}/>
                                        <label className={"btn btn-outline-light"} for="name"><MedicationOutlinedIcon/> Tên thuốc</label>

                                        <input type="radio" className={"btn-check"} name="btnradio" id="active_element" autocomplete="off" onChange={changeSearch}/>
                                        <label className={"btn btn-outline-light"} for="active_element"><ScienceOutlinedIcon/> Hoạt chất</label>

                                        <input type="radio" className={"btn-check"} name="btnradio" id="catalogue" autocomplete="off" onChange={changeSearch}/>
                                        <label className={"btn btn-outline-light"} for="catalogue"><WidgetsOutlinedIcon/>Danh mục</label>
                                    </div>
                                </div>
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
                        <h5 className={"modal-title"} id="exampleModalLabel">Thêm thuốc</h5>
                        <button type="button" className={"btn-close"} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className={"modal-body"}>
                        <input className={"form-control m-2"} type="text" name="name" placeholder="Tên thuốc" value={addItem.name} onChange={changeSaveItem}/>
                        <input className={"form-control m-2"} type="text" name="number" placeholder="Số đăng kí" value={addItem.number} onChange={changeSaveItem}/>
                        <input className={"form-control m-2"} type="text" name="catelogue" placeholder="Danh mục" value={addItem.catelogue} onChange={changeSaveItem}/>
                        <input className={"form-control m-2"} type="text" name="type" placeholder="Dạng bào chế" value={addItem.type} onChange={changeSaveItem}/>
                        <input className={"form-control m-2"} type="text" name="packing" placeholder="Đóng gói" value={addItem.packing} onChange={changeSaveItem}/>
                        <input className={"form-control m-2"} type="text" name="expiry" placeholder="Hạng sử dụng" value={addItem.expiry} onChange={changeSaveItem}/>
                        <input className={"form-control m-2"} type="text" name="active_element" placeholder="Hoạt chất" value={addItem.active_element} onChange={changeSaveItem}/>
                        <input className={"form-control m-2"} type="text" name="produce" placeholder="Công ty sản xuất" value={addItem.produce} onChange={changeSaveItem}/>
                        <input className={"form-control m-2"} type="file" name="img_url" placeholder="Link ảnh" onChange={changeSaveItem}/>
                        <div class="input-group m-2">
                            <span className={"input-group-text"} id="basic-addon1">đ</span>
                            <input type="number" className={"form-control"} name="price" placeholder="Giá bán" value={addItem.price} onChange={changeSaveItem}/>
                            <span className={"input-group-text"} id="basic-addon2">/</span>
                            <input type="text" className={"form-control"} name="unit" placeholder="Đơn vị" value={addItem.unit} onChange={changeSaveItem}/>
                        </div>
                    </div>
                    <div className={"modal-footer"}>
                        <button type="button" className={"btn btn-secondary"} data-bs-dismiss="modal">Hủy</button>
                        <button type="button" className={"btn btn-primary"} data-bs-dismiss="modal" onClick={submitAdd}>Lưu</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Medicine;
