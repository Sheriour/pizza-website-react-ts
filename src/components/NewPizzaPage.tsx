import { useState, ChangeEvent } from "react";
import "../styles/pizzaMain.css";
import { Ingredient, Pizza, IngredientDiet, IngredientType } from "../Types";
import VegBadge from "./VegBadge";
import ingredients from "../data/ingredients.json";
import {
  ingredientMatchesDiet,
  compareIngredientsAlphabetically,
} from "../utils/Utils";
import PizzaAppDropdown from "./PizzaAppDropdown";
import SimpleButton from "./SimpleButton";
import { toastFailure, toastSuccess } from "../utils/PizzaToast";

type newPizzaPageProps = {
  onAddCreatedPizza: (newPizza: Pizza) => void;
  currentPizzas: Pizza[];
};

const defaultIngredients = ingredients as Ingredient[];

function NewPizzaPage({ onAddCreatedPizza, currentPizzas }: newPizzaPageProps) {
  let innerMargins = "mt-3";

  const [pizzaName, setPizzaName] = useState("");
  const [selectedCrust, setSelectedCrust] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    structuredClone(defaultIngredients)
  );
  const [ingredientDietFilter, setIngredientDietFilter] =
    useState<IngredientDiet>("all");
  const [ingredientTypeFilter, setIngredientTypeFilter] =
    useState<IngredientType>("all");

  const handleCrustChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCrust(event.target.value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPizzaName(event.target.value);
  };

  const handleIngredientDietFilterChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setIngredientDietFilter(event.target.value as IngredientDiet);
  };

  const handleIngredientTypeFilterChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setIngredientTypeFilter(event.target.value as IngredientType);
  };

  const clearForm = () => {
    setPizzaName("");
    setSelectedCrust("");
    setIngredients(structuredClone(defaultIngredients));
  };

  /**
   * @returns An assembled pizza object based on all user choices in the form
   */
  const getCreatedPizza = (): Pizza => {
    return {
      crust: selectedCrust,
      pizzaName: pizzaName,
      ingredients: ingredients.filter((x) => x.portion > 0),
    };
  };

  /**
   * Does all the pizza validation, including comparison to existing pizza names.
   * Clears the form and adds pizza to collection if all checks pass.
   */
  const handlePizzaCreation = (
    currentPizzas: Pizza[],
    creationCallback: (pizzaParam: Pizza) => void
  ): void => {
    let pizza = getCreatedPizza();
    if (pizza.pizzaName === "") toastFailure("Please provide a pizza name!");
    else if (pizza.crust === "") toastFailure("Please select a crust type!");
    else if (pizza.ingredients.length < 2)
      toastFailure("Please select at least 2 ingredients!");
    else if (currentPizzas.some((x) => x.pizzaName === pizza.pizzaName)) {
      toastFailure("Pizza with name " + pizza.pizzaName + " already exists!");
    } else {
      creationCallback(pizza);
      clearForm();
      toastSuccess("Pizza created!");
    }
  };

  /**
   * Ingredient selection logic. Ingredients will cycle between 0/1/2 values.
   *
   * @param ingredientId Id of the ingredient being modified
   */
  const handleIngredientSelect = (ingredientId: number) => {
    //Map iterates over the ingredients. For ingredient with matching Id, clone the ingredient and adjust portion size.
    //This solution is required in order to preserve immutability
    setIngredients((previousIngredients) =>
      previousIngredients.map((ingredient) => {
        if (ingredient.id === ingredientId) {
          return {
            ...ingredient,
            portion:
              ingredient.portion === 0 || ingredient.portion === undefined
                ? 1
                : ingredient.portion === 1
                ? 2
                : 0,
          };
        }
        return ingredient;
      })
    );
  };

  return (
    <>
      <div className="container border mt-2 pb-3">
        <h4 className={"text-center " + innerMargins}>Create your pizza!</h4>

        <div className={"container " + innerMargins}>
          <label htmlFor="pizzaNameInput">Pizza Name</label>
          <input
            id="pizzaNameInput"
            type="text"
            className={"form-control "}
            placeholder="Pepperoni, Meat Lovers..."
            onChange={handleNameChange}
            value={pizzaName}
          ></input>
        </div>

        <div className={"container " + innerMargins}>
          <label htmlFor="crustDropdown" className="form-label mb-0">
            Crust
          </label>
          <select
            id="crustDropdown"
            className="form-select"
            value={selectedCrust}
            onChange={handleCrustChange}
            style={{ color: ingredientDietFilter ? "black" : "grey" }}
          >
            <option value="" disabled style={{ color: "grey" }}>
              Select crust
            </option>
            <option value="Thin" style={{ color: "black" }}>
              Thin
            </option>
            <option value="Thick" style={{ color: "black" }}>
              Thick
            </option>
          </select>
        </div>

        <div className={"container " + innerMargins}>
          <h5 className="text-center">Ingredients</h5>
          <PizzaAppDropdown
            label="Filter by vegan or vegetarian"
            stateList={["all", "vegetarian", "vegan"]}
            stateUpdateFunction={handleIngredientDietFilterChange}
            stateVar={ingredientDietFilter}
            id="pizza-filter-diet"
          ></PizzaAppDropdown>

          <PizzaAppDropdown
            label="Filter by type"
            stateList={["all", "sauce", "cheese", "meat", "plant"]}
            stateUpdateFunction={handleIngredientTypeFilterChange}
            stateVar={ingredientTypeFilter}
            id="pizza-filter-type"
          ></PizzaAppDropdown>

          <label htmlFor="ingredients">
            <small>Click an ingredient to add or change portion size</small>
          </label>
          <ul className="list-group " id="ingredients">
            {ingredients
              .filter(
                (x) =>
                  ingredientMatchesDiet(x, ingredientDietFilter) &&
                  (ingredientTypeFilter === "all" ||
                    x.type === ingredientTypeFilter)
              )
              .sort(compareIngredientsAlphabetically)
              .map((x) => (
                <button
                  key={x.id}
                  onClick={() => handleIngredientSelect(x.id)}
                  className={
                    "list-group-item d-flex justify-content-between " +
                    (x.portion === 1
                      ? "piz-ingredient-single"
                      : x.portion === 2
                      ? "piz-ingredient-double"
                      : "")
                  }
                >
                  <span>
                    {x.name} <VegBadge diet={x.diet}></VegBadge>
                  </span>

                  <span data-test-id="portion-size">
                    {x.portion === 1 ? "1x" : x.portion === 2 ? "2x" : ""}
                  </span>
                </button>
              ))}
          </ul>
        </div>
        <div className={"container " + innerMargins}>
          {" "}
          <SimpleButton
            dataTestId="create-pizza-button"
            buttonText="Create"
            handleOnClick={() =>
              handlePizzaCreation(currentPizzas, onAddCreatedPizza)
            }
          ></SimpleButton>{" "}
        </div>
      </div>
    </>
  );
}

export default NewPizzaPage;
