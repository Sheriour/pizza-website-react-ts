import { useState } from "react";

type toastProps = {
  header: string;
  colour: string;
};

export default function Toast({ header, colour }: toastProps) {
  const [showToast, setShowToast] = useState(true);
  return (
    <div
      className={`toast-container position-fixed top-0 start-50 translate-middle-x
        p-2`}
      style={{ zIndex: 1055 }}
    >
      <div
        className={`toast ${showToast ? "show" : "hide"}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <h5 className={`${colour} me-auto mt-2`}>
            <strong>{header}</strong>
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setShowToast(false);
            }}
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}
