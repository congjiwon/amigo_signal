import React, { ReactNode } from 'react';

interface StyledWrapperProps {
  children: ReactNode;
}

const StyledWrapper: React.FC<StyledWrapperProps> = ({ children }) => {
  return <div style={{ paddingTop: '70px' }}>{children}</div>;
};

export default StyledWrapper;
