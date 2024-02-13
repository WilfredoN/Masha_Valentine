import { useRef, useEffect, useState } from 'react';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const buttonRef = useRef(null);
  //TODO: сделать кнопку меньше на n%
  const [buttonStyles, setButtonStyles] = useState<{ left: number | null, top: number | null, position: string }>({ left: 0, top: 0, position: 'absolute' });

  useEffect(() => {
    setButtonStyles({ left: 0, top: 0, position: 'relative' });
  }, []);

  const fillHeartAnimation = (count: number): any => {
    return Array.from({ length: count }, (_, index) => <span key={index} className="heart">❤️</span>);
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      style={{ position: 'relative' }}>
      <div
        className="heart-animation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: 'rotate(45deg) scale(2)',
          fontSize: '50px',
          zIndex: -1,
          pointerEvents: 'none',
          opacity: '0.1',
          overflow: 'hidden'
        }}
      >
        {fillHeartAnimation(500)}
      </div>
      <section className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-center">
          Гончарова Мария
        </h1>
        <p className="text-xl text-center m-4">
          Будете моей валентинкой?)
        </p>
        <div className="flex flex-row items-center justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 transition-colors duration-500 text-white font-bold py-4 px-8 rounded-full text-6xl">
            Да
          </button>
          <button
            ref={buttonRef}
            className="ml-5 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded"
            onMouseEnter={() => setButtonStyles({
              left: Math.random() * window.innerWidth / 2,
              top: Math.random() * window.innerHeight / 2,
              position: 'fixed'
            })}
            style={buttonStyles as React.CSSProperties}>
            Нет
          </button>
        </div>
      </section>
    </main>
  );
}
