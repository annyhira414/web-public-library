import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <div className="mt-6">
      <div className="pl-content-container">
        <h2 className="text-center">Order Will be Track Here</h2>
        <div className="text-center text-red-600">
          <Link href="/user/my-orders">Back</Link>
        </div>
      </div>
    </div>
  );
};

export default index;
