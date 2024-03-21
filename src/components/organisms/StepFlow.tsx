import React from "react";
import {checkoutMachineContext} from "@/providers/CheckoutMachineProvider";
import Cart from "@/components/views/Cart";
import {MachineStateType} from "@/models/Machine";
import Address from "@/components/views/Address";
import Shipping from "@/components/views/Shipping";
import Payment from "@/components/views/Payment";
import Completed from "../views/Completed";

const StepFlow: React.FC = () => {
  const state = checkoutMachineContext.useSelector(
    (state: MachineStateType) => state
  );

  const renderStep = () => {
    switch (state.value) {
      case "cart":
      default:
        return <Cart />;

      case "addressed":
        return <Address />;

      case "shipping_selected":
      case "shipping_skipped":
        return <Shipping />;

      case "payment_selected":
      case "payment_skipped":
        return <Payment />;

      case "completed":
        console.log(state.context);
        return <Completed />;
    }
  };

  return <div>{renderStep()}</div>;
};

export default StepFlow;
