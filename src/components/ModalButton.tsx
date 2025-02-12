type ModalButtonProps = {
  buttonText: string;
  modalTarget: string;
};

export default function ModalButton({
  buttonText,
  modalTarget,
}: ModalButtonProps) {
  return (
    <>
      <div className="col">
        <div className="text-center">
          <button
            type="button"
            className="btn btn-pizza-clickable col"
            data-bs-toggle="modal"
            data-bs-target={modalTarget}
            style={{ width: 200 }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
}
