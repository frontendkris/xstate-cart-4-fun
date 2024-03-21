import {Product} from "./Product";

export type ContextProductType = Product & {
  id: string;
};

export type ContextAddressType = {
  street: string;
  city: string;
  country: "Polska" | "USA";
};

export type ShippingMethods = "Kurier DPD" | "Amazon Prime";

export type PaymentMethodsType = "Mastercard" | "Visa" | "PayPal";

export type PaymentType = {
  method: PaymentMethodsType;
  amount: number;
};

export type ContextType = {
  items: ContextProductType[];
  address: ContextAddressType;
  isAddressSet: boolean;
  shipping: ShippingMethods;
  payment: PaymentType;
  message: string;
};

export type AddProductEventType = {
  type: "ADD_ITEM";
  item: ContextProductType;
};

export type RemoveProductEventType = {
  type: "REMOVE_ITEM";
  id: string;
};

export type SetAddressEventType = {
  type: "SET_ADDRESS";
  address: ContextAddressType;
};

export type SetShippingEventType = {
  type: "SET_SHIPPING";
  value: ShippingMethods;
};

export type SetPaymentEventType = {
  type: "SET_PAYMENT";
  value: PaymentType;
};

export type SetMessageEventType = {
  type: "SET_MESSAGE";
  message: string;
};

export type EventTypes =
  | AddProductEventType
  | RemoveProductEventType
  | SetAddressEventType
  | SetShippingEventType
  | SetPaymentEventType
  | SetMessageEventType
  | {
      type: "ADDRESS";
    }
  | {
      type: "SELECT_SHIPPING";
    }
  | {
      type: "SKIP_SHIPPING";
    }
  | {
      type: "SELECT_PAYMENT";
    }
  | {
      type: "SKIP_PAYMENT";
    }
  | {
      type: "COMPLETE";
    };

export type MachineStateType = {
  value:
    | "cart"
    | "addressed"
    | "shipping_selected"
    | "shipping_skipped"
    | "payment_selected"
    | "payment_skipped"
    | "completed";
  context: ContextType;
};
