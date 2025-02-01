import { Pizza } from "../Types";
import VegBadge from "./VegBadge";
import {
  GetDietFromIngredientList,
  CompareIngredientsByType,
} from "../utils/Utils";

function CreatedPizzaListItem({ pizzaName, crust, ingredients }: Pizza) {
  const getIngredientsString = (): string => {
    let ingredientsString: string = "";
    ingredients
      .sort(CompareIngredientsByType)
      .map((x) =>
        x.portion == 2
          ? (ingredientsString += x.name + " (Double!), ")
          : (ingredientsString += x.name + ", ")
      );
    return ingredientsString.substring(0, ingredientsString.length - 2);
  };

  return (
    <div className="list-group-item justify-content-between mb-2">
      <span className="justify-content-between d-flex">
        <span className="d-flex">
          <h5 className="mb-2 text-center">{pizzaName}</h5>

          <VegBadge diet={GetDietFromIngredientList(ingredients)}></VegBadge>
        </span>

        <button className="btn-close" onClick={() => console.log}></button>
      </span>

      <p className="mb-1">
        <strong>Crust:</strong> {crust}
      </p>

      <p className="mb-1">
        <strong>Ingredients:</strong> {getIngredientsString()}
      </p>
    </div>
  );
}

export default CreatedPizzaListItem;
