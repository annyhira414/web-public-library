import { MakePayment, RenewMembership } from "@/components/membership";
import React, { FC } from "react";
interface IMembershipPaymentPage {
  divisions: any;
  districts: any;
  thanas: any;
}

const RenewMembershipPaymentpage: FC<IMembershipPaymentPage> = ({
  divisions,
  districts,
  thanas,
}) => {
  return (
    <div>
      <div className="pl-content-container">
        <RenewMembership
          divisions={divisions}
          districts={districts}
          thanas={thanas}
        />
      </div>
    </div>
  );
};

export default RenewMembershipPaymentpage;
