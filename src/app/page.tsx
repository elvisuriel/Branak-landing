"use client";

import type { NextPage } from 'next';
import Image from "next/image";
import { useState, FormEvent, ChangeEvent, useEffect, useRef } from "react";


interface FormData {
  name: string;
  email: string;
}

const Home: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const errorRef = useRef<HTMLDivElement | null>(null);
  const bgColor = "#05caff";
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    setErrorMessage(""); // Limpiar mensaje de error previo

    try {
      const response = await fetch("https://back.app.esturio.com/api/usersLanding/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.href =
          "https://www.branak.com/take-exam/2d1075d2-3bdc-46c7-b794-c8e232ae630f";
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Ocurrió un error al enviar el formulario.");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Ocurrió un error desconocido."
      );
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (errorRef.current && !errorRef.current.contains(event.target as Node)) {
        setErrorMessage(""); // Cerrar el mensaje de error
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <main className="min-h-screen text-black ">
      {/* Hero Section */}
      <header style={{ backgroundColor: bgColor }} className=" p-4 md:p-0 flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 text-center">
          <div className="">
            <Image
              src="https://res.cloudinary.com/dybws2ubw/image/upload/v1736951086/branak_f84wfa.png"
              alt="Tablet con prueba"
              width={30}
              height={45}
              priority
              className="mx-2 -mt-14"
            />
          </div>
          <h1 className="flex justify-center items-center text-4xl md:text-5xl mb-4 font-semibold">Evalúa tu nivel de Inglés</h1>
          <p className="flex justify-center items-center text-lg mb-6">
            Evalúa y conversa sobre tu caso directo y en vivo con un experto en lingüística.
          </p>
          {errorMessage && (
            <div
              ref={errorRef}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <p className="text-red-600 text-lg font-semibold">{errorMessage}</p>
                <button
                  onClick={() => setErrorMessage("")}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
          <div className="flex justify-center items-center mt-4 md:mt-14">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
              <div className="flex flex-row gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="p-2   border rounded-md focus:outline-none w-full md:w-[300px]"
                  required
                  aria-label="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="p-2 border   rounded-md focus:outline-none w-full md:w-[300px]"
                  required
                  aria-label="Email"
                />
              </div>
              <button
                type="submit"
                className="bg-[#fff200] text-black font-bold py-2 px-10 rounded-2xl hover:bg-yellow-200 transition-colors"
              >
                Tomar examen
              </button>
            </form>
          </div>
          <p className="flex justify-center items-center text-sm font-semibold mt-4">
            Resultado inmediato y confidencial
          </p>
          {/* Descripción adicional */}
          <div className="text-center mt-4 md:mt-36 px-4">
            <p className="text-lg font-medium">
              Más de 5000 personas han tomado este examen antes de una entrevista importante.
            </p>
          </div>
        </div>
        <div className="flex-1 mt-0">
          {/* Envolver la imagen en un botón que llama al mismo `handleSubmit` */}
          <form onSubmit={handleSubmit} className="flex justify-center items-center">
            <button
              type="submit"
              className="flex"
              aria-label="Tomar examen con la imagen"
            >
              <Image
                src="https://res.cloudinary.com/dybws2ubw/image/upload/v1737163802/TEST_gl84i0.gif"
                alt="Tablet con prueba"
                width={800}
                height={550}
                priority
                className="rounded-lg"
              />
            </button>
          </form>
          <div className="flex justify-center items-center text-2xl font-semibold  md:mb-2 md:-mt-4">
            Prueba tu nivel
          </div>
        </div>
      </header>

      {/* Beneficios */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-0 md:mt-10 px-20">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 flex items-center justify-center mb-4">
            <Image
              src="https://res.cloudinary.com/dybws2ubw/image/upload/v1737150654/interview_icon_1_nja3ci.svg"
              alt="Tablet con prueba"
              width={140}
              height={140}
              className="mx-2"
            />
          </div>
          <p className=' text-lg'>
            Obtén una clase de prueba gratis si consigues 60 puntos o más en el examen.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 flex items-center justify-center mb-4">
            <Image
              src="https://res.cloudinary.com/dybws2ubw/image/upload/v1737150763/interview_icon_2_j2hdjz.svg"
              alt="Tablet con prueba"
              width={120}
              height={120}
              className="mx-2"
            />
          </div>
          <p className=' text-lg'>Identifica qué tan preparado estás para el ambiente laboral.</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 flex items-center justify-center mb-4">
            <Image
              src="https://res.cloudinary.com/dybws2ubw/image/upload/v1737150741/test_icon_ok2qc6.svg"
              alt="Tablet con prueba"
              width={90}
              height={90}
              className="mx-2"
            />
          </div>
          <p className=' text-lg'>
            Recibe un feedback inmediato y sugerencias específicas para mejorar tu inglés (todo sin compromiso).
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;