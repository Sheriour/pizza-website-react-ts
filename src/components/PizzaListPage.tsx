import { Pizza } from "../Types";
import CreatedPizzaListItem from "./CreatedPizzaListItem";

type PizzaListProps = {
  createdPizzas: Pizza[];
  onDeletePizza: () => void;
};

function PizzaList({ createdPizzas, onDeletePizza }: PizzaListProps) {
  return (
    <>
      <div className="container border mt-2 pb-3">
        <h4 className={"text-center mt-3"}>Pizza Archive</h4>

        <div className={"container mt-2"}>
          <div className="list-group" id="pizza-list">
            {createdPizzas.map((x) => (
              <CreatedPizzaListItem
                key={x.pizzaName}
                pizza={x}
                handleDelete={onDeletePizza}
              ></CreatedPizzaListItem>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PizzaList;
