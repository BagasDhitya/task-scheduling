import { FC } from "react";
import { ModalProps } from "@/utils/interface/component";

const Modal: FC<ModalProps> = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-600">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
