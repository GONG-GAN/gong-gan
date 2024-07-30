import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

import { parseDate } from "@/utils/modules";

export default function ProfileRecordCard({ recordInfo }: PropsType) {
  const myRecordContent = recordInfo.content.split('\n');

  return (
    <article className="border-b border-gray py-5">
      <section className="flex justify-between">
        <div className="flex items-center">
          <div className="text-sm text-default font-bold sm:text-lg">{recordInfo.address}</div>
          <div className="text-xs text-default ml-3 sm:text-sm">{recordInfo.address_detail}</div>
        </div>
        <button className="bg-white-gray text-sm px-4 py-2 rounded-lg">기록수정</button>
      </section>
      <section className="mt-2 text-xs sm:text-sm">
        {myRecordContent.map((content, idx) => {
          if (!content) {
            return <br key={idx} />;
          }
          return <p className="break-words" key={idx}>{content}</p>;
        })}
      </section>
      <section className="flex justify-end items-center text-middle-gray mt-5">
        <div className="flex items-center mr-5">
          <div className="flex items-center mr-2">
            <div>
              <AiOutlineLike className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            </div>
            <div className="text-xs sm:text-sm">{ recordInfo.likes }</div>
          </div>
          <div className="flex items-center">
            <div>
              <AiOutlineDislike className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            </div>
            <div className="text-xs sm:text-sm">{ recordInfo.dislikes }</div>
          </div>
        </div>
        <div className="text-xs sm:text-sm">{ parseDate(recordInfo.create_at) }</div>
      </section>
    </article>
  );
}

interface PropsType {
  recordInfo: MyRecordTypes;
}

interface MyRecordTypes {
  post_id: string;
  address: string;
  address_detail: string;
  content: string;
  likes: number;
  dislikes: number;
  create_at: Date;
};