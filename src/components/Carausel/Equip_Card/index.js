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
        setFixItem(props.equipment);
    }, [props.equipment]);
    const [prevImg, setPrevImg] = useState(props.equipment.img_url);

    function changeFixItem(event) {
        const { name, value, files } = event.target;
        if (name === "img_url" && files && files.length > 0) {
            const file = files[0];
            const fixQuipBtn = document.getElementById("fixQuipbtn");
            fixQuipBtn.setAttribute('disabled', true);
    
            uploadImage(file, "equipments", (downloadURL) => {
                setFixItem(prevState => ({
                    ...prevState,
                    [name]: downloadURL
                }));
                fixQuipBtn.removeAttribute('disabled');
            }).catch(error => {
                console.error("Error uploading image: ", error);
                fixQuipBtn.removeAttribute('disabled');
            });
        } else {
            setFixItem(prevState => ({
                ...prevState,
                [name]: name === "quantity" ? Number(value) : value
            }));
        }
    }
    
    function submitFixItem(event){
        event.preventDefault();
        if (fixItem.img_url !== prevImg){
            deleteImage(prevImg, "equipments");
            setPrevImg(fixItem.img_url);
        }
        updateEquipment(props.equipment.catalogue1Id, props.equipment.catalogue2Id, props.equipment.id, fixItem);
    }
    
    function submitCancelFix(event){
        if ( fixItem.img_url !== prevImg){
            deleteImage(fixItem.img_url, "equipments");
            fixItem.img_url = prevImg;
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
    function submitDelEquip(event){
        event.preventDefault();
        deleteImage(props.equipment.img_url, "equipments");
        deleteEquipment(props.equipment.catalogue1Id, props.equipment.catalogue2Id , props.equipment.id)
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
        if ( !newWin_bid.date || !newWin_bid.wquantity || !newWin_bid.wunit){
            alert("Vui lòng điền đầy đủ thông tin các trường bắt buộc.");
            return;
        }
        addWinBidEquipment(props.equipment.catalogue1Id, props.equipment.catalogue2Id , props.equipment.id, newWin_bid).then(() => {
            setNewWin_bid(initWinBid);
        })
    }
    function submitDelBid(event, bidId){
        event.preventDefault();
        deleteWinBidEquipment(props.equipment.catalogue1Id, props.equipment.catalogue2Id ,props.equipment.id, bidId);
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
                        <p>Số lượng còn lại: {props.equipment.quantity}</p>
                        <div class="d-flex align-items-center">
                            <h5 class="me-3">Đấu thầu thành công:</h5>
                            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target={`#${props.equipment.id}win_bid`}>Nhập hàng</button>
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
                                {props.equipment.win_bid.map((item, index) => (
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
                            <button type="button" class="btn btn-lg btn-danger me-2" data-bs-toggle="modal" data-bs-target={`#${props.equipment.id}delete`}>Xóa</button>
                            <button type="button" class="btn btn-lg btn-warning" data-bs-toggle="modal" data-bs-target={`#${props.equipment.id}fixquip`}>Chỉnh sửa</button>
                        </div>
                        <button type="button" class="btn btn-lg btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id={`${props.equipment.id}delete`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                        <button type="button" class="btn btn-lg btn-danger" data-bs-dismiss="modal" onClick={submitDelEquip}>Xóa</button>
                        <button type="button" class="btn btn-lg btn-secondary" data-bs-toggle="modal" data-bs-target={`#${props.equipment.id}Backdrop`}>Hủy</button>
                    </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id={`${props.equipment.id}fixquip`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Chỉnh sửa</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={submitCancelFix}></button>
                    </div>
                    <div class="modal-body">
                        <form class="form-floating">
                            <input class="form-control form-control-lg m-2" type="text" name="name" placeholder="Tên thiết bị" defaultValue={props.equipment.name} onChange={changeFixItem}/>
                            <input class="form-control form-control-lg m-2" type="text" name="produce" placeholder="Nơi sản xuất" defaultValue={props.equipment.produce} onChange={changeFixItem}/>
                            <input class="form-control form-control-lg m-2" type="text" name="expiry" placeholder="Hạng sử dụng" defaultValue={props.equipment.expiry} onChange={changeFixItem}/>
                            <input class="form-control form-control-lg m-2" type="number" name="quantity" placeholder="Số lượng còn lại" defaultValue={props.equipment.quantity} onChange={changeFixItem}/>
                            <input class="form-control form-control-lg m-2" type="file" name="img_url" placeholder="Link ảnh" onChange={changeFixItem}/>
                            <p>Đấu thầu thành công:</p>
                            {
                                props.equipment.win_bid.map((item, index) => (
                                    <div className="input-group m-2" key={index}>
                                        <input type="date" className="form-control form-control-lg" name="date" defaultValue={item.date} onChange={(e) => changFixWinBid(e, index)}/>
                                        <input type="number" className="form-control form-control-lg" name="wprice" defaultValue={item.wprice} onChange={(e) => changFixWinBid(e, index)}/>
                                        <input type="number" className="form-control form-control-lg" name="wquantity" defaultValue={item.wquantity} onChange={(e) => changFixWinBid(e, index)}/>
                                        <input type="text" className="form-control form-control-lg" name="wunit" defaultValue={item.wunit} onChange={(e) => changFixWinBid(e, index)}/>
                                        <button className="btn btn-lg btn-outline-secondary" type="button" onClick={(e) => submitDelBid(e, index)} data-bs-toggle="modal" data-bs-target={`#${props.equipment.id}Backdrop`}>Xóa</button>
                                    </div>
                                ))
                            }

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-lg btn-secondary" data-bs-toggle="modal" data-bs-target={`#${props.equipment.id}Backdrop`} onClick={submitCancelFix}>Hủy</button>
                        <button id="fixQuipbtn" type="button" class="btn btn-lg btn-primary" data-bs-toggle="modal" data-bs-target={`#${props.equipment.id}Backdrop`} onClick={submitFixItem}>Lưu</button>
                    </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id={`${props.equipment.id}win_bid`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Đấu thầu thành công</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <input type="date" name="date" class="form-control form-control-lg" placeholder="Ngày nhập" onChange={changeNewBid}/>
                            <input type="number" name="wprice" class="form-control form-control-lg" placeholder="Giá nhập" onChange={changeNewBid}/>
                            <input type="number" name="wquantity" class="form-control form-control-lg" placeholder="Số lượng" onChange={changeNewBid}/>
                            <input type="text" name="wunit" class="form-control form-control-lg" placeholder="Đơn vị" onChange={changeNewBid}/>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-lg btn-secondary" data-bs-toggle="modal" data-bs-target={`#${props.equipment.id}Backdrop`}>Hủy</button>
                        <button type="button" class="btn btn-lg btn-primary" data-bs-toggle="modal" data-bs-target={`#${props.equipment.id}Backdrop`} onClick={submitNewBid}>Lưu</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ECard;