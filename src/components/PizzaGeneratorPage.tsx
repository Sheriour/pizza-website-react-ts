import { ChangeEvent, SetStateAction, useState } from "react";
import { NullablePizza, Pizza } from "../Types";
import { GeneratePizza } from "../utils/PizzaGenerator";
import SimpleButton from "./SimpleButton";

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

  const handleGenerateCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGenerateCount(+e.currentTarget.value);
  };

  const handleGenerateAdd = (count: number) => {
    let generatedPizza: NullablePizza = null;
    for (let i = 0; i < count; i++) {
      generatedPizza = GeneratePizza(currentPizzas);
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

          <label htmlFor="pizzaNameInput">Should pizzas follow a diet?</label>
          <input
            id="pizzaDietInput"
            type="text"
            className={"form-control "}
            onChange={handleGenerateCountChange}
            value={generateCount}
          ></input>
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
