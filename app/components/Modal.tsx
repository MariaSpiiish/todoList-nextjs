interface Modal {
    modalOpen: boolean,
    setModalOpen: (open : boolean) => void;
    children: React.ReactNode
}

const Modal: React.FC<Modal> = ({ modalOpen, setModalOpen, children}) => {
  return (
    <dialog id="my_modal_3" className={`modal ${modalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setModalOpen(false)}>✕</button>
            {children}
        </div>
    </dialog>
  )
}

export default Modal;