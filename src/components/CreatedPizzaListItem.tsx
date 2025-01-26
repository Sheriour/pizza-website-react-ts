import { Pizza } from "../Types";

function CreatedPizzaListItem({ pizzaName, crust, ingredients }: Pizza) {
  let innerMargins: string = "mt-3";

  return (
    <div className="list-group-item justify-content-between mb-2">
      <span className="justify-content-between d-flex">
        <span className="d-flex">
          <h5 className="mb-2 text-center">{pizzaName}</h5>
          <span className="badge text-bg-success rounded-pill ms-1 mb-2">
            V
          </span>
        </span>

        <button
          className="btn"
          onClick={() => console.log}
          style={{ padding: 0 }}
        >
          <img
            src="./src/assets/x-icon.png"
            style={{ width: "30px", height: "auto" }}
          />
        </button>
      </span>

      <p className="mb-1">
        <strong>Crust:</strong> {crust}
      </p>

      <p className="mb-1">
        <strong>Ingredients:</strong> Mozarella, Pepperoni, Mozarella,
        Pepperoni, Mozarella, Pepperoni,{" "}
      </p>
    </div>
  );
}

export default CreatedPizzaListItem;
