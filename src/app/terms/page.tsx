import Link from "next/link";

import Layout from "../_components/layouts/Layout";
import Title from "../_components/Title";
import TermsDetail from "./_components/TermsDetail";

export default function TermsPage() {
  return (
    <Layout>
      <main className="w-full mx-auto py-10 md:w-[600px]">
        <Title>공기수첩 이용약관</Title>
        <article className="mt-10">
          <TermsDetail />
        </article>
        <Link
          className="block bg-default w-full py-2 mt-10 text-white text-center text-lg font-bold rounded-md"
          href="/home"
        >돌아가기</Link>
      </main>
    </Layout>
  );
}