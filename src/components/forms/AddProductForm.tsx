import React, {useRef} from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Product} from "@/models/Product";
import {ContextProductType} from "@/models/Machine";

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Za krótka nazwa produktu")
    .max(20, "Za długa nazwa produktu")
    .required("Nazwa produktu jest wymagana"),
  price: Yup.number()
    .typeError("Cena produktu musi być liczbą")
    .positive("Cena produktu musi być większa niż 0")
    .required("Cena produktu jest wymagana"),
});

type AddProdutFormProps = {
  handleAddItem: (item: ContextProductType) => void;
};

const AddProductForm: React.FC<AddProdutFormProps> = ({handleAddItem}) => {
  const nameInput = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col justify-center md:justify-start sticky top-10 card card-body bg-white shadow-lg">
      <h3 className="text-xlg font-bold mb-4">Dodaj produkt do koszyka</h3>

      <Formik
        initialValues={{name: "", price: 1, requiresShipping: false}}
        validationSchema={ProductSchema}
        onSubmit={(values: Product, {setSubmitting, resetForm}) => {
          const newProductId = new Date().getTime().toString();
          const newProduct: ContextProductType = {
            id: newProductId,
            name: values.name,
            price: values.price,
            requiresShipping: values.requiresShipping,
          };
          handleAddItem(newProduct);
          resetForm();
          setSubmitting(false);
          nameInput.current?.focus();
        }}
      >
        {({isSubmitting}) => (
          <Form className="flex flex-col gap-4 md:max-w-xs">
            <div className="form-control w-full">
              <label htmlFor="name" className="label">
                <span className="label-text">Nazwa produktu</span>
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                className="input input-bordered w-full"
                innerRef={nameInput}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-error text-xs italic"
              />
            </div>

            <div className="form-control w-full">
              <label htmlFor="price" className="label">
                <span className="label-text">Cena</span>
              </label>
              <Field
                id="price"
                name="price"
                type="number"
                className="input input-bordered w-full"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-error text-xs italic"
              />
            </div>

            <div className="form-control w-full">
              <label
                htmlFor="requiresShipping"
                className="label justify-start gap-3"
              >
                <Field
                  id="requiresShipping"
                  name="requiresShipping"
                  type="checkbox"
                  className="checkbox"
                />
                <span className="label-text">Obowiązkowa dostawa</span>
              </label>
              <ErrorMessage
                name="requiresShipping"
                component="div"
                className="text-error text-xs italic"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary mt-2"
            >
              Dodaj do koszyka
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductForm;
