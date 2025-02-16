import { ChangeEvent, useState } from "react";
import { IngredientDiet, Pizza } from "../Types";
import CreatedPizzaListItem from "./CreatedPizzaListItem";
import ModalButton from "./ModalButton";
import PizzaAppDropdown from "./PizzaAppDropdown";
import SimpleButton from "./SimpleButton";
import {
  comparePizzasAlphabetically,
  pizzaMatchesDiet,
  pizzaMatchesSearchTerm,
} from "../utils/Utils";

type PizzaListProps = {
  createdPizzas: Pizza[];
  onDeletePizza: (pizza: Pizza) => void;
};

function PizzaList({ createdPizzas, onDeletePizza }: PizzaListProps) {
  const innerMargins: string = "mt-3";

  const [pizzaDiet, setPizzaDiet] = useState<IngredientDiet>("all");
  const [pizzaSearch, setPizzaSearch] = useState<string>("");

  const handlePizzaSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPizzaSearch(e.currentTarget.value);
  };

  const deleteAllFromArchive = () => {
    for (const pizza of createdPizzas) onDeletePizza(pizza);
  };

  const handlePizzaDietChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPizzaDiet(e.currentTarget.value as IngredientDiet);
  };

  return (
    <>
      <div className="container border mt-2 pb-3">
        <h4 className={"text-center " + innerMargins}>Pizza Archive</h4>

        <div
          className="modal fade"
          id="clearArchiveModal"
          tabIndex={-1}
          aria-labelledby="clearArchiveModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="clearArchiveModalLabel">
                  Are you sure?
                </h1>
              </div>
              <div className="modal-body">
                This will delete all pizzas from the Archive.
              </div>
              <div className="modal-footer">
                <SimpleButton
                  buttonText="No"
                  handleOnClick={() => null}
                  dismissModals={true}
                ></SimpleButton>
                <SimpleButton
                  buttonText="Yes"
                  handleOnClick={deleteAllFromArchive}
                  dismissModals={true}
                ></SimpleButton>
              </div>
            </div>
          </div>
        </div>

        <PizzaAppDropdown
          label="What kind of pizzas?"
          stateList={["all", "vegetarian", "vegan"]}
          stateUpdateFunction={handlePizzaDietChange}
          stateVar={pizzaDiet}
        ></PizzaAppDropdown>

        <div className={"container " + innerMargins}>
          <label htmlFor="pizzaSearchInput">Search pizzas</label>
          <input
            id="pizzaSearchInput"
            type="text"
            className={"form-control "}
            placeholder="Pizza name, ingredient or crust..."
            onChange={handlePizzaSearchChange}
            value={pizzaSearch}
          ></input>
        </div>

        {createdPizzas.length === 0 ? (
          <p className="text-center mt-5">The archive is empty.</p>
        ) : (
          <div className={"container " + innerMargins}>
            <ModalButton
              buttonText="Clear Archive"
              modalTarget="#clearArchiveModal"
            ></ModalButton>
          </div>
        )}

        <div className={"container mt-2"}>
          <div className="list-group" id="pizza-list">
            {createdPizzas
              .filter((x) => pizzaMatchesDiet(x, pizzaDiet))
              .filter((x) => pizzaMatchesSearchTerm(x, pizzaSearch))
              .sort(comparePizzasAlphabetically)
              .map((x) => (
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
