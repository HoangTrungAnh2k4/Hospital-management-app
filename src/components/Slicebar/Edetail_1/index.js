import Edetail_2 from "../Edetail_2";
function Edetail_1(props) {
    return (
        <ul class="list-unstyled ps-0">
            {props.equipments.map( (item) => {
                return  <Edetail_2 key={props.equipments.id} equipments={item} setTarget={props.setTarget}/>
            })}   
        </ul>
    );
}
export default Edetail_1;