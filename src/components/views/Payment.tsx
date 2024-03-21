import React, {useEffect, useRef} from "react";
import Heading from "@/components/atoms/Heading";
import Wrapper from "@/components/atoms/Wrapper";
import {checkoutMachineContext} from "@/providers/CheckoutMachineProvider";
import {
  ContextType,
  MachineStateType,
  PaymentMethodsType,
} from "@/models/Machine";
import Info from "@/components/atoms/Info";
import PaymentForm from "@/components/forms/PaymentForm";
import {calculateTotalAmount} from "@/utils/calculateTotalAmount";

const Payment: React.FC = () => {
  const state = checkoutMachineContext.useSelector(
    (state: MachineStateType) => state
  );
  const {payment, items}: ContextType = state.context;
  const actorRef = checkoutMachineContext.useActorRef();

  return (
    <Wrapper>
      <div className="flex justify-between items-center mb-8">
        <Heading>Metoda płatności</Heading>
      </div>
      <div className="flex flex-col justify-center items-center">
        {state.value === "payment_selected" ? (
          <PaymentForm />
        ) : (
          <Info>
            Metoda płatności została pominięta. Domyślny wybór:
            {payment.method as PaymentMethodsType}
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
            onClick={() => actorRef.send({type: "SKIP_SHIPPING"})}
          >
            Pomiń wysyłkę
          </button>
          <button
            className="btn btn-primary"
            onClick={() => actorRef.send({type: "SELECT_SHIPPING"})}
          >
            Wybierz wysyłkę
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              actorRef.send({
                type: "SET_PAYMENT",
                value: {
                  ...payment,
                  amount: calculateTotalAmount(items),
                },
              });
              actorRef.send({type: "COMPLETE"});
            }}
          >
            Zakończ
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Payment;
