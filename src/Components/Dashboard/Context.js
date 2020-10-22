import React, { useContext } from "react";

const ContainerContext = React.createContext();
export default ContainerContext;

export const useAppContainer = () => {
  const app = useContext(ContainerContext);
  return app;
};
