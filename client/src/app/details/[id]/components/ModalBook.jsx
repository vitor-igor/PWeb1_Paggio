"use client";

import { useState } from "react";
import { CgFileDocument } from "react-icons/cg";
import { FaBookmark } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import {
  TiStarFullOutline,
  TiStarOutline,
  TiStarHalfOutline,
} from "react-icons/ti";
import { LiaHourglassHalfSolid } from "react-icons/lia";
import { TfiTimer } from "react-icons/tfi";
import Link from "next/link";

const bookshelfs = [
  "TheBest",
  "Lido",
  "Lendo",
  "Quero ler",
  "Relendo",
  "Abandonei",
];

export default function ModalBook({ book_id }) {
  const [modalAdicionarStatus, setModalAdicionarStatus] = useState(false);
  const [modalEditarStatus, setModalEditarStatus] = useState(false);
  const [modalAvaliar, setModalAvaliar] = useState(false);
  const [modalHistorico, setModalHistorico] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);

  const [status, setStatus] = useState("");
  const [rating, setRating] = useState(0);
  const [lastPage, setLastPage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [hover, setHover] = useState(0);

  const showModalAdicionarStatus = () =>
    setModalAdicionarStatus((prev) => !prev);
  const showModalEditarStatus = () => setModalEditarStatus((prev) => !prev);
  const showModalAvaliar = () => setModalAvaliar((prev) => !prev);
  const showModalHistorico = () => setModalHistorico((prev) => !prev);
  const showModalData = () => setModalData((prev) => !prev);
  const showModalStatus = () => setModalStatus((prev) => !prev);

  // Função para adicionar status (POST)
  const handleAddStatus = async () => {
    try {
      const payload = {
        book_id: book_id,
        status: status,
      };

      const res = await fetch(`http://127.0.0.1:5000/api/books/status_book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (res.ok) {
        alert("Status adicionado com sucesso!");
        showModalAdicionarStatus();
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Erro ao adicionar status.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  // Função para editar status (PUT)
  const handleEditStatus = async (field) => {
    try {
      let payload = {
        book_id: book_id,
      };

      if (field === "status" && status) {
        payload.status = status;
      } else if (field === "rating" && rating > 0) {
        payload.rating = rating;
      } else if (field === "lastPage" && lastPage) {
        payload.last_page = lastPage;
      } else if (field === "dates" && (startDate || finishDate)) {
        payload.date_start = startDate;
        payload.date_finish = finishDate;
      } else {
        return alert("Nenhum dado para enviar.");
      }

      const res = await fetch(`http://127.0.0.1:5000/api/books/status_book`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (res.ok) {
        alert("Status editado com sucesso!");
        if (field === "status") showModalStatus();
        if (field === "rating") showModalAvaliar();
        if (field === "lastPage") showModalHistorico();
        if (field === "dates") showModalData();
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Erro ao editar status.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <>
      <div className="flex gap-3">
        <button
          className="bg-azul-100 z-10 flex cursor-pointer rounded-2xl p-2"
          onClick={showModalAdicionarStatus}
        >
          <p className="pl-1.5">Adicionar</p>
          <div className="pr-1.5 pl-2">
            <FiPlus className="h-full" />
          </div>
        </button>
        <button
          className="bg-azul-100 z-10 flex cursor-pointer rounded-full p-3"
          onClick={showModalEditarStatus}
        >
          <div className="">
            <GoPencil className="h-full" />
          </div>
        </button>
      </div>

      {/* Modal Adicionar Status */}
      {modalAdicionarStatus && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
          <div className="bg-preto-100 text-branco-100 rounded-xl p-10 shadow-lg lg:w-md">
            <div className="flex justify-between">
              <h2 className="pb-4 text-2xl font-bold">Adicionar à estante:</h2>
              <div className="items-center justify-center justify-self-center">
                <button
                  className="bg-roxo-100 ml-3 cursor-pointer rounded-full p-2"
                  onClick={showModalAdicionarStatus}
                >
                  <IoClose className="text-branco-100 text-sm" />
                </button>
              </div>
            </div>
            {bookshelfs.map((shelf) => (
              <div key={shelf} className="flex gap-2">
                <input
                  type="radio"
                  name="bookshelf"
                  value={shelf}
                  className="accent-roxo-100"
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label>{shelf}</label>
              </div>
            ))}
            <button
              className="bg-roxo-100 z-10 mt-5 flex w-full cursor-pointer items-center justify-center rounded-2xl p-2"
              onClick={handleAddStatus}
            >
              <p>Enviar</p>
            </button>
          </div>
        </div>
      )}

      {/* Modal Editar Status (botões originais) */}
      {modalEditarStatus && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
          <div className="bg-preto-100 text-branco-100 w-auto rounded-xl p-10 shadow-lg">
            <div className="flex items-center justify-between pb-4">
              {" "}
              {/* Adicionado items-center aqui */}
              <h2 className="text-2xl font-bold">Editar à estante:</h2>
              <button
                className="bg-roxo-100 cursor-pointer rounded-full p-2"
                onClick={showModalEditarStatus}
              >
                <IoClose className="text-branco-100 text-sm" />
              </button>
            </div>
            <div className="grid grid-cols-2 justify-items-center gap-3">
              <button
                className="avaliacao bg-branco-100/10 flex h-20 w-full cursor-pointer items-center justify-center gap-2 rounded-md p-4"
                onClick={showModalStatus}
              >
                <LiaHourglassHalfSolid />
                Status
              </button>
              <button
                className="avaliacao bg-branco-100/10 flex h-20 w-full cursor-pointer items-center justify-center gap-2 rounded-md p-4"
                onClick={showModalAvaliar}
              >
                <TiStarHalfOutline />
                Avaliar
              </button>
              <button
                className="data bg-branco-100/10 flex h-20 w-full cursor-pointer items-center justify-center gap-2 rounded-md p-4"
                onClick={showModalData}
              >
                <HiOutlineCalendarDateRange />
                Datas
              </button>
              <button
                className="tempo bg-branco-100/10 flex h-20 w-full cursor-pointer items-center justify-center gap-2 rounded-md p-4"
                onClick={showModalHistorico}
              >
                <TfiTimer />
                Última página
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Status */}
      {modalStatus && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70">
          <div className="bg-branco-100 text-preto-100 min-w-[300px] rounded-xl p-8 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Editar Status</h3>
              <button onClick={showModalStatus}>
                <IoClose className="text-preto-100 text-lg" />
              </button>
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-preto-100 text-branco-100 w-full rounded-md border border-gray-700 p-2"
            >
              <option value="">Selecione um status</option>
              {bookshelfs.map((shelf) => (
                <option key={shelf} value={shelf}>
                  {shelf}
                </option>
              ))}
            </select>
            <button
              className="bg-roxo-100 text-branco-100 mt-4 w-full rounded px-4 py-2"
              onClick={() => handleEditStatus("status")}
            >
              Salvar status
            </button>
          </div>
        </div>
      )}

      {/* Modal Avaliar */}
      {modalAvaliar && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70">
          <div className="bg-branco-100 text-preto-100 min-w-[300px] rounded-xl p-8 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Avaliar livro</h3>
              <button onClick={showModalAvaliar}>
                <IoClose className="text-preto-100 text-lg" />
              </button>
            </div>
            <div className="mb-4 flex gap-2">
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                  <label key={currentRating}>
                    <input
                      type="radio"
                      name="rating"
                      value={currentRating}
                      onClick={() => setRating(currentRating)}
                      className="hidden"
                    />
                    <TiStarFullOutline
                      className={`cursor-pointer text-2xl transition-colors duration-200 ${
                        currentRating <= (hover || rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(0)}
                    />
                  </label>
                );
              })}
            </div>
            <button
              className="bg-roxo-100 text-branco-100 w-full rounded px-4 py-2"
              onClick={() => handleEditStatus("rating")}
            >
              Salvar avaliação
            </button>
          </div>
        </div>
      )}

      {/* Modal Data */}
      {modalData && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70">
          <div className="bg-branco-100 text-preto-100 min-w-[300px] rounded-xl p-8 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Editar datas</h3>
              <button onClick={showModalData}>
                <IoClose className="text-preto-100 text-lg" />
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="startDate" className="mb-1 block text-sm">
                Data de Início
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-preto-100 text-branco-100 mt-1 w-full rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="finishDate" className="mb-1 block text-sm">
                Data de Fim
              </label>
              <input
                id="finishDate"
                type="date"
                value={finishDate}
                onChange={(e) => setFinishDate(e.target.value)}
                className="bg-preto-100 text-branco-100 mt-1 w-full rounded-md p-2"
              />
            </div>
            <button
              className="bg-roxo-100 text-branco-100 w-full rounded px-4 py-2"
              onClick={() => handleEditStatus("dates")}
            >
              Salvar datas
            </button>
          </div>
        </div>
      )}

      {/* Modal Histórico de leitura */}
      {modalHistorico && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70">
          <div className="bg-branco-100 text-preto-100 min-w-[300px] rounded-xl p-8 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Histórico de leitura</h3>
              <button onClick={showModalHistorico}>
                <IoClose className="text-preto-100 text-lg" />
              </button>
            </div>
            <input
              type="number"
              placeholder="Digite a última página lida"
              value={lastPage}
              onChange={(e) => setLastPage(e.target.value)}
              className="bg-preto-100 text-branco-100 mt-1 w-full rounded-md p-2"
            />
            <button
              className="bg-roxo-100 text-branco-100 w-full rounded px-4 py-2"
              onClick={() => handleEditStatus("lastPage")}
            >
              Salvar página
            </button>
          </div>
        </div>
      )}
    </>
  );
}
