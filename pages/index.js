import React from "react";
import Link from "next/link";
import useSWR from "swr";
import PageTitle from "../components/PageTitle";

const fetcher = async (...args) => {
  let req = await fetch(args);
  req = await req.json();
  return req;
};

const Index = () => {
  const { data, error } = useSWR("/api/get-promo", fetcher);
  return (
    <div className="container mx-auto text-center">
      <PageTitle title="Seja Bem-vindo" />
      <p className="my-10">
        O restaurante X sempre busca por atender melhor seus clientes. <br />
        Por isso, estamos sempre abertos a ouvir a sua opinião.
      </p>
      <Link href="/pesquisa">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded my-10">
          Button
        </button>
      </Link>
      {!data && <p className="my-10">Carregando</p>}
      {!error && data && data.showCoupon && <p className="my-10">{data.msg}</p>}
    </div>
  );
};
export default Index;
