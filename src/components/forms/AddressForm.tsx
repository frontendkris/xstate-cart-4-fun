import React, {useRef} from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import {
  ContextAddressType,
  ContextProductType,
  MachineStateType,
} from "@/models/Machine";
import {checkoutMachineContext} from "@/providers/CheckoutMachineProvider";

const addressSchema = Yup.object().shape({
  street: Yup.string().required("Pole jest wymagane"),
  city: Yup.string().required("Pole jest wymagane"),
  country: Yup.string().oneOf(["Polska", "USA"]).required("Pole jest wymagane"),
});

const AddressForm: React.FC = () => {
  const {address, isAddressSet, items} = checkoutMachineContext.useSelector(
    (state: MachineStateType) => state.context
  );
  const actorRef = checkoutMachineContext.useActorRef();
  const successInfo = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col justify-center md:justify-start w-full p-4 py-20 card card-body bg-white shadow-lg transition-all">
      <Formik
        initialValues={address}
        validationSchema={addressSchema}
        onSubmit={(values: ContextAddressType, {setSubmitting, resetForm}) => {
          actorRef.send({type: "SET_ADDRESS", address: values});
          setSubmitting(false);
          successInfo.current?.classList.remove("hidden");
        }}
      >
        {({isSubmitting}) => (
          <Form className="flex flex-col gap-4 md:max-w-xs mx-auto">
            <h3 className="text-xlg font-bold">Podaj dane dostawy</h3>
            <div className="form-control w-full">
              <label htmlFor="street" className="label">
                <span className="label-text">Ulica</span>
              </label>
              <Field
                id="street"
                name="street"
                type="text"
                className="input input-bordered w-full"
              />
              <ErrorMessage
                name="street"
                component="div"
                className="text-error text-xs italic"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="city" className="label">
                <span className="label-text">Miasto</span>
              </label>
              <Field
                id="city"
                name="city"
                type="text"
                className="input input-bordered w-full"
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-error text-xs italic"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="country" className="label">
                <span className="label-text">Kraj</span>
              </label>
              <Field
                as="select"
                id="country"
                name="country"
                className="select select-bordered w-full"
              >
                <option value="Polska">Polska</option>
                <option value="USA">USA</option>
              </Field>
              <ErrorMessage
                name="country"
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
      <div className="flex gap-4 mx-auto mt-10">
        <button
          className="btn btn-primary"
          onClick={() => actorRef.send({type: "SKIP_SHIPPING"})}
          disabled={
            !isAddressSet ||
            !!items.filter((item) => item.requiresShipping).length
          }
        >
          Pomiń wysyłkę (brak dostawy obowiązkowej)
        </button>
        <button
          className="btn btn-primary"
          disabled={!isAddressSet}
          onClick={() => actorRef.send({type: "SELECT_SHIPPING"})}
        >
          Wybierz wysyłkę
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
