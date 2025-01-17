import "../styles/pizzaMain.css";

type topMenuButtonProps = {
  buttonIdentifier: string;
  currentAppMode: string;
  buttonText: string;
  onClick: (anewAppMode: string) => void;
};

function TopMenuButton({
  buttonIdentifier,
  currentAppMode,
  buttonText,
  onClick,
}: topMenuButtonProps) {
  return (
    <div className="col">
      <div className="row">
        <button
          onClick={() => onClick(buttonIdentifier)}
          type="button"
          className={
            "mx-2 btn col " +
            (currentAppMode == buttonIdentifier
              ? "btn-pizza-active"
              : "btn-pizza-clickable")
          }
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default TopMenuButton;
