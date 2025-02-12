import { Pizza } from "../Types";
import CreatedPizzaListItem from "./CreatedPizzaListItem";
import ModalButton from "./ModalButton";
import SimpleButton from "./SimpleButton";

type PizzaListProps = {
  createdPizzas: Pizza[];
  onDeletePizza: (pizza: Pizza) => void;
};

function PizzaList({ createdPizzas, onDeletePizza }: PizzaListProps) {
  const deleteAllFromArchive = () => {
    for (const pizza of createdPizzas) onDeletePizza(pizza);
  };

  return (
    <>
      <div className="container border mt-2 pb-3">
        <h4 className={"text-center mt-3"}>Pizza Archive</h4>

        <div
          className="modal"
          id="clearArchiveModal"
          tabIndex={-1}
          aria-labelledby="clearArchiveModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="clearArchiveModalLabel">
                  Are you sure?
                </h1>
              </div>
              <div className="modal-body">
                This will delete all pizzas from the Archive.
              </div>
              <div className="modal-footer">
                <SimpleButton
                  buttonText="No"
                  handleOnClick={() => null}
                  dismissModals={true}
                ></SimpleButton>
                <SimpleButton
                  buttonText="Yes"
                  handleOnClick={deleteAllFromArchive}
                  dismissModals={true}
                ></SimpleButton>
              </div>
            </div>
          </div>
        </div>

        {createdPizzas.length === 0 ? (
          <p className="text-center">The archive is empty.</p>
        ) : (
          <div className="container mt-3">
            <ModalButton
              buttonText="Clear Archive"
              modalTarget="#clearArchiveModal"
            ></ModalButton>
          </div>
        )}

        <div className={"container mt-2"}>
          <div className="list-group" id="pizza-list">
            {createdPizzas.map((x) => (
              <CreatedPizzaListItem
                key={x.pizzaName}
                pizza={x}
                handleDelete={onDeletePizza}
              ></CreatedPizzaListItem>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PizzaList;
