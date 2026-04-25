import { Children, useEffect, useRef } from "react";

export function Modal({ openModal, closeModal, children }) {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog
      className='absolute inset-0 flex flex-col gap-5 p-10 m-auto text-center rounded-lg backdrop:backdrop-blur-sm 0 animate-zoom-in'
      ref={ref}
      onCancel={closeModal}
    >
      {children}
    </dialog>
  );
}
