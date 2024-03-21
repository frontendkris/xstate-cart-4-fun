import React, {useRef} from "react";
import Heading from "@/components/atoms/Heading";
import Wrapper from "@/components/atoms/Wrapper";
import {checkoutMachineContext} from "@/providers/CheckoutMachineProvider";
import {ContextType, MachineStateType} from "@/models/Machine";
import ShippingForm from "@/components/forms/ShippingForm";
import Info from "../atoms/Info";

const Shipping: React.FC = () => {
  const state = checkoutMachineContext.useSelector(
    (state: MachineStateType) => state
  );
  const {address, shipping}: ContextType = state.context;
  const actorRef = checkoutMachineContext.useActorRef();

  return (
    <Wrapper>
      <div className="flex justify-between items-center mb-8">
        <Heading>Dostawa</Heading>
      </div>
      <div className="flex flex-col justify-center items-center">
        {state.value === "shipping_selected" ? (
          <ShippingForm />
        ) : (
          <Info>
            Metoda dostawy została pominięta. Domyślny wybór: {shipping}
          </Info>
        )}
        <div className="flex gap-4 mt-10 mx-auto">
          <button
            className="btn btn-primary"
            onClick={() => actorRef.send({type: "ADDRESS"})}
          >
            Address
          </button>
          <button
            className="btn btn-primary"
            onClick={() => actorRef.send({type: "SKIP_PAYMENT"})}
          >
            Pomiń płatność
          </button>
          <button
            className="btn btn-primary"
            onClick={() => actorRef.send({type: "SELECT_PAYMENT"})}
          >
            Wybierz płatność
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Shipping;
