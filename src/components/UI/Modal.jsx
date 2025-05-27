import { Children, use, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({Children, open, className = ''}){
 const dialog = useRef();

    useEffect(() =>{
        if (open){
          dialog.current.showModal();
        }
    }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`moda; ${className}`}>{Children}</dialog>,
    document.getElementById('modal')
  )
}
export default Modal;