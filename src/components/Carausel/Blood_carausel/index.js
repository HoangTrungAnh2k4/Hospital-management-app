import clsx from 'clsx';
import styles from "./Blood_carousel.module.scss"
import BloodCard from './Blood_Card';

function BloodMCarausel(props){
      
    function BloodMedicineCarousel() {
        const chunkedArray = [];
        for (let i = 0; i < (props.bloods).length; i += 8) {
          chunkedArray.push((props.bloods).slice(i, i + 8));
        }
        return (
          <div className="carousel-inner">
            {chunkedArray.map((chunk, index) => (
              <div class="carousel-item active">
                <div className="container">
                  <div className="row">
                    {chunk.map((blood, index) => (
                      <BloodCard
                        key={index}
                        blood={blood}
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
                {BloodMedicineCarousel()}
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
export default BloodMCarausel;