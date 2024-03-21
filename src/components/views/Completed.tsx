import React from "react";
import {checkoutMachineContext} from "@/providers/CheckoutMachineProvider";
import Wrapper from "@/components/atoms/Wrapper";
import {ContextProductType, ContextType} from "@/models/Machine";
import Info from "@/components/atoms/Info";

const Completed: React.FC = () => {
  const context = checkoutMachineContext.useSelector((state) => state.context);
  const actorRef = checkoutMachineContext.useActorRef();

  const handleSetMessage = (message: string) => {
    actorRef.send({type: "SET_MESSAGE", message: message});
  };

  const sendData = async (context: ContextType) => {
    const response = await fetch("https://eomur63bdrnsvtt.m.pipedream.net", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context),
    });

    if (response.ok) {
      handleSetMessage("Dane zostały pomyślnie wysłane.");
    } else {
      handleSetMessage("Wystąpił błąd podczas wysyłania danych.");
    }
  };

  return (
    <Wrapper>
      <div className="card max-w-lg bg-base-100 shadow-lg mx-auto p-10">
        <h2 className="text-2xl font-bold mb-4">Twoje zamówienie</h2>

        {!!context.message ? (
          <Info>{context.message}</Info>
        ) : (
          <>
            <table className="table w-full mb-3">
              <thead>
                <tr>
                  <th>Nazwa produktu</th>
                  <th>Cena</th>
                </tr>
              </thead>
              <tbody>
                {context.items.map((item: ContextProductType) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price} szt. złota</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="grid grid-cols-2">
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Adres dostawy</h3>
                <p>
                  {context.address.street}, {context.address.city},{" "}
                  {context.address.country}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Metoda wysyłki</h3>
                <p>{context.shipping}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Metoda płatności</h3>
                <p>{context.payment.method}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Całkowita suma</h3>
                <p>{context.payment.amount} szt. złota</p>
              </div>
            </div>

            <div className="mt-10 mx-auto">
              <button
                className="btn btn-primary"
                onClick={() => sendData(context)}
              >
                Wyślij
              </button>
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default Completed;
