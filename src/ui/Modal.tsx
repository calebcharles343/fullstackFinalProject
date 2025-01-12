import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 5 },
};

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1, ease: "easeInOut" }}
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="flex justify-center items-center relative w-screen md:w-max rounded p-4 overflow-y-scroll">
            <button
              className="text-xs md:text-sm bg-white absolute -top-2 left-1/2 transform -translate-x-1/2 m-2 text-red-500 px-3 py-1 rounded-full"
              onClick={onClose}
            >
              X
            </button>
            {children}
          </div>
        </div>
        ,
      </motion.div>{" "}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
