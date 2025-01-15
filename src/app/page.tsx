"use client";

import type { NextPage } from 'next';
import Image from "next/image";
import { useState, FormEvent, ChangeEvent } from "react";

interface FormData {
  name: string;
  email: string;
}

const Home: NextPage = () => {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:4005/api/usersLanding/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        window.location.href = "https://www.branak.com/take-exam/2d1075d2-3bdc-46c7-b794-c8e232ae630f";
      } else {
        const errorData = await response.json();
        console.error('Error submitting form:', errorData);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  };

  return (
    <main className="min-h-screen text-black">
      {/* Hero Section */}
      <header style={{ backgroundColor: bgColor }} className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 text-center">
          <div className="">
            <Image
              src="https://res.cloudinary.com/dybws2ubw/image/upload/v1736951086/branak_f84wfa.png"
              alt="Tablet con prueba"
              width={30}
              height={45}
              priority
              className="mx-2"
            />
          </div>
          <h1 className="flex justify-center items-center text-4xl md:text-5xl mb-4">Evalúa tu nivel de Inglés</h1>
          <p className="flex justify-center items-center text-lg mb-6">
            Evalúa y conversa sobre tu caso directo y en vivo con un experto en lingüística.
          </p>
          <div className="flex justify-center items-center mt-14">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="p-2 px-0 md:px-10 border rounded-md focus:outline-none w-full md:w-auto"
                required
                aria-label="Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="p-2 border px-4 md:px-10 rounded-md focus:outline-none w-full md:w-auto"
                required
                aria-label="Email"
              />
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
        
        <div className="flex-1 mt-8 md:mt-0">
          <div className="flex justify-center items-center">
            <Image
              src="https://res.cloudinary.com/dybws2ubw/image/upload/v1736786553/A%C3%B1adir_un_t%C3%ADtulo_1_elqwqi.gif"
              alt="Tablet con prueba"
              width={800}
              height={550}
              priority
              className="rounded-lg"
            />
          </div>

          <div className="flex justify-center items-center text-2xl font-semibold mb-2 -mt-4">
            Prueba tu nivel
          </div>
        </div>
      </header>

      {/* Beneficios */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-0 md:mt-10 px-20">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 flex items-center justify-center mb-4">
            <Image
              src="https://res.cloudinary.com/dybws2ubw/image/upload/v1736951579/ico_1_g8xvuc.jpg"
              alt="Tablet con prueba"
              width={100}
              height={100}
              className="mx-2"
            />
          </div>
          <p>
            Obtén una clase de prueba gratis si consigues 60 puntos o más en el examen.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 flex items-center justify-center mb-4">
            <Image
              src="https://res.cloudinary.com/dybws2ubw/image/upload/v1736951569/ico_2_bppjer.jpg"
              alt="Tablet con prueba"
              width={100}
              height={100}
              className="mx-2"
            />
          </div>
          <p>Identifica qué tan preparado estás para el ambiente laboral.</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 flex items-center justify-center mb-4">
            <Image
              src="https://res.cloudinary.com/dybws2ubw/image/upload/v1736951543/ico_3_rz8pzg.jpg"
              alt="Tablet con prueba"
              width={80}
              height={80}
              className="mx-2"
            />
          </div>
          <p>
            Recibe un feedback inmediato y sugerencias específicas para mejorar tu inglés (todo sin compromiso).
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;