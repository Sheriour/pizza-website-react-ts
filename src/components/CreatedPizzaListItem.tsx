import { Pizza } from "../Types";
import VegBadge from "./VegBadge";
import {
  getDietFromIngredientList,
  compareIngredientsByType,
} from "../utils/Utils";

type PizzaListItemProps = {
  pizza: Pizza;
  handleDelete: (pizza: Pizza) => void;
};

function CreatedPizzaListItem({ pizza, handleDelete }: PizzaListItemProps) {
  /**
   * Combines all ingredient names into a single string, adding "2x" to ingredients with double portions
   *
   * @returns Combined ingredient string
   */
  const getIngredientsString = (): string => {
    let ingredientsString = "";
    pizza.ingredients
      .sort(compareIngredientsByType)
      .map((x) =>
        x.portion == 2
          ? (ingredientsString += x.name + " (2x), ")
          : (ingredientsString += x.name + ", ")
      );
    return ingredientsString.substring(0, ingredientsString.length - 2);
  };

  return (
    <div
      className="list-group-item justify-content-between mb-2"
      data-test-id="pizza-list-item"
    >
      <span className="justify-content-between d-flex">
        <span className="d-flex">
          <h5 className="mb-2 text-center">{pizza.pizzaName}</h5>

          <VegBadge
            diet={getDietFromIngredientList(pizza.ingredients)}
          ></VegBadge>
        </span>

        <button
          className="btn-close btn-close-custom"
          data-test-id="delete-pizza-button"
          onClick={() => handleDelete(pizza)}
        ></button>
      </span>

      <p className="mb-1" data-test-id="crust-type">
        <strong>Crust:</strong> {pizza.crust}
      </p>

      <p className="mb-1" data-test-id="pizza-ingredients">
        <strong>Ingredients:</strong> {getIngredientsString()}
      </p>
    </div>
  );
}

export default CreatedPizzaListItem;
