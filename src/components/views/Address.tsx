import React, {useRef} from "react";
import Heading from "@/components/atoms/Heading";
import Wrapper from "@/components/atoms/Wrapper";
import AddressForm from "@/components/forms/AddressForm";

const Address: React.FC = () => {
  return (
    <Wrapper>
      <div className="flex justify-between items-center mb-8">
        <Heading>Adres</Heading>
      </div>
      <div className="flex justify-center items-center">
        <AddressForm />
      </div>
    </Wrapper>
  );
};

export default Address;
