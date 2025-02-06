import { ChangeEvent, useState } from "react";
import { IngredientDiet, NullablePizza, Pizza } from "../Types";
import { GeneratePizza } from "../utils/PizzaGenerator";
import SimpleButton from "./SimpleButton";
import PizzaAppDropdown from "./PizzaAppDropdown";

type PizzaGeneratorProps = {
  onAddCreatedPizza: (newPizza: Pizza) => void;
  currentPizzas: Pizza[];
};

function PizzaGeneratorPage({
  onAddCreatedPizza,
  currentPizzas,
}: PizzaGeneratorProps) {
  let innerMargins: string = "mt-3";

  const [generateCount, setGenerateCount] = useState(1);
  const [pizzaDiet, setPizzaDiet] = useState<IngredientDiet>("all");

  const handleGenerateCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGenerateCount(+e.currentTarget.value);
  };

  const handlePizzaTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPizzaDiet(e.currentTarget.value as IngredientDiet);
  };

  const handleGenerateAdd = (count: number) => {
    let generatedPizza: NullablePizza = null;
    for (let i = 0; i < count; i++) {
      generatedPizza = GeneratePizza(currentPizzas, pizzaDiet);
      if (generatedPizza !== null) {
        onAddCreatedPizza(generatedPizza as Pizza);
      }
    }
  };

  return (
    <>
      <div className="container border mt-2 pb-3">
        <h4 className={"text-center mt-3"}>Pizza Generator</h4>

        <div className={"container row " + innerMargins}>
          <label htmlFor="pizzaNameInput">How many pizzas to generate?</label>
          <input
            id="pizzaCountInput"
            type="number"
            min="1"
            max="10"
            className={"form-control "}
            onChange={handleGenerateCountChange}
            value={generateCount}
          ></input>

          <PizzaAppDropdown
            label="What kind of pizzas?"
            stateList={["all", "vegetarian", "vegan"]}
            stateUpdateFunction={handlePizzaTypeChange}
            stateVar={pizzaDiet}
          ></PizzaAppDropdown>
        </div>

        <div className={"container row " + innerMargins}>
          <SimpleButton
            buttonText="Generate & Add"
            handleOnClick={() => handleGenerateAdd(generateCount)}
          ></SimpleButton>
          <SimpleButton
            buttonText="Generate & Preview"
            handleOnClick={() => console.log("yep")}
          ></SimpleButton>
        </div>
      </div>
    </>
  );
}

export default PizzaGeneratorPage;
