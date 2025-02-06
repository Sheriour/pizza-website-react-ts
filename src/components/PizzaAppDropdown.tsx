import { ChangeEvent } from "react";

type PizzaAppDropdownProps = {
  label: string;
  stateList: string[];
  stateVar: string;
  stateUpdateFunction: (event: ChangeEvent<HTMLSelectElement>) => void;
};

function PizzaAppDropdown({
  label,
  stateList,
  stateVar,
  stateUpdateFunction,
}: PizzaAppDropdownProps) {
  return (
    <>
      <label htmlFor="ingredientsFilter">
        <small>{label}</small>
      </label>
      <select
        id="ingredientsFilter"
        className="form-select"
        value={stateVar === stateList[0] ? "All" : stateVar}
        onChange={stateUpdateFunction}
        style={{ color: stateVar ? "black" : "grey" }}
      >
        {stateList.map((x) => (
          <option key={x} value={x} style={{ color: "black" }}>
            {x === stateList[0]
              ? "All"
              : x.charAt(0).toUpperCase() + x.slice(1)}
          </option>
        ))}
      </select>
    </>
  );
}

export default PizzaAppDropdown;
