import clsx from 'clsx';
import styles from "./Equipment_carasel.module.scss"
import ECard from './Equip_Card';

function ECarausel(props){
      
    function EquidmentCarousel() {
        const chunkedArray = [];
        for (let i = 0; i < (props.equipments).length; i += 8) {
          chunkedArray.push((props.equipments).slice(i, i + 8));
        }
        return (
          <div className="carousel-inner">
            {chunkedArray.map((chunk, index) => (
              <div class="carousel-item active">
                <div className="container">
                  <div className="row">
                    {chunk.map((equipment, index) => (
                      <ECard
                        key={index}
                        equipment={equipment}
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
        <div className={clsx(styles.equipmentArea)}>
            <div id="carouselExample" class="carousel carousel-dark slide">
                {EquidmentCarousel()}
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
export default ECarausel;