import React, { ReactNode } from 'react';

import './ComponentStyle.css';

interface DivComponentProps {
  children: ReactNode;
}

const divComponent: React.FC<DivComponentProps> = ({ children }) => {
  return <div className="component-div">{children}</div>;
};

export default divComponent;
