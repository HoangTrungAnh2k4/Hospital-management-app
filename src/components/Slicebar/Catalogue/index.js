import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import SubCatalogue from './SubCatalogue';
function Catalogue(props) {
    return (
        <li class="mb-1">
            <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target={`#${props.catalogues.id}-collapse`} aria-expanded="false">
                <ArrowDropDownCircleOutlinedIcon/> {props.catalogues.name}
            </button>
            <div class="collapse" id={`${props.catalogues.id}-collapse`}>
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 ps-4 small">
                    { props.catalogues.details.map( (item, index) => {
                        return <SubCatalogue key={index} catalogues={item} setTarget={props.setTarget} parentName={props.catalogues.name}/>
                    })}
                </ul>
            </div>
        </li>
    );
}
export default Catalogue;