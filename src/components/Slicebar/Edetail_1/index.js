import Edetail_2 from "../Edetail_2";
function Edetail_1(props) {
    return (
        <ul class="list-unstyled ps-0">
            {props.catalogues.map( (item, index) => {
                return  <Edetail_2 key={index} catalogues={item} setTarget={props.setTarget}/>
            })}   
        </ul>
    );
}
export default Edetail_1;