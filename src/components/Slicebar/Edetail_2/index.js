import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import Edetail_3 from '../Edetail_3';
function Edetail_2(props) {
    return (
        <li class="mb-1">
            <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target={`#${props.equipments.id}-collapse`} aria-expanded="false">
                <ArrowDropDownCircleOutlinedIcon/> {props.equipments.name}
            </button>
            <div class="collapse" id={`${props.equipments.id}-collapse`}>
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 ps-4 small">
                    { props.equipments.detail.map( (item) => {
                        return <Edetail_3 key={props.equipments.id} equipments={item} setTarget={props.setTarget} parentId={props.equipments.id}/>
                    })}
                </ul>
            </div>
        </li>
    );
}
export default Edetail_2;