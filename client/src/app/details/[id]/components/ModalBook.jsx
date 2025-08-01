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

const bookshelfs = ["Lido", "Lendo", "Quero ler", "Relendo", "Abandonei"];

export default function ModalBook({ book_id }) {
  const [modalAdicionarStatus, setModalAdicionarStatus] = useState(false);
  const [modalEditarStatus, setModalEditarStatus] = useState(false);
  const [status, setStatus] = useState("");

  const showModalAdicionarStatus = () => {
    {
      modalAdicionarStatus
        ? setModalAdicionarStatus(false)
        : setModalAdicionarStatus(true);
    }
  };

  const showModalEditarStatus = () => {
    {
      modalEditarStatus
        ? setModalEditarStatus(false)
        : setModalEditarStatus(true);
    }
  };

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
          <div className="bg-preto-100 text-branco-100 w-md rounded-xl p-10 shadow-lg">
            <div className="flex justify-between">
              <h2 className="pb-4 text-2xl font-bold">Adicionar à estante:</h2>
              <div className="items-center justify-center">
                <button
                  className="bg-roxo-100 cursor-pointer rounded-full p-2"
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
          <div className="bg-preto-100 text-branco-100 w-xl rounded-xl p-10 shadow-lg">
            <div className="flex justify-between">
              <h2 className="pb-4 text-2xl font-bold">Editar à estante:</h2>
              <div className="items-center justify-center">
                <button
                  className="bg-roxo-100 cursor-pointer rounded-full p-2"
                  onClick={showModalEditarStatus}
                >
                  <IoClose className="text-branco-100 text-sm" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-between gap-y-3">
              <div className="status bg-branco-100/10 flex h-20 w-60 items-center justify-items-center gap-2 rounded-md p-4">
                <FaBookmark />
                Status
              </div>

              <div className="avaliacao bg-branco-100/10 flex h-20 w-60 items-center justify-items-center gap-2 rounded-md p-4">
                <TiStarFullOutline />
                <TiStarOutline />
                <TiStarHalfOutline />
                Avaliar
              </div>

              <div className="data bg-branco-100/10 flex h-20 w-60 items-center justify-items-center gap-2 rounded-md p-4">
                <HiOutlineCalendarDateRange />
                28/07/2025
              </div>

              <div className="tempo bg-branco-100/10 flex h-20 w-60 items-center justify-items-center gap-2 rounded-md p-4">
                <LiaHourglassHalfSolid />
                Tempo de leitura
              </div>

              <div className="resenha bg-branco-100/10 flex h-20 w-60 items-center justify-items-center gap-2 rounded-md p-4">
                <CgFileDocument />
                Escrever resenha
              </div>

              <div className="historico bg-branco-100/10 flex h-20 w-60 items-center justify-items-center gap-2 rounded-md p-4">
                <TfiTimer />
                Histórico de leitura
              </div>
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
    </>
  );
}
