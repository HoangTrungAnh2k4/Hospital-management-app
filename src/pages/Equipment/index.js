import SearchIcon from '@mui/icons-material/Search';
import clsx from 'clsx';
import styles from "./Equipment.module.scss"
import Edetail_1 from '~/components/Slicebar/Edetail_1';
import { useState } from 'react';
import Carausel from '~/components/Carausel';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { addEquipment, uploadImage, deleteImage, getEquipmentByCatalogue, getCatalogue, queryEquipmentByName, updateCatalogue1Name, updateCatalogue2Name, deleteCatalogue1, deleteCatalogue2, getHistory } from '~/firebase';

function Equipment() {
    const navigate = useNavigate();

   useEffect(() => {
        if (localStorage.getItem('auth') !== 'admin') {
            navigate('/');
        }
    }, []);
    const initialState = {
        catalogue_1: "",
        catalogue_2: "",
        name: "",
        produce: "",
        expiry: "",
        img_url: "",
        quantity: 0,
        win_bid: []
    }
    const [data, setData] = useState([]);
    const [catalogues, setCatalogues] = useState([]);
    const [addItem, setAddItem] = useState(initialState);
    const [target, setTarget] = useState([null, null]);
    const [searchItem, setSearchItem] = useState('');
    const [fixCata, setFixCate] = useState("");
    const [history, setHistory] = useState([]);
    useEffect(() => {
        getEquipmentByCatalogue(target[0], target[1], (equipmentList) => {
            setData(equipmentList);
        });
    }, [target]);
    useEffect(() => {
        getCatalogue((catalogueData) => {
            setCatalogues(catalogueData);
        });
    }, []);
    useEffect(() => {
        getHistory( false, (documents) => {
            setHistory(documents);
        });
    }, []);
    async function changeAddItem(event) {
        const { name, value, files } = event.target;
    
        if (name === "img_url" && files[0]) {
            try {
                const downloadURL = await uploadImage(files[0], "equipments");
                setAddItem(prevState => ({
                    ...prevState,
                    [name]: downloadURL
                }));
            } catch (error) {
                alert('Upload failed: ' + error.message);
            }
        } else {
            setAddItem(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }
    
    function submitAdd(event){
        event.preventDefault();
        addEquipment( addItem.catalogue_1, addItem.catalogue_2, addItem);
        setAddItem(initialState);
    }

    function submitCancelAdd(event){
        event.preventDefault();
        deleteImage(addItem.img_url, "equipments");
    }

    function checkData() {
        if (data.length === 0) {

          return <div class="d-flex justify-content-center p-5"><h1>Không tìm thấy thông tin...</h1></div>;
        }
        return <Carausel elements={data} option="equipment"/>;
    }

    function changeSearch(event){
        setSearchItem(event.target.value);
    }

    function submitSearch(event){
        event.preventDefault();
        queryEquipmentByName( searchItem, (equipmentResults) => {
            setData(equipmentResults);
        })
    }

    function changFixCata(event){
        setFixCate(event.target.value);
    }

    function submitFixCata1(event){
        event.preventDefault();
        updateCatalogue1Name(event.target.id, fixCata);
        setFixCate("");
    }

    function submitFixCata2(event) {
        event.preventDefault();
        const button = event.target;
        const parentid = button.dataset.parentid;
        const id = button.dataset.id;
        updateCatalogue2Name(parentid, id, fixCata);
        setFixCate("");
    }
    

    function submitDelCata1(event){
        event.preventDefault();
        const catalogueId = event.target.id;
        
        deleteCatalogue1(catalogueId)
            .then(() => {
                // Cập nhật state để loại bỏ catalogue này khỏi danh sách
                const updatedCatalogues = catalogues.filter(catalogue => catalogue.id !== catalogueId);
                setCatalogues(updatedCatalogues);
            })
            .catch(error => {
                console.error("Failed to delete catalogue:", error);
            });
    }
    

    function submitDelCata2(event){
        event.preventDefault();
        const button = event.target;
        const parentid = button.dataset.parentid;
        const id = button.dataset.id;
        deleteCatalogue2(parentid, id);
    }
    
    return (
        <div className={clsx(styles.Equipment)}>
            <div className={clsx("flex-shrink-0 bg-white --bs-primary-border-subtle rounded-3", styles.SlicebarArea)}>
                <div style={{ backgroundColor: "rgb(101, 197, 197)" }}>
                    <h3 style={{ padding: "10px" }}>Danh mục vật tư</h3>
                </div>
                <form role="search" class="input-group mb-3 p-2" padding="5px" onSubmit={submitSearch}>
                    <input class="form-control" type="search" placeholder="Search" aria-label="Search" value={searchItem} onChange={changeSearch}/>
                    <button class="btn btn-outline-info" type="submit"><SearchIcon/></button>  
                </form>
                <hr/>
                <Edetail_1 catalogues={catalogues} setTarget={setTarget} />
                <hr/>
                <button class="btn btn-toggle align-items-center rounded collapsed ps-3" aria-expanded="false" data-bs-toggle="offcanvas" data-bs-target="#showHistory">
                    <i class="fa-solid fa-clock-rotate-left"></i> Lịch sử
                </button>
                <br/>
                <button class="btn btn-toggle align-items-center rounded collapsed ps-3" aria-expanded="false"data-bs-toggle="offcanvas" data-bs-target="#fixSliceBar">
                    <i class="fa-solid fa-pencil"></i> Chỉnh sửa
                </button>
                <br/>
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
                        <button type="button" className={"btn-close"} data-bs-dismiss="modal" aria-label="Close" onClick={submitCancelAdd}></button>
                    </div>
                    <div className={"modal-body"}>
                        <input className={"form-control m-2"} type="text" name="catalogue_1" placeholder="Danh mục lớn" onChange={changeAddItem}/>
                        <input className={"form-control m-2"} type="text" name="catalogue_2" placeholder="Danh mục nhỏ" onChange={changeAddItem}/>
                        <input className={"form-control m-2"} type="text" name="name" placeholder="Tên thiết bị" onChange={changeAddItem}/>
                        <input className={"form-control m-2"} type="text" name="produce" placeholder="Nơi sản xuất" onChange={changeAddItem}/>
                        <input className={"form-control m-2"} type="text" name="expiry" placeholder="Hạng sử dụng" onChange={changeAddItem}/>
                        <input className={"form-control m-2"} type="file" name="img_url" placeholder="Link ảnh" onChange={changeAddItem}/>
                    </div>
                    <div className={"modal-footer"}>
                        <button type="button" className={"btn btn-secondary"} data-bs-dismiss="modal" onClick={submitCancelAdd}>Hủy</button>
                        <button type="button" className={"btn btn-primary"} data-bs-dismiss="modal" onClick={submitAdd}>Lưu</button>
                    </div>
                    </div>
                </div>
            </div>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="showHistory" aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header">
                    <h3 id="offcanvasRightLabel">Lịch sử</h3>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="list-group list-group-flush border-bottom scrollarea">
                        {history.map((item, index) => { return(
                            <a href="#" class="list-group-item list-group-item-action py-3 lh-tight">
                                <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1">{item.field}</strong>
                                <small class="text-muted">{item.time}</small>
                                </div>
                                <div class="col-10 mb-1 small">{item.content}</div>
                            </a>)
                        })}
                    </div>
                </div>
            </div>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="fixSliceBar" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h3 className="offcanvas-title" id="offcanvasExampleLabel">Chỉnh sửa</h3>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form className="form-floating">
                        {catalogues.map((item, index) => (
                            <div key={item.id}>
                                <div className="input-group m-2" key={index}>
                                    <input className="form-control" type="text" defaultValue={item.name} onChange={changFixCata}/>
                                    <button className="btn btn-outline-danger" type="button" id={item.id} onClick={submitDelCata1}>Xóa</button>
                                    <button className="btn btn-outline-primary" type="button" id={item.id} onClick={submitFixCata1}>Lưu</button>
                                </div>
                                {item.details.map((subItem, subIndex) => (
                                    <div className="input-group" key={subIndex}>
                                        <input className="form-control ms-5" type="text" defaultValue={subItem.name} onChange={changFixCata}/>
                                        <button data-parentid={item.id} data-id={subItem.id} className="btn btn-outline-danger" type="button" onClick={submitDelCata2}>Xóa</button>
                                        <button data-parentid={item.id} data-id={subItem.id} className="btn btn-outline-primary" type="button" onClick={submitFixCata2}>Lưu</button>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Equipment;
