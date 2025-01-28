import { useState } from "react";
import "../styles/pizzaMain.css";
import { Ingredient, Pizza } from "../Types";
import { ChangeEvent } from "react";
import { toast } from "react-toastify";

type newPizzaPageProps = {
  onAddCreatedPizza: (newPizza: Pizza) => void;
};

const defaultIngredients: Ingredient[] = [
  {
    id: 1,
    name: "Pepperoni",
    portion: 0,
  },
  {
    id: 2,
    name: "Mozarella",
    portion: 0,
  },
  {
    id: 3,
    name: "Mixed Peppers",
    portion: 0,
  },
];

function NewPizzaPage({ onAddCreatedPizza }: newPizzaPageProps) {
  let innerMargins: string = "mt-3";

  const [pizzaName, setPizzaName] = useState("");
  const [selectedCrust, setSelectedCrust] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    structuredClone(defaultIngredients)
  );

  const handleCrustChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCrust(event.target.value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPizzaName(event.target.value);
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
  const toastCreationFailure = () => {
    toast.error(
      "A pizza needs to have a name, crust and at least 2 ingredients!",
      {
        position: "top-center",
        autoClose: 3000,
      }
    );
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
   *
   * @returns true if pizza has a name, crust and at least 2 ingredients
   */
  const isCurrentPizzaValid = (): boolean => {
    let pizza: Pizza = getCreatedPizza();
    if (
      pizza.crust === "" ||
      pizza.pizzaName === "" ||
      pizza.ingredients.length < 2
    )
      return false;
    return true;
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
              ingredient.portion === 0 ? 1 : ingredient.portion === 1 ? 2 : 0,
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
            Select Crust
          </label>
          <select
            id="crustDropdown"
            className="form-select"
            value={selectedCrust}
            onChange={handleCrustChange}
            style={{ color: selectedCrust ? "black" : "grey" }}
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
          <div className={"text-center "}>
            <label htmlFor="ingredients">
              Ingredients (click to add or change portion size)
            </label>
          </div>

          <ul className="list-group" id="ingredients">
            {ingredients.map((x) => (
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
                <span>{x.name}</span>
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
            onClick={() => {
              isCurrentPizzaValid()
                ? (onAddCreatedPizza(getCreatedPizza()),
                  clearForm(),
                  toastCreationSuccess())
                : toastCreationFailure();
            }}
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
