function Edetail_3(props){
    function handleClick(event){
        props.setTarget([props.parentId, props.equipments.id]);
    }
    return <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleClick}>{props.equipments.name}</a></li>
}
export default Edetail_3;