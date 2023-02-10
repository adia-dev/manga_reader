import React, { useEffect, useState } from "react";
import { BiChevronDown, BiChevronRight, BiChevronUp } from "react-icons/bi";

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [startMouseY, setStartMouseY] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [mangas, setMangas] = useState([
    {
      id: 1,
      title: "Jujutsu Kaisen",
      image: "https://images5.alphacoders.com/114/1141137.jpg",
      page_count: 18,
      chapter: 1,
    },
    {
      id: 2,
      title: "One Piece",
      image:
        "https://preview.redd.it/cujgnglafov81.png?width=640&crop=smart&auto=webp&s=bff4be0d66177d9fd3a8d75a8a02a21f00cfb950",
      page_count: 17,
      chapter: 1017,
    },
    {
      id: 3,
      title: "Bleach",
      image:
        "https://c4.wallpaperflare.com/wallpaper/109/45/304/bleach-thousand-year-blood-war-arc-tite-kubo-gotei-13-4k-hd-wallpaper-preview.jpg",
      page_count: 16,
      chapter: 684,
    },
    {
      id: 4,
      title: "Hell's Paradise: Jigokuraku",
      image: "https://animeland.fr/wp-content/uploads/2021/01/hellp.jpg",
      page_count: 15,
      chapter: 56,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isDragging) return;
      setCurrent((current) => {
        if (current === mangas.length - 1) {
          return 0;
        } else {
          return current + 1;
        }
      });
    }, 5000);

    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        setCurrent(Math.max(current - 1, 0));
      } else if (e.key === "ArrowDown") {
        setCurrent(Math.min(current + 1, mangas.length - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mangas, current, isDragging]);

  const SCROLL_TRESHOLD = 150;

  const MouseDelta = () => mouseY - startMouseY;
  const AbsMouseDelta = () => Math.abs(MouseDelta());

  function minmax(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  // vertical carousel
  const OnMouseDown = (e) => {
    setIsDragging(true);
    setStartMouseY(e.clientY);
    setMouseY(e.clientY);
  };

  const OnMouseMove = (e) => {
    if (!isDragging) return;

    setMouseY(e.clientY);
  };

  const OnMouseUpOrLeave = (e) => {
    if (!isDragging) return;

    setIsDragging(false);
    setMouseY(e.clientY);
    setStartMouseY(e.clientY);

    if (mouseY - startMouseY > SCROLL_TRESHOLD) {
      setCurrent(Math.max(current - 1, 0));
    } else if (mouseY - startMouseY < -SCROLL_TRESHOLD) {
      setCurrent(Math.min(current + 1, mangas.length - 1));
    }
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden bg-gray-900 text-white"
      id="carousel"
    >
      <div className="w-screen h-screen overflow-hidden flex flex-col p-10 items-center justify-center absolute top-0 left-0 z-10 pointer-events-none">
        {current > 0 && (
          <div
            className="flex flex-col items-center absolute top-0 transition delay-200 ease-out duration-1000"
            style={{
              transform: `translateY(${
                isDragging ? 100 : -200
              }%) scale(${minmax(MouseDelta() / 100, 0.8, 1)})`,
              color: MouseDelta() > SCROLL_TRESHOLD ? "green" : "white",
            }}
          >
            <div className="flex flex-col items-center animate-bounce">
              <BiChevronUp className="text-5xl" />
              <p>{mangas[current - 1].title}</p>
            </div>
          </div>
        )}
        {current < mangas.length - 1 && (
          <div
            className="absolute bottom-0 transition delay-200 ease-out duration-1000"
            style={{
              transform: `translateY(${isDragging ? -100 : 200}%) scale(${
                MouseDelta() ? 0.8 : minmax(MouseDelta() / 100, 0.8, 1)
              })`,
              color: MouseDelta() < -SCROLL_TRESHOLD ? "green" : "white",
            }}
          >
            <div className="flex flex-col items-center animate-bounce">
              <p>{mangas[current + 1].title}</p>
              <BiChevronDown className="text-5xl" />
            </div>
          </div>
        )}
        {mangas[current].page_count > 1 && (
          <div
            className="flex items-center justify-center absolute right-0 mb-10 mr-1 transition delay-200 ease-out duration-1000"
            style={{
              transform: `translateX(${isDragging ? 0 : 200}%)`,
              color: MouseDelta() < -SCROLL_TRESHOLD ? "green" : "white",
            }}
          >
            <p className="text-xs mr-2">{mangas[current].page_count} pages</p>
            <BiChevronRight className="text-2xl" />
          </div>
        )}
      </div>
      {mangas.map((manga, index) => {
        return (
          <div
            className="flex flex-col items-center justify-center h-full relative transition duration-500 delay-100 ease-in-out transform cursor-pointer group"
            onMouseDown={OnMouseDown}
            onMouseMove={OnMouseMove}
            onMouseUp={OnMouseUpOrLeave}
            onMouseLeave={OnMouseUpOrLeave}
            style={{
              transform: `${
                isDragging
                  ? `translateY(math(${current * -100}%) + ${MouseDelta()}px)`
                  : `translateY(${current * -100}%)`
              }`,
              filter: `blur(${minmax(
                AbsMouseDelta() / 50,
                0,
                10
              )}px) brightness(${1 - minmax(AbsMouseDelta() / 1000, 0, 0.5)})`,
            }}
            key={manga.id}
          >
            <img
              src={manga.image}
              alt="manga"
              className="w-full h-full brightness-95 object-cover absolute top-0 left-0 z-0 group-active:brightness-50 rounded-3xl scale-105 group-active:scale-90 transition duration-500 ease-in-out delay-100"
              style={{
                opacity: index === current ? 1 : 0,
              }}
              draggable="false"
            />
            {/* 
                an other image on the background that is scaled up and blurred 
            */}

            <img
              src={manga.image}
              alt="manga"
              className="w-full h-full brightness-95 object-cover absolute overflow-hidden top-0 left-0 -z-10 blur-3xl scale-150 transition duration-500 ease-in-out delay-100"
              style={{
                opacity: index === current ? 1 : 0,
              }}
              draggable="false"
            />

            <div className="flex flex-col items-center justify-center h-full z-10 not-selectable">
              <h1 className="text-5xl font-bold">{manga.title}</h1>
              <p className="text-gray-100">Chapter: {manga.chapter}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
