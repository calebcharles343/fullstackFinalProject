import React from "react";
import { confirmable } from "react-confirm";

interface ConfirmDialogProps {
  show: boolean;
  proceed: (value: any) => void;
  confirmation: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  show,
  proceed,
  confirmation,
}) => (
  <div className={`modal ${show ? "show" : ""}`} tabIndex={-1} role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Confirm Action</h5>
          <button
            type="button"
            className="close"
            onClick={() => proceed(false)}
          >
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p>{confirmation}</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => proceed(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => proceed(true)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default confirmable(ConfirmDialog);
