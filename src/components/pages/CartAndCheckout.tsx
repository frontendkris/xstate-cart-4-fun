"use client";

import React from "react";
import CheckoutMachineProvider from "@/providers/CheckoutMachineProvider";
import StepFlow from "@/components/organisms/StepFlow";

const CartAndCheckout: React.FC = () => {
  return (
    <CheckoutMachineProvider>
      <StepFlow />
    </CheckoutMachineProvider>
  );
};

export default CartAndCheckout;
