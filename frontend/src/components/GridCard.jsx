import {cards} from '../Data';
import Card from './Card';
const CardsGrid = () => {
  return (
    <div className="p-4">
      <div className="
        grid 
        grid-cols-1
        md:grid-cols-4
        gap-4
      ">
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
             image={card.img}
            desc={card.desc}
           
          />
        ))}
      </div>
    </div>
  );
};

export default CardsGrid;
