import { useEffect, useRef } from "react";
import * as Styled from "./Modal.styled";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "redux/modules";

export const Modal = ({ children, closeTarget, type }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();

  const clickOutside = event => {
    if (modalRef.current === event.target) {
      dispatch(closeModal(closeTarget));
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <Styled.Outer type={type} ref={modalRef}>
      <Styled.Inner type={type} $bgcolor={"modal"}>
        {children}
      </Styled.Inner>
    </Styled.Outer>,
    document.getElementById("modal-root")
  );
};
