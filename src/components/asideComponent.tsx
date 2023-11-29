import React, { ReactNode } from 'react';

import './ComponentStyle.css';

interface AsideComponentProps {
  children: ReactNode;
}

const AsideComponent: React.FC<AsideComponentProps> = ({ children }) => {
  return <aside className="component-aside">{children}</aside>;
};

export default AsideComponent;
