function Edetail_3(props){
    function handleClick(event){
        props.setTarget(
            [props.parentName, props.catalogues.name]
        )
    }
    return <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleClick}>{props.catalogues.name}</a></li>
}
export default Edetail_3;