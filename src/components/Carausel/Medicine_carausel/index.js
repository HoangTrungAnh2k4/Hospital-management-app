import clsx from 'clsx';
import styles from "./Medicine_carausel.module.scss"
import MCard from './Medi_Card';

function MCarausel(props){
      
    function MedicineCarousel() {
        const chunkedArray = [];
        for (let i = 0; i < (props.medicines).length; i += 8) {
          chunkedArray.push((props.medicines).slice(i, i + 8));
        }
        return (
          <div className="carousel-inner">
            {chunkedArray.map((chunk, index) => (
              <div class="carousel-item active">
                <div className="container">
                  <div className="row">
                    {chunk.map((medicine, index) => (
                      <MCard 
                        key={index}
                        medicine={medicine}
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
        <div className={clsx(styles.medicineArea)}>
            <div id="carouselExample" class="carousel carousel-dark slide">
                {MedicineCarousel()}
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
export default MCarausel;