type SimpleButtonProps = {
  buttonText: string;
  handleOnClick: () => void;
  dismissModals?: boolean;
};

export default function SimpleButton({
  buttonText,
  handleOnClick,
  dismissModals = false,
}: SimpleButtonProps) {
  return (
    <>
      <div className="col">
        <div className="text-center">
          <button
            onClick={handleOnClick}
            type="button"
            className="btn btn-pizza-clickable col"
            style={{ width: 200 }}
            data-bs-dismiss={dismissModals ? "modal" : null}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
}
