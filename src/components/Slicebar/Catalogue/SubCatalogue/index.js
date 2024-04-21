function SubCatalogue(props){
    function handleClick(event){
        props.setTarget(
            [props.parentId, props.catalogues.id]
        )
    }
    return <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleClick}>{props.catalogues.name}</a></li>
}
export default SubCatalogue;