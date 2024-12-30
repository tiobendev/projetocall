'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LandingPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutos

  useEffect(() => {
    let timer;
    if (isCallActive) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCallActive]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartCall = () => {
    setIsPopupOpen(false);
    setIsCallActive(true);
    window.open('https://meet.google.com/', '_blank'); // Link da reunião
  };

  return (
    <div className="bg-zinc-950 flex items-center justify-center min-h-screen text-white">
      <div className="container text-center max-w-md px-8 py-12 bg-zinc-900 rounded-3xl shadow-2xl">
        <Image
          src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Profile"
          width={96} // Definindo a largura
          height={96} // Definindo a altura
          className="profile-img mx-auto rounded-full object-cover mb-6"
        />
        <h1 className="text-5xl font-extrabold mb-6 text-zinc-50">Nome do Cliente</h1>
        <p className="text-xl text-zinc-200 mb-8">
          Soluções perfeitas para otimizar seu tráfego pago e transformar resultados em oportunidades reais.
        </p>
        {!isCallActive && (
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-8 py-4 rounded-full text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:shadow-xl transition-all duration-200"
          >
            Falar com o Gestor no Google Meet
          </button>
        )}
        {isCallActive && (
          <p className="countdown text-lg text-white font-medium">
            O gestor está em call. Você poderá entrar em contato com ele na próxima reunião!<br />
            Tempo restante: <span>{formatTime(timeRemaining)}</span>
          </p>
        )}
      </div>

      {isPopupOpen && (
        <div className="popup-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="popup bg-zinc-900 p-8 rounded-2xl text-center shadow-lg">
            <h2 className="text-2xl font-bold text-zinc-100">Sua Call está pronta!</h2>
            <p className="text-zinc-400 mt-4">Clique no botão abaixo para entrar na reunião.</p>
            <button
              onClick={handleStartCall}
              className="px-6 py-3 mt-4 rounded-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-300"
            >
              Entrar na reunião
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
