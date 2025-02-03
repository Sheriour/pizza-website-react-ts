import { Pizza } from "../Types";
import { GetRandomArrayElement } from "../utils/Utils";
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

  const handleGenerateAdd = () => {
    console.log(GetRandomArrayElement(["a", "b", "c"]));
  };

  onAddCreatedPizza;
  currentPizzas;

  return (
    <>
      <div className="container border mt-2 pb-3">
        <h4 className={"text-center mt-3"}>Pizza Generator</h4>

        <div className={"container row " + innerMargins}>
          <SimpleButton
            buttonText="Generate & Add"
            handleOnClick={handleGenerateAdd}
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
