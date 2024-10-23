import dynamic from "next/dynamic";
import {MainBookDemand} from "@/components/my-request/MainBookDemand";
import {MyRequestCommon} from "@/components/my-request/MyRequest";
import {History} from "@/components/my-request/securityMoneyRequest/History";
import {ApplyForSecurityMoney} from "@/components/my-request/securityMoneyRequest/ApplyForSecurityMoney";
const MainBookDemandRequestHistory = dynamic(
  () => import("@/components/my-request/MainBookDemandRequestHistory")
);
const HomeDelivery = dynamic(
  () => import("@/components/my-request/libraryCardRequest/HomeDelivery")
);
import Rejected from "@/components/my-request/Rejected/index";
import Accepted from "@/components/my-request/Accepted/index";
import Pending from "@/components/my-request/Pending/index";
import {ApplyForm} from "@/components/my-request/libraryCardRequest/ApplyForm";
import {PickUpFromLibrary} from "@/components/my-request/libraryCardRequest/PickUpFromLibrary";
import {BookDemandRequstHistory} from "@/components/my-request/bookDemandRequetHistory/BookDemandRequstHistory";
export {
  MainBookDemand,
  MainBookDemandRequestHistory,
  MyRequestCommon,
  History,
  ApplyForSecurityMoney,
  Rejected,
  Accepted,
  Pending,
  ApplyForm,
  HomeDelivery,
  PickUpFromLibrary,
  BookDemandRequstHistory,
};
