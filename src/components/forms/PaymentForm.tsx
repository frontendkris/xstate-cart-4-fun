import React, {useRef} from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import {
  ContextType,
  MachineStateType,
  PaymentMethodsType,
  ShippingMethods,
} from "@/models/Machine";
import {checkoutMachineContext} from "@/providers/CheckoutMachineProvider";
import {calculateTotalAmount} from "@/utils/calculateTotalAmount";

const PaymentForm: React.FC = () => {
  const {payment, items}: ContextType = checkoutMachineContext.useSelector(
    (state: MachineStateType) => state.context
  );
  const actorRef = checkoutMachineContext.useActorRef();
  const successInfo = useRef<HTMLDivElement>(null);

  const possiblePaymentMethods = ["PayPal", "Mastercard", "Visa"];

  const PaymentFormSchema = Yup.object().shape({
    payment: Yup.string()
      .oneOf(possiblePaymentMethods)
      .required("Pole jest wymagane"),
  });

  return (
    <div className="flex flex-col justify-center md:justify-start w-full p-4 py-20 card card-body bg-white shadow-lg transition-all">
      <Formik
        initialValues={{payment: possiblePaymentMethods[0]}}
        validationSchema={PaymentFormSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          actorRef.send({
            type: "SET_PAYMENT",
            value: {
              method: values.payment as PaymentMethodsType,
              amount: calculateTotalAmount(items),
            },
          });
          setSubmitting(false);
          successInfo.current?.classList.remove("hidden");
        }}
      >
        {({isSubmitting}) => (
          <Form className="flex flex-col gap-4 md:max-w-xs mx-auto">
            <h3 className="text-xlg font-bold">Wybierz metodę płatności</h3>

            <div className="form-control w-full">
              <Field
                as="select"
                id="shipping"
                name="shipping"
                className="select select-bordered w-full"
              >
                {possiblePaymentMethods.map((shipping) => (
                  <option key={shipping} value={shipping}>
                    {shipping}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="shipping"
                component="div"
                className="text-error text-xs italic"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary mt-2"
            >
              Zapisz dane
            </button>
            <div
              ref={successInfo}
              className="text-center p-2 mt-2 bg-green-100 text-green-700 rounded hidden"
            >
              Twoje dane zostały zapisane!
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentForm;
