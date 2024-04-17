import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { updateEquipment, deleteEquipment, addWinBidEquipment, deleteWinBidEquipment } from '~/firebase';
import { uploadImage, deleteImage } from '~/firebase';
import { useState, useEffect } from 'react';

function ECard(props){
    const initWinBid = {
        date: null,
        wprice: 0,
        wquantity: 0,
        wunit: null
    };
    const [fixItem, setFixItem] =useState({});
    const [newWin_bid, setNewWin_bid] = useState(initWinBid);
    useEffect(() => {
        setFixItem(props.medicine);
    }, [props.medicine]);
    const [prevImg, setPrevImg] = useState(props.equipment.img_url);

    function changeFixItem(event) {
        const { name, value, files } = event.target;
        if (name === "img_url" && files && files.length > 0) {
            const file = files[0];
            uploadImage(file, "equipments", (downloadURL) => {
                setFixItem(prevState => {
                    return {
                        ...prevState,
                        [name]: downloadURL
                    };
                });
            });
        } else {
            setFixItem(prevState => {
                if (name === "quantity") {
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
    function submitFixItem(event){
        event.preventDefault();
        if ( fixItem.img_url != prevImg){
            deleteImage(prevImg, "equipments");
            setPrevImg(fixItem.img_url);
        }
        updateEquipment(props.equipment.catelogue_1, props.equipment.catelogue_2, props.equipmentid, fixItem);
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
    function submitDelEquip(event){
        event.preventDefault();
        deleteImage(prevImg, "equipments");
        deleteEquipment(props.equipment.catalogue_1, props.equipment.catalogue_2 , props.equipment.id)
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
        addWinBidEquipment(props.equipment.catalogue_1, props.equipment.catalogue_2 , props.equipment.id, newWin_bid);
        setNewWin_bid(initWinBid);
    }
    return (
        <div class="col-md-3 col-sm-6" >
            <div class="card border-info my-2 rounded-4" style={{height: "45vh"}} data-bs-toggle="modal" data-bs-target={`#${props.equipment.id}Backdrop`}>
                <img src={props.equipment.img_url} class="card-img-top" alt="..."/>
                <div class="card-body" style={{fontSize: "15px"}}>
                    <h4 class="card-title text-align-center"><i class="fa-solid fa-stethoscope"></i> {props.equipment.name}</h4>
                    <p class="card-text"><i class="fa-solid fa-location-dot"></i> {props.equipment.produce}</p>
                    <p class="card-text"><i class="fa-regular fa-clock"></i> {props.equipment.expiry}</p>
                    <p class="card-text"><i class="fa-solid fa-store"></i> {props.equipment.quantity}</p>
                </div>
            </div>
            <div class="modal fade" id={`${props.equipment.id}Backdrop`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">{props.equipment.name}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src={props.equipment.img_url} alt="..."/>
                        <p>Nhà sản xuất: {props.equipment.produce}</p>
                        <p>Hạng sử dụng: {props.equipment.expiry}</p>
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
                                </tr>
                            </thead>
                            <tbody>
                                {props.equipment.win_bid.map((item, index) => (
                                    <tr key={index}> 
                                        <th scope="row">{item.date}</th> 
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                    </tr>
                                ))}     
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer d-flex justify-content-between">
                        <div>
                            <button type="button" class="btn btn-danger me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Xóa</button>
                            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#fixEquipModal">Chỉnh sửa</button>
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
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={submitDelEquip}>Xóa</button>
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#${props.equipment.id}Backdrop`}>Hủy</button>
                    </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="fixEquipModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Chỉnh sửa</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="form-floating">
                            <input class="form-control m-2" type="text" name="catelogue_1" placeholder="Danh mục lớn" defaultValue={props.equipment.catalogue_1} onChange={changeFixItem}/>
                            <input class="form-control m-2" type="text" name="catelogue_2" placeholder="Danh mục nhỏ" defaultValue={props.equipment.catalogue_2} onChange={changeFixItem}/>
                            <input class="form-control m-2" type="text" name="name" placeholder="Tên thiết bị" defaultValue={props.equipment.name} onChange={changeFixItem}/>
                            <input class="form-control m-2" type="text" name="produce" placeholder="Nơi sản xuất" defaultValue={props.equipment.produce} onChange={changeFixItem}/>
                            <input class="form-control m-2" type="text" name="expiry" placeholder="Hạng sử dụng" defaultValue={props.equipment.expiry} onChange={changeFixItem}/>
                            <input class="form-control m-2" type="number" name="quantity" placeholder="Số lượng còn lại" defaultValue={props.equipment.quantity} onChange={changeFixItem}/>
                            <input class="form-control m-2" type="file" name="img_url" placeholder="Link ảnh" onChange={changeFixItem}/>
                            <p>Đấu thầu thành công:</p>
                            {
                                props.equipment.win_bid.map((item, index) => (
                                    <div className="input-group m-2" key={index}>
                                        <input type="date" className="form-control" name="date" defaultValue={item.date} onChange={changFixWinBid}/>
                                        <input type="number" className="form-control" name="wprice" defaultValue={item.wprice} onChange={changFixWinBid}/>
                                        <input type="number" className="form-control" name="wquantity" defaultValue={item.wquantity} onChange={changFixWinBid}/>
                                        <input type="text" className="form-control" name="wunit" defaultValue={item.wunit} onChange={changFixWinBid}/>
                                        <button className="btn btn-outline-secondary" type="button">Xóa</button>
                                    </div>
                                ))
                            }

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#${props.equipment.id}Backdrop`}>Hủy</button>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${props.equipment.id}Backdrop`} onClick={submitFixItem}>Lưu</button>
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
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#${props.equipment.id}Backdrop`}>Hủy</button>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${props.equipment.id}Backdrop`} onClick={submitNewBid}>Lưu</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ECard;