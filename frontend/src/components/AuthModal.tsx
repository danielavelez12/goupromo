import React, { useEffect } from "react";
import styled from "styled-components";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

const AuthModal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth,
}: AuthModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent maxWidth={maxWidth} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          {title}
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div<{ maxWidth?: string }>`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: ${(props) => props.maxWidth || "500px"};
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    max-width: none;
    border-radius: 0;
    max-height: 100vh;
  }
`;

const ModalHeader = styled.div`
  padding: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export default AuthModal;
