import clsx from 'clsx';
import styles from "./Medicine.module.scss";
import SearchIcon from '@mui/icons-material/Search';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import { useState } from 'react';
import Medicines from './medicine_data';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import MCarausel from '~/components/Carausel/Medicine_carausel';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Medicine() {

    const navigate = useNavigate();

   useEffect(() => {
        if (localStorage.getItem('auth') !== 'admin') {
            navigate('/');
        }
    }, []);

    const [obFilter, setOjFilter] = useState("tên thuốc");
    const [data, setData] = useState(Medicines);
    const [searchItem, setSearchItem] = useState('');
    function handleChange(event){
        const id = event.target.id;
        if ( id === "name"){
            setOjFilter("tên thuốc");
        } else if( id === "active_element"){
            setOjFilter("hoạt chất");
        }           
        else if ( id === "catalogue"){
            setOjFilter("danh mục");
        }
    }
    function searchByFirstChar(event){
        setData(Medicines.filter((item) => {
            return (item.name[0] === event.target.id);
        }
        ))
    }
    function checkData() {
        if (data.length === 0) {

          return <div class="d-flex justify-content-center p-5"><h1>Không tìm thấy thông tin...</h1></div>;
        }
        return <MCarausel medicines={data} />;
    }
    function handleInputChange(event){
        setSearchItem(event.target.value);
    }
    function handleSubmit(event){
        event.preventDefault();
        if ( obFilter === "tên thuốc"){
            setData(Medicines.filter((item) => {
                return (item.name.toLowerCase().includes(searchItem.toLowerCase()));
            }))
        }
        else if ( obFilter === "hoạt chất"){
            setData(Medicines.filter((item) => {
                return item.active_element.some(element => 
                  element.toLowerCase().includes(searchItem.toLowerCase())
                );
            }));
        }
        else if ( obFilter === "danh mục"){
            setData(Medicines.filter((item) => {
                return item.catelogue.some( element => 
                  element.toLowerCase().includes(searchItem.toLowerCase())
                );
            }));
        }
    }

    return (
        <div style={{width: "95vw", margin: "auto"}}>
            <div className={clsx(styles.searchWrapper)}> 
                <div class="container py-md-5"> 
                    <div  class="row justify-content-center"> 
                        <div class="col-md-8"> 
                            <div class="search-content"> 
                                <div class="jusbtn-toolbar d-flex flex-wrap justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
                                    <button   type="button" class="btn btn-outline-info" id="A" onClick={searchByFirstChar}> A </button>
                                    <button   type="button" class="btn btn-outline-info" id="B" onClick={searchByFirstChar}> B </button>
                                    <button   type="button" class="btn btn-outline-info" id="C" onClick={searchByFirstChar}> C </button>
                                    <button   type="button" class="btn btn-outline-info" id="D" onClick={searchByFirstChar}> D </button>
                                    <button   type="button" class="btn btn-outline-info" id="E" onClick={searchByFirstChar}> E </button>
                                    <button   type="button" class="btn btn-outline-info" id="F" onClick={searchByFirstChar}> F </button>
                                    <button   type="button" class="btn btn-outline-info" id="G" onClick={searchByFirstChar}> G </button>
                                    <button   type="button" class="btn btn-outline-info" id="H" onClick={searchByFirstChar}> H </button>
                                    <button   type="button" class="btn btn-outline-info" id="I" onClick={searchByFirstChar}> I </button>
                                    <button   type="button" class="btn btn-outline-info" id="J" onClick={searchByFirstChar}> J </button>
                                    <button   type="button" class="btn btn-outline-info" id="K" onClick={searchByFirstChar}> K </button>
                                    <button   type="button" class="btn btn-outline-info" id="L" onClick={searchByFirstChar}> L </button>
                                    <button   type="button" class="btn btn-outline-info" id="M" onClick={searchByFirstChar}> M </button>
                                    <button   type="button" class="btn btn-outline-info" id="N" onClick={searchByFirstChar}> N </button>
                                    <button   type="button" class="btn btn-outline-info" id="O" onClick={searchByFirstChar}> O </button>
                                    <button   type="button" class="btn btn-outline-info" id="P" onClick={searchByFirstChar}> P </button>
                                    <button   type="button" class="btn btn-outline-info" id="Q" onClick={searchByFirstChar}> Q </button>
                                    <button   type="button" class="btn btn-outline-info" id="R" onClick={searchByFirstChar}> R </button>
                                    <button   type="button" class="btn btn-outline-info" id="S" onClick={searchByFirstChar}> S </button>
                                    <button   type="button" class="btn btn-outline-info" id="T" onClick={searchByFirstChar}> T </button>
                                    <button   type="button" class="btn btn-outline-info" id="U" onClick={searchByFirstChar}> U </button>
                                    <button   type="button" class="btn btn-outline-info" id="V" onClick={searchByFirstChar}> V </button>
                                    <button   type="button" class="btn btn-outline-info" id="W" onClick={searchByFirstChar}> W </button>
                                    <button   type="button" class="btn btn-outline-info" id="X" onClick={searchByFirstChar}> X </button>
                                    <button   type="button" class="btn btn-outline-info" id="Y" onClick={searchByFirstChar}> Y </button>
                                    <button   type="button" class="btn btn-outline-info" id="Z" onClick={searchByFirstChar}> Z </button>
                                </div>
                                
                                <form class="ng-untouched ng-pristine ng-valid" padding="5px" role="search" onSubmit={handleSubmit}> 
                                    <div class="input-group mb-3" padding="5px">  
                                        <input class="form-control w-50" type="search" placeholder={`Tìm kiếm theo ${obFilter}`} aria-label="Search" value={searchItem} onChange={handleInputChange}/>
                                        <button class="btn btn-info" type="submit"> 
                                            <SearchIcon />
                                        </button>  
                                    </div> 
                                </form>
                                <div class="d-flex justify-content-center">
                                    <div class="btn-group btn-group-lg" role="group" aria-label="Basic radio toggle button group">
                                        <input type="radio" class="btn-check" name="btnradio" id="name" autocomplete="off" defaultChecked onChange={handleChange}/>
                                        <label class="btn btn-outline-light" for="name"><MedicationOutlinedIcon/> Tên thuốc</label>

                                        <input type="radio" class="btn-check" name="btnradio" id="active_element" autocomplete="off" onChange={handleChange}/>
                                        <label class="btn btn-outline-light" for="active_element"><ScienceOutlinedIcon/> Hoạt chất</label>

                                        <input type="radio" class="btn-check" name="btnradio" id="catalogue" autocomplete="off" onChange={handleChange}/>
                                        <label class="btn btn-outline-light" for="catalogue"><WidgetsOutlinedIcon/>Danh mục</label>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div> 
                </div> 
            </div>
            {checkData()}
            <div class="d-grid col-3 mx-auto pb-5">
                <button class="btn btn-info btn-lg" type="button"><h4><PlaylistAddOutlinedIcon/> Thêm</h4></button>
            </div>
        </div>
    )
}

export default Medicine;
