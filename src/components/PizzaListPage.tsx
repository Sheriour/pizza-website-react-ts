import { Pizza } from "../Types";
import CreatedPizzaListItem from "./CreatedPizzaListItem";
import SimpleButton from "./SimpleButton";

type PizzaListProps = {
  createdPizzas: Pizza[];
  onDeletePizza: (pizza: Pizza) => void;
};

function PizzaList({ createdPizzas, onDeletePizza }: PizzaListProps) {
  const deleteAllFromArchive = () => {
    for (const pizza of createdPizzas) onDeletePizza(pizza);
  };

  return (
    <>
      <div className="container border mt-2 pb-3">
        <h4 className={"text-center mt-3"}>Pizza Archive</h4>

        {createdPizzas.length === 0 ? (
          <p className="text-center">The archive is empty.</p>
        ) : (
          <div className="container mt-3">
            <SimpleButton
              buttonText="Clear Archive"
              handleOnClick={deleteAllFromArchive}
            ></SimpleButton>
          </div>
        )}

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
