import { MakePayment } from "@/components/membership";
import React, { FC } from "react";
interface IMembershipPaymentPage {
  divisions: any;
  districts: any;
  thanas: any;
}

const MembershipPaymentpage: FC<IMembershipPaymentPage> = ({
  divisions,
  districts,
  thanas,
}) => {
  return (
    <div>
      <div className="pl-content-container">
        <MakePayment
          divisions={divisions}
          districts={districts}
          thanas={thanas}
        />
      </div>
    </div>
  );
};

export default MembershipPaymentpage;
