import React, {PropsWithChildren} from "react";

const Heading: React.FC<PropsWithChildren> = ({children}) => {
  return <h2 className="text-2xl font-bold mb-0">{children}</h2>;
};

export default Heading;
