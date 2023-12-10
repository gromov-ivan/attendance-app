import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '../store';  // Adjust the path as needed

interface CustomProviderProps {
  children: ReactNode;
}

const CustomProvider: React.FC<CustomProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default CustomProvider;
