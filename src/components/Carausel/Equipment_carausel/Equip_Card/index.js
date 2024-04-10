import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
function ECard(props){
    return (
        <div class="col-md-3 col-sm-6" >
            <div class="card border-info my-2 rounded-4" style={{height: "47vh"}} data-bs-toggle="modal" data-bs-target={`#${props.equipment.id}Backdrop`}>
                <img src={props.equipment.img_url} class="card-img-top" alt="..."/>
                <div class="card-body" style={{fontSize: "12px"}}>
                    <h4 class="card-title text-align-center">{props.equipment.name}</h4>
                    <p class="card-text">{props.equipment.produce}</p>
                    <p class="card-text">{props.equipment.expire}</p>
                    <p class="card-text">{props.equipment.win_bid[0].price}</p>
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
                        <p>Hạng sử dụng: {props.equipment.expire}</p>
                        <h5>Đấu thầu thành công:</h5>
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
                            <button type="button" class="btn btn-warning">Chỉnh sửa</button>
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
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ECard;