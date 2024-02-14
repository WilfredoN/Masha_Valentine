import { useRef, useEffect, useState, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Fireworks } from 'fireworks-js';
import { Inter } from "next/font/google";
import img from "../images/1.jpg";
import img2 from "../images/2.jpg";
import img3 from "../images/3.jpg";
import img4 from "../images/4.jpg";
import img5 from "../images/5.jpg";
import img6 from "../images/6.jpg";
import img7 from "../images/7.jpg";
import img8 from "../images/8.jpg";
import img9 from "../images/9.jpg";
import img10 from "../images/10.jpg";
import img11 from "../images/11.jpg";
import img12 from "../images/12.jpg";
import { animate } from 'framer-motion';
//import img13 from "../images/13.jpg";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const buttonRef = useRef(null);
  const heartContainerRef = useRef(null);
  const [buttonStyles, setButtonStyles] = useState<{ left: number | null, top: number | null, position: string, transform: string }>({ left: 0, top: 0, position: 'absolute', transform: 'scale(1)' });
  const [showImages, setShowImages] = useState(false);
  const [confirmed, setConfirmed] = useState(false);


  useEffect(() => {
    setButtonStyles({ left: 0, top: 0, position: 'relative', transform: 'scale(1)' });
  }, []);
  const phrasesNot = ["А ты не ахуела?", "Че ещё скажешь?", "Короче рево", "Маме так скажешь", "Всё сказала?", "Бебебе", "Бабаба", "Расскажешь", "Ты чё.", "Мда.", "Пон", "Ок", "Не придумуй",
    "Какашка."]
  const handleNoButtonClick = useCallback(() => {
    setButtonStyles((prevStyles) => {
      const newScale = parseFloat(prevStyles.transform.slice(6, -1)) - 0.05;
      const textToChange = document.querySelector('.text_to_change');
      textToChange!.textContent = `${phrasesNot[Math.floor(Math.random() * phrasesNot.length)]}`;
      return {
        ...prevStyles,
        transform: `scale(${newScale})`,
        left: Math.random() * window.innerWidth / 2,
        top: Math.random() * window.innerHeight / 2,
        position: 'fixed',
      };
    });
  }, []);
  const handleYesButtonClick = useCallback(() => {
    if (!confirmed) {
      const textToChange = document.querySelector('.text_to_change');
      textToChange!.textContent = "Точно?";
      setConfirmed(true);
    } else {
      setShowImages(true);
    }
  }, [confirmed]);

  const HeartAnimation = useCallback(() => {
    return (
      <div className="hearts" style={{ width: '100vw', height: '100vh', position: 'absolute', overflow: 'hidden', top: '0', left: '0', pointerEvents: 'none' }}>
        <div ref={heartContainerRef} className="heart-animation" style={{
          position: 'fixed',
          top: 0, left: 0,
          fontSize: '50px', zIndex: -1, pointerEvents: 'none',
          opacity: '0.1', overflow: 'hidden', animation: 'moveRight 250s linear infinite',
        }
        }>
          {
            Array.from({ length: 700 }, (_, index) => <span key={index} className="heart">❤️</span>)
          }
        </div >
      </div>
    );
  }, []);
  async function startFirework() {
    const container = document.querySelector('.container') as HTMLElement;
    const fireworks = new Fireworks(container, {
      autoresize: false,
      opacity: 0.3,
      acceleration: 1.05,
      friction: 0.97,
      gravity: 1.5,
      particles: 40,
      traceLength: 3,
      traceSpeed: 10,
      explosion: 5,
      intensity: 60,
      flickering: 50,
      lineStyle: 'round',
      hue: {
        min: 0,
        max: 360
      },
      delay: {
        min: 30,
        max: 60
      },
      rocketsPoint: {
        min: 50,
        max: 50
      },
      lineWidth: {
        explosion: {
          min: 1,
          max: 3
        },
        trace: {
          min: 1,
          max: 2
        }
      },
      brightness: {
        min: 50,
        max: 80
      },
      decay: {
        min: 0.015,
        max: 0.03
      },
      mouse: {
        click: false,
        move: false,
        max: 1
      }
    })
    fireworks.start();
    await new Promise((resolve) => setTimeout(resolve, 10000));
    await fireworks.stop();
  }

  const images = [img, img2, img5, img4, img9, img8, img7, img3, img6, img10, img11, img12]


  const displayImages = useCallback(() => {
    if (showImages) {
      const textToChange = document.querySelector('.text_to_change') as HTMLElement;
      textToChange!.textContent = "УРА!";
      setInterval(() => {
        textToChange!.textContent = 'Я люблю тебя!';
      }, 3000);
      const buttonToDelete = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;

      buttonToDelete.forEach((button) => {
        button.style.animation = 'hideButtons 1s ease-in-out forwards';
      });

      startFirework();

      return (
        <div>
          <section className={`grid grid-cols-3 gap-4 mt-8 auto-cols-auto`}>
            {images.map((image, index) => (
              <img
                key={index} src={image.src}
                className={`w-full h-auto rounded-3xl ${showImages ? 'show' : ''}`} />
            ))}
          </section>
          <section className='flex flex-col items-center justify-center'>
            <h1 className='text-6xl font-bold text-center mt-36 mb-12'>Я очень рад, что ты есть у меня ❤️</h1>
          </section>
        </div>
      );
    } else {
      return null;
    }
  }, [showImages]);




  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-12 ${inter.className}`} style={{ position: 'relative' }}>
      <div className="container" style={{ position: "absolute", zIndex: '100', left: '0', top: '0', width: '100%', height: '100%;', pointerEvents: 'none' }} />

      <HeartAnimation />
      <section className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-center">Гончарова Мария</h1>
        <p className="text_to_change text-4xl text-center m-4">Будете ли вы моей валентинкой?</p>
        <div className="flex flex-row items-center justify-center">
          <button className="border-solid border-4 border-blue-500 hover:bg-blue-500 transition-colors duration-500 text-white font-bold py-2 px-8 rounded-full text-6xl"
            onClick={handleYesButtonClick}>Да</button>


          <button ref={buttonRef} className="ml-5 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded" onClick={handleNoButtonClick} style={buttonStyles as React.CSSProperties}>Нет</button>
        </div>
      </section>
      {
        displayImages()
      }
    </main>

  );
}
