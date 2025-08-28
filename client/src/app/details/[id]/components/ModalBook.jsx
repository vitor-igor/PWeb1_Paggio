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

const bookshelfs = ["TheBest", "Lido", "Lendo", "Quero ler", "Relendo", "Abandonei"];

export default function ModalBook({ book_id }) {
  const [modalAdicionarStatus, setModalAdicionarStatus] = useState(false);
  const [modalEditarStatus, setModalEditarStatus] = useState(false);
  const [status, setStatus] = useState("");

  const [modalAvaliar, setModalAvaliar] = useState(false);
  const [modalHistorico, setModalHistorico] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const showModalAdicionarStatus = () => {
    modalAdicionarStatus
      ? setModalAdicionarStatus(false)
      : setModalAdicionarStatus(true);
  };

  const showModalEditarStatus = () => {
    modalEditarStatus
      ? setModalEditarStatus(false)
      : setModalEditarStatus(true);
  };

  const showModalAvaliar = () => setModalAvaliar((prev) => !prev);
  const showModalHistorico = () => setModalHistorico((prev) => !prev);
  const showModalData = () => setModalData((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `http://127.0.0.1:5000/api/books/status_book?status_book=${status}&book_id=${book_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    showModalAdicionarStatus();
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

      {modalAdicionarStatus == true && (
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

            {bookshelfs.map((data) => (
              <div key={bookshelfs.indexOf(data)} className="flex gap-2">
                <input
                  type="radio"
                  name="bookshelf"
                  value={data}
                  className="accent-roxo-100"
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label>{data}</label>
              </div>
            ))}

            <button
              className="bg-roxo-100 z-10 mt-5 flex w-full cursor-pointer items-center justify-center rounded-2xl p-2"
              onClick={handleSubmit}
            >
              <p>Enviar</p>
            </button>
          </div>
        </div>
      )}

      {modalEditarStatus == true && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
          <div className="bg-preto-100 text-branco-100 w-auto rounded-xl p-10 shadow-lg">
            <div className="flex justify-between">
              <h2 className="pb-4 text-2xl font-bold">Editar à estante:</h2>
              <div className="items-center justify-center justify-items-center">
                <button
                  className="bg-roxo-100 cursor-pointer rounded-full p-2"
                  onClick={showModalEditarStatus}
                >
                  <IoClose className="text-branco-100 text-sm" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 justify-items-center gap-3">
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
                Data
              </button>

              <button
                className="tempo bg-branco-100/10 flex h-20 w-full cursor-pointer items-center justify-center gap-2 rounded-md p-4"
                onClick={showModalHistorico}
              >
                <TfiTimer />
                Histórico de leitura
              </button>

              <Link href={`/reviews/${book_id}`} className="w-full">
                <div className="resenha bg-branco-100/10 flex h-20 w-full items-center justify-center gap-2 rounded-md p-4">
                  <CgFileDocument />
                  Escrever resenha
                </div>
              </Link>
            </div>
            <button
              className="bg-roxo-100 z-10 mt-5 flex w-full cursor-pointer items-center justify-center rounded-2xl p-2"
              onClick={handleSubmit}
            >
              <p>Enviar</p>
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
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
            <button
              className="bg-roxo-100 text-branco-100 w-full rounded px-4 py-2"
              onClick={showModalAvaliar}
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
              <h3 className="text-xl font-bold">Editar data</h3>
              <button onClick={showModalData}>
                <IoClose className="text-preto-100 text-lg" />
              </button>
            </div>
            <input
              type="date"
              className="mb-4 w-full rounded border px-2 py-1"
            />
            <button
              className="bg-roxo-100 text-branco-100 w-full rounded px-4 py-2"
              onClick={showModalData}
            >
              Salvar data
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
              className="mb-4 w-full rounded border px-2 py-1"
            />
            <button
              className="bg-roxo-100 text-branco-100 w-full rounded px-4 py-2"
              onClick={showModalHistorico}
            >
              Salvar página
            </button>
          </div>
        </div>
      )}
    </>
  );
}