import { NewsPaperList } from "@/components/newspaper";
import React, { FC } from "react";
interface INewspaper {
  total: string;
  name: string;
}

const NewsPaper: FC<INewspaper> = ({ total, name }) => {
  return (
    <div className="my-6 pl-content-container">
      <NewsPaperList total={total} name={name} />
    </div>
  );
};

export default NewsPaper;
