import React from 'react';
import { createPortal } from 'react-dom';
import CloseButton from '../../../assets/imgs/partner/CloseButton.svg';
import { useModalStore } from '../../../zustand/store';
import * as St from './style';

export const PORTAL_MODAL = 'portal-root';

export interface ModalProps {
  id: string;
  children: React.ReactNode;
  size: 'large' | 'medium' | 'small' | undefined;
}

const Modal: React.FC<ModalProps> = ({ id, children, size }) => {
  const { openedModals, closeModal } = useModalStore();
  const isThisModalOpen = openedModals[id];

  return isThisModalOpen
    ? createPortal(
        <St.Outer>
          <St.Inner size={size}>
            <St.CloseButton onClick={() => closeModal(id)}>
              <img src={CloseButton} alt="close" />
            </St.CloseButton>
            {children}
          </St.Inner>
        </St.Outer>,
        document.getElementById(PORTAL_MODAL) as HTMLElement,
      )
    : null;
};

export default Modal;
