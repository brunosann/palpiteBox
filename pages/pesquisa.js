import React, { useState } from "react";
import PageTitle from "../components/PageTitle";

const Pesquisa = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    nota: 0,
  });
  const [success, setSuccess] = useState(false);
  const [retorno, setRetorno] = useState({});
  const notas = [0, 1, 2, 3, 4, 5];

  const save = async () => {
    try {
      const response = await fetch("/api/save", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setSuccess(true);
      setRetorno(data);
    } catch (error) {}
  };

  const formChange = (e) => {
    const value = e.target.value;
    const key = e.target.name;
    setForm((velho) => ({
      ...velho,
      [key]: value,
    }));
  };

  return (
    <div className="container mx-auto text-center">
      <PageTitle title="Pesquisa" />
      <h1 className="font-semibold my-10">Crítica e sugestões</h1>
      <p className="my-10">
        O restaurante X sempre busca por atender melhor seus clientes. <br />
        Por isso, estamos sempre abertos a ouvir a sua opinião.
      </p>
      {!success && (
        <div className="w-1/4 mx-auto my-10">
          <div className="form-group">
            <label className="font-semibold" htmlFor="nome">
              Seu Nome:
            </label>
            <input
              className="block mx-auto p-3 rounded border border-gray-600"
              type="text"
              name="nome"
              id="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={formChange}
            />
          </div>
          <div className="form-group my-6">
            <label className="font-semibold" htmlFor="whatsapp">
              Seu Whatsapp:
            </label>
            <input
              className="block mx-auto p-3 rounded border border-gray-600"
              type="text"
              name="whatsapp"
              id="whatsapp"
              placeholder="Whatsapp"
              value={form.whatsapp}
              onChange={formChange}
            />
          </div>
          <div className="form-group my-6">
            <label className="font-semibold" htmlFor="email">
              Seu Email:
            </label>
            <input
              className="block mx-auto p-3 rounded border border-gray-600"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={form.email}
              onChange={formChange}
            />
          </div>
          <div className="form-group">
            <label className="font-semibold mt-6">Nota:</label>
            <div className="flex justify-between ">
              {notas.map((nota) => {
                return (
                  <div className="flex flex-col text-center">
                    <label htmlFor="">
                      {nota} <br />
                      <input
                        type="radio"
                        name="nota"
                        id=""
                        value={nota}
                        onChange={formChange}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {success && (
        <div className="w-1/4 mx-auto my-10">
          <p>Obrigado por dar sua sugestão e/ou critica.</p>
          <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 my-3">
            <p>Seu Cupom:</p>
            <span className="font-bold">{retorno.Cupom}</span>
          </div>
          <p>{retorno.Promo}</p>
        </div>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded my-10"
        onClick={save}
      >
        Enviar
      </button>
    </div>
  );
};

export default Pesquisa;
