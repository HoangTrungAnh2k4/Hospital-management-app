import Catalogue from "./Catalogue";
function Slicebar(props) {
    return (
        <ul class="list-unstyled ps-0">
            {props.catalogues.map( (item, index) => {
                return  <Catalogue key={index} catalogues={item} setTarget={props.setTarget}/>
            })}   
        </ul>
    );
}
export default Slicebar;