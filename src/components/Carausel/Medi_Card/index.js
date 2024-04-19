import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import React, {useState, useEffect} from 'react';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { deleteMedicine, updateMedicine, addWinBidMedicine, deleteWinBidMedicine} from '~/firebase';
import { uploadImage, deleteImage } from '~/firebase';

function MCard(props){
    const initWinBid = {
        date: null,
        wprice: 0,
        wquantity: 0,
        wunit: null
    };
    const [fixItem, setFixItem] =useState({});
    const [newWin_bid, setNewWin_bid] = useState(initWinBid);
    const [prevImg, setPrevImg] = useState(props.medicine.img_url);
    useEffect(() => {
        setFixItem(props.medicine);
    }, [props.medicine]);
    useEffect(() => {
        if (fixItem.quantity !== undefined && fixItem.quantity !== props.medicine.quantity) {
            updateMedicine(props.medicine.id, fixItem);
        }
    }, [fixItem.quantity]);
    function changeFixItem(event) {
        const { name, value, files } = event.target;
        if (name === "img_url" && files && files.length > 0) {
            const file = files[0];
            uploadImage(file, "medicines", (downloadURL) => {
                setFixItem(prevState => {
                    return {
                        ...prevState,
                        [name]: downloadURL
                    };
                });
            });
        } else {
            setFixItem(prevState => {
                if (name === "catelogue" || name === "active_element") {
                    return {
                        ...prevState,
                        [name]: value.split(",").map(item => item.trim())
                    };
                } else if (name === "price" || name === "quantity") {
                    return {
                        ...prevState,
                        [name]: Number(value)
                    };
                } else {
                    return {
                        ...prevState,
                        [name]: value
                    };
                }
            });
        }
    }
    
    function changFixWinBid(event, index){
        const { name, value } = event.target;
        setFixItem(prevState => {
            const newWinBids = [...prevState.win_bid];
            if ( name === "wprice" || name === "wquantity"){
                newWinBids[index] = { ...newWinBids[index], [name]: Number(value) }
            }   
            else {newWinBids[index] = { ...newWinBids[index], [name]: value }}
            return { ...prevState, win_bid: newWinBids };
        });
    }
    
    function submitFixItem(event){
        event.preventDefault();
        if ( fixItem.img_url != prevImg){
            deleteImage(prevImg, "medicines");
            setPrevImg(fixItem.img_url);
        }
        updateMedicine(props.medicine.id, fixItem);
    }
    function submitDelete(event){
        event.preventDefault();
        deleteImage(props.medicine.img_url, "medicines");
        deleteMedicine(props.medicine.id);
    }
    function changeNewBid(event){
        const {name, value} = event.target;
        setNewWin_bid((prevState) => {
            if ( name === "wprice" || name=== "wquantity"){
                return {
                    ...prevState,
                    [name]: Number(value)
                };
            }
            else {
                return {
                    ...prevState,
                    [name]: value
                };
            }
        });
    }
    function submitNewBid(event) {
        event.preventDefault();
        addWinBidMedicine(props.medicine.id, newWin_bid);
        setNewWin_bid(initWinBid);
    }
    function submitDelBid(event, bidId){
        event.preventDefault();
        deleteWinBidMedicine(props.medicine.id, bidId);
    }
    function decreaseQuantity() {
        setFixItem(prevState => {
            const newQuantity = prevState.quantity > 0 ? prevState.quantity - 1 : 0;
            return { ...prevState, quantity: newQuantity };
        });
    }
    
    return (
        
        <div class="col-md-3 col-sm-6" >
            <div class="card border-info my-2 rounded-4" style={{height: "47vh"}} data-bs-toggle="modal" data-bs-target={`#${props.medicine.id}Backdrop`}>
                <img src={props.medicine.img_url} class="card-img-top" alt="..."/>
                <div class="card-body" style={{fontSize: "12px"}}>
                    <h4 class="card-title text-align-center">{props.medicine.name}</h4>
                    <p class="card-text">{props.medicine.number}</p>
                    <p class="card-text"><ScienceOutlinedIcon/>{props.medicine.active_element.join(", ")}</p>
                    <p class="card-text"><EventNoteOutlinedIcon/>{props.medicine.type}</p>
                    <p class="card-text"><WidgetsOutlinedIcon/>{props.medicine.catelogue.join(", ")}</p>
                    <p class="card-text">{props.medicine.price}đ/{props.medicine.unit}</p>
                </div>
            </div>
            <div class="modal fade" id={`${props.medicine.id}Backdrop`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">{props.medicine.name}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src={props.medicine.img_url} alt="..."/>
                        <p>Số đăng ký: {props.medicine.number}</p>
                        <p>Danh mục: {props.medicine.catelogue.join(" ,")}</p>
                        <p>Dạng bào chế: {props.medicine.type}</p>
                        <p>Đóng gói: {props.medicine.packing}</p>
                        <p>Hoạt chất: {props.medicine.active_element.join(" ,")}</p>
                        <p>Nhà sản xuất: {props.medicine.produce}</p>
                        <div class="d-flex align-items-center">
                            <p>Số lượng còn lại: {props.medicine.quantity}</p>
                            <button type="button" class="btn btn-info ms-3 px-3" onClick={decreaseQuantity}> - </button>
                        </div>
                        <p>Giá bán công khai: {props.medicine.price}đ/{props.medicine.unit}</p>
                        <div class="d-flex align-items-center">
                            <h5 class="me-3">Đấu thầu thành công:</h5>
                            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#win_bidBackdrop">Nhập hàng</button>
                        </div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Thời gian</th>
                                    <th scope="col">Giá nhập</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Đơn vị</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.medicine.win_bid.map((item, index) => (
                                    <tr key={index}> 
                                        <th scope="row">{item.date}</th> 
                                        <td>{item.wprice}</td>
                                        <td>{item.wquantity}</td>
                                        <td>{item.wunit}</td>
                                    </tr>
                                ))}     
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer d-flex justify-content-between">
                        <div>
                            <button type="button" class="btn btn-danger me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Xóa</button>
                            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#fixMedModal">Chỉnh sửa</button>
                        </div>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content border border-danger border-2">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5 text-warning" id="staticBackdropLabel"><WarningAmberOutlinedIcon/> Cảnh báo</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-5">
                        Bạn chắc chắn muốn xóa?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={submitDelete}>Xóa</button>
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#${props.medicine.id}Backdrop`}>Hủy</button>
                    </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="win_bidBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Đấu thầu thành công</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <input type="date" name="date" class="form-control" placeholder="Ngày nhập" onChange={changeNewBid}/>
                            <input type="number" name="wprice" class="form-control" placeholder="Giá nhập" onChange={changeNewBid}/>
                            <input type="number" name="wquantity" class="form-control" placeholder="Số lượng" onChange={changeNewBid}/>
                            <input type="text" name="wunit" class="form-control" placeholder="Đơn vị" onChange={changeNewBid}/>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#${props.medicine.id}Backdrop`}>Hủy</button>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${props.medicine.id}Backdrop`} onClick={submitNewBid}>Lưu</button>
                    </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="fixMedModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Chỉnh sửa</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="form-floating">
                            <input class="form-control m-2" type="text" name="name" placeholder="Tên thuốc" defaultValue={props.medicine.name} onChange={changeFixItem}/>
                            <input class="form-control m-2" type="text" name="number" placeholder="Số đăng kí" defaultValue={props.medicine.number} onChange={changeFixItem}/>
                            <input class="form-control m-2" type="text" name="catelogue" placeholder="Danh mục" defaultValue={props.medicine.catelogue.join(" ,")} onChange={changeFixItem}/>
                            <input class="form-control m-2" type="text" name="type" placeholder="Dạng bào chế" defaultValue={props.medicine.type} onChange={changeFixItem}/>
                            <input class="form-control m-2" type="text" name="packing" placeholder="Đóng gói" defaultValue={props.medicine.packing} onChange={changeFixItem}/>
                            <input class="form-control m-2" type="text" name="expiry" placeholder="Hạng sử dụng" defaultValue={props.medicine.expiry} onChange={changeFixItem}/>
                            <input class="form-control m-2" type="text" name="active_element" placeholder="Hoạt chất" defaultValue={props.medicine.active_element.join(", ")} onChange={changeFixItem}/>
                            <input class="form-control m-2" type="text" name="produce" placeholder="Công ty sản xuất" defaultValue={props.medicine.produce} onChange={changeFixItem}/>
                            <input class="form-control m-2" type="number" name="quantity" placeholder="Số lượng còn lại" defaultValue={props.medicine.quantity} onChange={changeFixItem}/>
                            <input class="form-control m-2" type="file" name="img_url" placeholder="Link ảnh" onChange={changeFixItem}/>
                            <div class="input-group m-2">
                                <span class="input-group-text" id="basic-addon1">đ</span>
                                <input type="number" class="form-control" name="price" placeholder="Giá bán" defaultValue={props.medicine.price} onChange={changeFixItem}/>
                                <span class="input-group-text" id="basic-addon2">/</span>
                                <input type="text" class="form-control" name="unit" placeholder="Đơn vị" defaultValue={props.medicine.unit} onChange={changeFixItem}/>
                            </div>
                            <p>Đấu thầu thành công:</p>
                            {
                                props.medicine.win_bid.map((item, index) => (
                                    <div className="input-group m-2" key={index}>
                                        <input type="date" className="form-control" name="date" defaultValue={item.date} onChange={(e) => changFixWinBid(e, index)} />
                                        <input type="number" className="form-control" name="wprice" defaultValue={item.wprice} onChange={(e) => changFixWinBid(e, index)} />
                                        <input type="number" className="form-control" name="wquantity" defaultValue={item.wquantity} onChange={(e) => changFixWinBid(e, index)} />
                                        <input type="text" className="form-control" name="wunit" defaultValue={item.wunit} onChange={(e) => changFixWinBid(e, index)} />
                                        <button className="btn btn-outline-secondary" type="button" data-bs-toggle="modal" data-bs-target={`#${props.medicine.id}Backdrop`} onClick={(e) => submitDelBid(e, index)}>Xóa</button>
                                    </div>
                                ))
                            }

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#${props.medicine.id}Backdrop`}>Hủy</button>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${props.medicine.id}Backdrop`} onClick={submitFixItem}>Lưu</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MCard;