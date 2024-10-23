import {localeString} from "@/lib/helpers/utils";
import {Button, Card, Col, Row, Modal, Checkbox} from "antd";
import React, {FC, use, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {CustomRadioGroup, Input, Select} from "@/components/controls";
import {getData, postData} from "@/lib/services";
import Cookies from "js-cookie";
import {DataNotFound} from "../common";
import type {CheckboxChangeEvent} from "antd/es/checkbox";

interface IfineCurrent {
  language: string | undefined;
}
export const FineCurrent: FC<IfineCurrent> = ({language}) => {
  const [currentFine, setCurrentFine] = useState([]);
  const [due, setDue] = useState<any>([]);
  console.log("duepayment==>", due);
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: {errors, isDirty, isValid, isSubmitting},
  } = useForm<any>({
    defaultValues: {
      invoice_ids: "",
    },
    mode: "all",
  });
  useEffect(() => {
    getCurrentFine();
  }, []);

  const getCurrentFine = async () => {
    const res = await getData(
      `public_library/users/fine/circulations`,
      {purpose: "fine"},
      language,
      Cookies.get("token")
    );
    // console.log("current fine", res);
    if (res?.success) {
      setCurrentFine(res?.data);
    }
  };
  useEffect(() => {
    getDue();
  }, []);

  const getDue = async () => {
    const res = await getData(
      `public_library/users/unpaid_invoices`,
      {purpose: "fine"},
      language,
      Cookies.get("token")
    );
    // console.log("due amount", res);
    if (res?.success) {
      const newList = res?.data?.map((item: any) => {
        return {
          ...item,
          isSelected: false,
        };
      });
      setDue(newList);
    }
  };

  const handleOnSelect = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const newList = due?.map((item: any) => {
        return {
          ...item,
          isSelected: true,
        };
      });
      setDue(newList);
    } else {
      const newList = due?.map((item: any) => {
        return {
          ...item,
          isSelected: false,
        };
      });
      setDue(newList);
    }
  };
  const onChange = (e: CheckboxChangeEvent, passId: number) => {
    const newList = due?.map((item: any) => {
      if (item?.id === passId) {
        return {
          ...item,
          isSelected: e.target.checked,
        };
      } else {
        return {
          ...item,
        };
      }
    });

    setDue(newList);
  };
  // console.log("selected id", invoiceId);
  const onSubmit = async () => {
    // console.log("idddd==>", invoiceId);
    const seletedInvoices = due
      ?.filter((item: any) => item?.isSelected)
      ?.map((inv: any) => inv?.id);
    const res = await postData(
      `public_library/payments/fine/cash_to_library/initiate`,
      {invoice_ids: seletedInvoices || null},
      language,
      Cookies.get("token")
    );
    // console.log("dsadasd", invoice_ids);
    //   if ([200, 201].includes(res.data?.status)) {
    //     router.push("/activities/events");
    //   } else {
    //     if (res.status?.status === 401) {
    //       router.push("/auth/login");
    //     }
    //   }
    // } else {
    //   toast.info("Terms & Conditions is not checked");
    // }
  };
  const paymentOptions = [
    {
      label: (
        <div>
          <div>
            <div>
              <p className="lg:text-sm text-xs font-bold text-library-gray">
                {localeString(language, "cash")}
              </p>
            </div>
          </div>
        </div>
      ),
      value: "cash",
    },
    {
      label: (
        <div>
          <div className="">
            <p className="lg:text-sm font-bold text-xs text-library-gray">
              {localeString(language, "nagad")}
            </p>
          </div>
        </div>
      ),
      value: "nagad",
    },
  ];
  const totalFineAmount = currentFine.reduce(
    (total: number, current: any) => total + current.fine_amount,
    0
  );
  // console.log("Total fine amount:", totalFineAmount);
  return (
    <div>
      <div className="flex justify-between p-4 mt-8 font-bold border rounded-md">
        <p> {localeString(language, "fineCurrent")}</p>
        {totalFineAmount}
      </div>
      <p className="mt-4 font-semibold text-xs uppercase">
        {localeString(language, "fineNotice")}
      </p>
      <h1 className="section-title text-3xl mt-8 mb-4">
        {localeString(language, "fineDue")}
      </h1>
      {due?.length > 0 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <Checkbox
            name="isSelectall"

            // label={localeString(language, "fineSelectAll")}
          /> */}
          <Checkbox onChange={handleOnSelect}>
            {localeString(language, "fineSelectAll")}
          </Checkbox>
          <div>
            {due?.map((user: any, i: number) => (
              <Card key={user.id} hoverable className="borrowAntcard mt-2 p-4">
                <Row>
                  <Col lg={{span: 24}} xs={{span: 20}} className="w-full ">
                    <div className="">
                      <Checkbox
                        checked={user?.isSelected}
                        onChange={(e) => onChange(e, user.id)}
                      >
                        <div className="flex justify-between w-56 sm:w-[290px] md:w-[420px] lg:w-[600px] ml-4 text-sm">
                          <span className="space-y-7 text-library-gray">
                            <h2>{localeString(language, "totalfine")}</h2>
                            <h2>{localeString(language, "reason")}</h2>
                          </span>
                          <span className="space-y-7 text-library-gray-700">
                            <h2>{user?.invoice_amount}</h2>
                            <h2>{localeString(language, "lateReturn")}</h2>
                          </span>
                        </div>
                      </Checkbox>
                    </div>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
          <h1 className="section-title text-3xl mt-8 mb-4">
            {localeString(language, "finePayment")}
          </h1>
          <div className="mt-5 mb-10">
            <CustomRadioGroup
              // {...register}
              className="section border hover:border-library-primary broder-library-gray-300  rounded-lg "
              name="paymentMethod"
              errors={errors}
              options={paymentOptions}
              control={control}
              isIconcenter={false}
            />
          </div>
          <div className="flex justify-between mt-4 mb-52">
            <div className="font-semibold flex text-sm pt-4">
              <h2>{localeString(language, "total")}:</h2>
              <span className="ml-1"></span>
            </div>
            <div className="borrowBookButton">
              <Button htmlType="submit" className="button-secondary h-12 w-32">
                {localeString(language, "payNowButton")}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div>
          <DataNotFound />
        </div>
      )}
    </div>
  );
};
