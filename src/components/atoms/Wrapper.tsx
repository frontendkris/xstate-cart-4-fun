import React, {PropsWithChildren} from "react";

const Wrapper: React.FC<PropsWithChildren> = ({children}) => {
  return <div className="container mx-auto py-20 p-4">{children}</div>;
};

export default Wrapper;
