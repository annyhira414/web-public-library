import {FC} from "react";
import {IStaticPages} from "@/lib/model/static";

interface StaticProps {
  pageData: IStaticPages;
}
export const Static: FC<StaticProps> = ({pageData}) => {
  return (
    <>
      <div className="pl-4 pt-10 content-container-static">
        <div className="text-base font-bold">{pageData?.title}</div>
        <div
          className="pt-2 text-left text-black text-base font-normal"
          dangerouslySetInnerHTML={{__html: pageData?.description}}
        ></div>
      </div>
    </>
  );
};
