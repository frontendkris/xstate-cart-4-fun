import React, {PropsWithChildren} from "react";
import {createActorContext} from "@xstate/react";
import checkoutMachine from "@/machines/checkoutMachine";

export const checkoutMachineContext = createActorContext(checkoutMachine);

const CheckoutMachineProvider: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <checkoutMachineContext.Provider>
      {children}
    </checkoutMachineContext.Provider>
  );
};

export default CheckoutMachineProvider;
