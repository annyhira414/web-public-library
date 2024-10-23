import React, { FC } from "react";
import { MembershipHistory } from "@/components/membership";
interface IMemberHistory {}

const MemberHistory: FC<IMemberHistory> = () => {
  return (
    <div>
      <MembershipHistory />
    </div>
  );
};

export default MemberHistory;
