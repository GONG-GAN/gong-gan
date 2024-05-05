'use client'

import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

import { useUserSearch } from "@/app/_lib/hooks";
import PartLoadingUI from "@/app/_components/PartLoadingUI";

export default function SearchUserSection() {
  const [keyword, setKeyword] = useState<string>('');
  const { data: userInfo, isPending, refetch } = useUserSearch(keyword);
  const keywordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const searchKeyPressHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      refetch();
    }
  }

  return (
    <section className="p-10 col-span-9">
      <article className="flex items-center">
        <section className="font-bold text-default text-2xl mr-5">사용자 정보 찾기</section>
        <section className="w-[350px] relative border-[1.5px] border-default rounded-full">
          <input
            className="h-[5vh] px-5 rounded-full outline-none"
            value={keyword}
            onChange={keywordChangeHandler}
            onKeyDown={searchKeyPressHandler}
            placeholder="사용자 닉네임을 입력해주세요."
          />
          <IoSearch className="absolute top-1/2 right-3 -translate-y-1/2" size="30" color="#4A68F5" />
        </section>
      </article>
      <article className="min-h-[500px] mt-10 flex justify-center items-center">
        {isPending ? <PartLoadingUI /> : (
          userInfo ? (
            <article className="flex justify-center items-center shadow-lg rounded-md py-10 mt-8 md:justify-start md:px-24">
              <section>
                <CgProfile size="60" color="#4A68F5" />
              </section>
              <section className="ml-5 text-dark-gray text-sm sm:text-base">
                <div className="mb-3">{userInfo.email}</div>
                <div className="">{userInfo.name}</div>
              </section>
            </article>
          ) : (
            <section className="text-default font-bold text-xl">유저 정보가 없습니다. 사용자 닉네임으로 검색해주세요.</section>
          )
        )}
      </article>
    </section>
  );
}
