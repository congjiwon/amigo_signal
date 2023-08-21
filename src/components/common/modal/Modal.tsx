import React from 'react';
import { createPortal } from 'react-dom';
import * as Styled from './Modal.style';

export const PORTAL_MODAL = 'portal-root';

export interface ModalProps {
  children: React.ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeButton: boolean;
  size: 'medium' | 'small' | undefined;
}

const Modal: React.FC<ModalProps> = ({ children, isModalOpen, setIsModalOpen, closeButton, size }) => {
  const HandleToClose = () => {
    setIsModalOpen(false);
  };

  return isModalOpen
    ? createPortal(
        <Styled.Outer>
          <Styled.Inner size={size}>
            {closeButton && (
              <Styled.InnerBox>
                <button onClick={HandleToClose}></button>
              </Styled.InnerBox>
            )}
            ₩{children}
          </Styled.Inner>
        </Styled.Outer>,
        document.getElementById(PORTAL_MODAL) as HTMLElement,
      )
    : null;
};

export default Modal;
