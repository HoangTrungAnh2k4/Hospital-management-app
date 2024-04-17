import clsx from 'clsx';
import styles from "./Carasel.module.scss"
import ECard from './Equip_Card';
import MCard from './Medi_Card';

function Carausel(props){
      
    function carousel() {
        const chunkedArray = [];
        for (let i = 0; i < (props.elements).length; i += 8) {
          chunkedArray.push((props.elements).slice(i, i + 8));
        }
        return (
          <div className="carousel-inner">
            {chunkedArray.map((chunk, index) => (
              <div class="carousel-item active">
                <div className="container">
                  <div className="row">
                    {chunk.map((item, index) => (
                      (props.option === "medicine")?
                      <MCard
                        key={index}
                        medicine={item}
                      />:
                      <ECard
                        key={index}
                        equipment={item}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
    }
    return (
        <div className={clsx(styles.elementArea)}>
            <div id="carouselExample" class="carousel carousel-dark slide">
                {carousel()}
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                        
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
         </div>
    );
}
export default Carausel;