import { useState } from "react";
import "../styles/pizzaMain.css";
import { Ingredient, Pizza, IngredientDiet, IngredientType } from "../Types";
import { ChangeEvent } from "react";
import { toast } from "react-toastify";
import VegBadge from "./VegBadge";
import ingredients from "../data/ingredients.json";
import { IngredientMatchesDiet } from "../utils/Utils";
import IngredientFilterDropdown from "./IngredientFilterDropdown";

type newPizzaPageProps = {
  onAddCreatedPizza: (newPizza: Pizza) => void;
  currentPizzas: Pizza[];
};

const defaultIngredients = ingredients as Ingredient[];

function NewPizzaPage({ onAddCreatedPizza, currentPizzas }: newPizzaPageProps) {
  let innerMargins: string = "mt-3";

  const [pizzaName, setPizzaName] = useState("");
  const [selectedCrust, setSelectedCrust] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    structuredClone(defaultIngredients)
  );
  const [ingredientDietFilter, setIngredientDietFilter] =
    useState<IngredientDiet>("animal");
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

  /**
   * Clears the new pizza form
   */
  const clearForm = () => {
    setPizzaName("");
    setSelectedCrust("");
    setIngredients(structuredClone(defaultIngredients));
  };

  /**
   * Creates a toast to inform that pizza was created
   */
  const toastCreationSuccess = () => {
    toast.success("Pizza created!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  /**
   * Creates a toast to inform that pizza was not created because form was not filled
   */
  const toastCreationFailure = (failureText: string) => {
    toast.error(failureText, {
      position: "top-center",
      autoClose: 3000,
    });
  };

  /**
   * Returns created pizza
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
    let pizza: Pizza = getCreatedPizza();
    if (pizza.pizzaName === "")
      toastCreationFailure("Please provide a pizza name!");
    else if (pizza.crust === "")
      toastCreationFailure("Please select a crust type!");
    else if (pizza.ingredients.length < 2)
      toastCreationFailure("Please select at least 2 ingredients!");
    else if (currentPizzas.some((x) => x.pizzaName === pizza.pizzaName)) {
      toastCreationFailure(
        "Pizza with name " + pizza.pizzaName + " already exists!"
      );
    } else {
      creationCallback(pizza);
      clearForm();
      toastCreationSuccess();
    }
  };

  /**
   * Handles ingredient selection. Ingredients will cycle between 0/1/2 values.
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
          <IngredientFilterDropdown
            label="Filter by vegan or vegetarian"
            stateList={["animal", "vegetarian", "vegan"]}
            stateUpdateFunction={handleIngredientDietFilterChange}
            stateVar={ingredientDietFilter}
          ></IngredientFilterDropdown>

          <IngredientFilterDropdown
            label="Filter by type"
            stateList={["all", "sauce", "cheese", "meat", "vegetable"]}
            stateUpdateFunction={handleIngredientTypeFilterChange}
            stateVar={ingredientTypeFilter}
          ></IngredientFilterDropdown>

          <label htmlFor="ingredients">
            <small>Click an ingredient to add or change portion size</small>
          </label>
          <ul className="list-group " id="ingredients">
            {ingredients
              .filter(
                (x) =>
                  IngredientMatchesDiet(x, ingredientDietFilter) &&
                  (ingredientTypeFilter === "all" ||
                    x.type === ingredientTypeFilter)
              )
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

                  <span>
                    {x.portion === 1
                      ? "Single"
                      : x.portion === 2
                      ? "Double!"
                      : ""}
                  </span>
                </button>
              ))}
          </ul>
        </div>

        <div className={"text-center " + innerMargins}>
          <button
            onClick={() =>
              handlePizzaCreation(currentPizzas, onAddCreatedPizza)
            }
            type="button"
            className="btn btn-pizza-clickable"
            style={{ width: 200 }}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}

export default NewPizzaPage;
