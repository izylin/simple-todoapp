interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
  className?: string; // optional extra classes for the modal box
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children, className }) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div
        className={`modal-box relative bg-background text-foreground border border-border shadow-lg ${
          className ? className : ""
        }`}
      >
        <label
          onClick={() => setModalOpen(false)}
          className='btn btn-sm btn-circle absolute right-2 top-2 btn-ghost text-foreground'
        >
          ✕
        </label>
        {children}
      </div>
    </div>
  );
};

export default Modal;
