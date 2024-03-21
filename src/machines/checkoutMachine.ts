import {assign, createMachine, setup} from "xstate";
import {
  AddProductEventType,
  ContextAddressType,
  ContextProductType,
  ContextType,
  EventTypes,
  PaymentMethodsType,
  PaymentType,
  RemoveProductEventType,
  SetAddressEventType,
  SetMessageEventType,
  SetPaymentEventType,
  SetShippingEventType,
  ShippingMethods,
} from "@/models/Machine";

const checkoutMachine = setup({
  types: {
    context: {} as ContextType,
    events: {} as EventTypes,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SwC5gA6wHQGMCGATigMQCCAIuQPoCSAKgKICyA2gAwC6io6A9rAEsUA3gDtuIAB6IArAGYsbAJxyA7ABYAbDPUalMmQA51AGhABPRAEZVqrOvls5S-aquarNgL5ezqDNj4RMQASswA8gBqDLSMrJwSfILCYhLSCOoATGaWCIZW9i5KWZpaSplaqj5+aJi4hCQU5GEAyi3sXEggSUIi4l3pmWx2mXLqcjKq+hUymnM5iJm2WEpsHmqZmqrOttUg-nV4EBAEcLCQxC0MADIMAMJ0VC0AEjQACm80AHIA4h2J-F6qQGiF0mUUVlmbEMhhkS1Ua1MFkWxiwckyS00mUhE0mSj2B2wRxOZwuLQA0u8nq8Pt8-gkuj0Uv1QOkwRCoTC4bZEQsEBiZFhDBjVHNMkpVDo3JoCbVsLAABYCdDoASiKBUc4AGzAODQEEuN3ujzepAAmkwGF86P9GYDmWlEIY5lgbFYlFZMjD1MpJXzxWwsNtipNdMUtDJZQEsIrlar1ZqwDq9WTKW8qKaLVabQyePa+o68i63R6vcZfTI+VZ8kHnDJPaolhV1FYo3VYyq1RrYABrONko0PDPmy3W2155IFkFFzSutyl70V-3orCjYrbOSaOTONiTNvypWdhO9-sGilUzOjnOdCdAllSJ3F+eexcSyvIhBWOQFNcGIYe30ZV8fY5SwdA8HMABbMBRBQRNk31Yg7nCJg3luRhx26fNgVZaxMjhew1C0FsHDYSEkVyL0FHUQxilKNgfWhGF9zAiDoNgzU+xVC5kNQ9CGEwpkp1wz98PBcYNFKKxSPIqsNHsWj63KQxVBhLd1B8YDRF4CA4AkQkAUnHCHwQABaTQ+XMlighQQy70LLcsA8NxbEMbcJm0Qx-VU+w1i-Rsth2SUWOJU5YHOCA7IdacxgKN1nTGTcDARORvMMXz1gC4NbEjYDCRjQ9427JNdX1KLhJMuYlCwSZ8nrL0Izhf1UWFJYJTUMYMS-FiOyKzjT3K4z0i2AplFo0V8K-fCLI-DFZ3RTEsTfXR3BY8CoJguDtVKyBBvvdIrDWQV0VarRPVmZqFCUWjiIYtgmMMNa2M2-ruMiu0jP26wjrRL0MTO6a5PUFZFPdL1VIS6zeEg9AdTKj77OnL9rsUVSnA0NRaMhbzBWGeEll3TZG00rwgA */
  id: "steps",
  initial: "cart",
  context: {
    items: [] as ContextProductType[],
    address: {
      street: "",
      city: "",
      country: "Polska",
    } as ContextAddressType,
    isAddressSet: false,
    shipping: "Amazon Prime" as ShippingMethods,
    payment: {
      method: "PayPal" as PaymentMethodsType,
      amount: 0,
    } as PaymentType,
    message: "",
  },
  states: {
    cart: {
      on: {
        ADD_ITEM: {
          actions: assign(
            ({
              context,
              event,
            }: {
              context: ContextType;
              event: AddProductEventType;
            }) => {
              return {
                items: [...context.items, event.item],
              };
            }
          ),
        },
        REMOVE_ITEM: {
          actions: assign(
            ({
              context,
              event,
            }: {
              context: ContextType;
              event: RemoveProductEventType;
            }) => {
              return {
                items: context.items.filter(
                  (item: ContextProductType) => item.id !== event.id
                ),
              };
            }
          ),
        },
        ADDRESS: "addressed",
      },
    },
    addressed: {
      on: {
        SET_ADDRESS: {
          actions: assign(
            ({
              context,
              event,
            }: {
              context: ContextType;
              event: SetAddressEventType;
            }) => {
              return {address: event.address, isAddressSet: true};
            }
          ),
        },
        SELECT_SHIPPING: "shipping_selected",
        SKIP_SHIPPING: "shipping_skipped",
      },
    },
    shipping_selected: {
      on: {
        SET_SHIPPING: {
          actions: assign(
            ({
              context,
              event,
            }: {
              context: ContextType;
              event: SetShippingEventType;
            }) => {
              console.log(event);
              return {shipping: event.value};
            }
          ),
        },
        ADDRESS: "addressed",
        SELECT_PAYMENT: "payment_selected",
        SKIP_PAYMENT: "payment_skipped",
      },
    },
    shipping_skipped: {
      on: {
        ADDRESS: "addressed",
        SELECT_PAYMENT: "payment_selected",
        SKIP_PAYMENT: "payment_skipped",
      },
    },
    payment_selected: {
      on: {
        SET_PAYMENT: {
          actions: assign(
            ({
              context,
              event,
            }: {
              context: ContextType;
              event: SetPaymentEventType;
            }) => {
              return {payment: event.value};
            }
          ),
        },
        ADDRESS: "addressed",
        SELECT_SHIPPING: "shipping_selected",
        SKIP_SHIPPING: "shipping_skipped",
        COMPLETE: "completed",
      },
    },
    payment_skipped: {
      on: {
        SET_PAYMENT: {
          actions: assign(
            ({
              context,
              event,
            }: {
              context: ContextType;
              event: SetPaymentEventType;
            }) => {
              return {payment: event.value};
            }
          ),
        },
        ADDRESS: "addressed",
        SELECT_SHIPPING: "shipping_selected",
        SKIP_SHIPPING: "shipping_skipped",
        COMPLETE: "completed",
      },
    },
    completed: {
      on: {
        SET_MESSAGE: {
          actions: assign(
            ({
              context,
              event,
            }: {
              context: ContextType;
              event: SetMessageEventType;
            }) => {
              return {message: event.message};
            }
          ),
        },
      },
    },
  },
});

export default checkoutMachine;
