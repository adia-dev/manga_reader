import React, { useEffect, useState } from "react";
import { BiChevronDown, BiChevronRight, BiChevronUp } from "react-icons/bi";
import { BsArrowDownShort, BsArrowLeftShort, BsArrowRightShort, BsArrowUpShort, BsFillMouseFill, BsSearch } from "react-icons/bs";
import { FiCommand } from "react-icons/fi";
import mangas from "../data/mangas.json";

const Carousel = ({ setSearchBarOpened }) => {
  const [current, setCurrent] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [startMouseY, setStartMouseY] = useState(0);
  const [startMouseX, setStartMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  // const [mangas, setMangas] = useState(mangas);
  const [canPlayTrailer, setCanPlayTrailer] = useState(false);
  const [canPlayTrailerTimeout, setCanPlayTrailerTimeout] = useState(null);

  // load manga videos with require

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

      if (e.key === "ArrowLeft") {
        if (currentPage === 0) {
          setSearchBarOpened(true);
        } else {
          setCurrentPage(Math.max(currentPage - 1, 0));
        }
      } else if (e.key === "ArrowRight") {
        setCurrentPage(
          Math.min(currentPage + 1, mangas[current].page_count - 1)
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mangas, current, isDragging, currentPage, setSearchBarOpened]);

  const SCROLL_TRESHOLD = 150;

  const MouseDeltaY = () => mouseY - startMouseY;
  // const MouseDeltaX = () => mouseX - startMouseX;

  const AbsMouseDeltaY = () => Math.abs(MouseDeltaY());
  // const AbsMouseDeltaX = () => Math.abs(MouseDeltaX());

  function minmax(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  // vertical carousel
  const OnMouseDown = (e) => {
    setIsDragging(true);
    setStartMouseY(e.clientY);
    setStartMouseX(e.clientX);
    setMouseY(e.clientY);
    setMouseX(e.clientX);

    if (canPlayTrailerTimeout) {
      clearTimeout(canPlayTrailerTimeout);
      setCanPlayTrailerTimeout(null);
      setCanPlayTrailer(false);
    }

    // add the class grabbing to the body
    e.target.classList.add("grabbing");

    setCanPlayTrailerTimeout(
      setTimeout(() => {
        setCanPlayTrailer(true);
      }, 1500)
    );
  };

  const OnMouseMove = (e) => {
    if (!isDragging) return;

    setMouseY(e.clientY);
    setMouseX(e.clientX);
  };

  const OnMouseUpOrLeave = (e) => {
    if (!isDragging) return;

    setIsDragging(false);
    setMouseY(e.clientY);
    setMouseX(e.clientX);
    setStartMouseY(e.clientY);
    setStartMouseX(e.clientX);

    // remove the class grabbing to the body
    e.target.classList.remove("grabbing");

    if (canPlayTrailerTimeout) {
      clearTimeout(canPlayTrailerTimeout);
    }
    setCanPlayTrailerTimeout(null);
    setCanPlayTrailer(false);

    if (mouseY - startMouseY > SCROLL_TRESHOLD) {
      setCurrent(Math.max(current - 1, 0));
      return;
    } else if (mouseY - startMouseY < -SCROLL_TRESHOLD) {
      setCurrent(Math.min(current + 1, mangas.length - 1));
      return;
    }

    if (mouseX - startMouseX > SCROLL_TRESHOLD) {
      if (currentPage === 0) {
        setSearchBarOpened(true);
        return;
      }
      setCurrentPage(Math.max(currentPage - 1, 0));
      return;
    } else if (mouseX - startMouseX < -SCROLL_TRESHOLD) {
      setCurrentPage(Math.min(currentPage + 1, mangas[current].page_count - 1));
      return;
    }
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden bg-gray-900 text-white"
      id="carousel"
      data-testid="carousel"
    >
      <div className="w-screen h-screen overflow-hidden flex flex-col p-10 items-center justify-center absolute top-0 left-0 z-10 pointer-events-none">
        <div className="absolute w-full top-0 left-0 flex justify-between px-6 py-14 transition duration-1000 delay-300 ease-in-out"
          style={{
            transform: `scale(${isDragging ? 0.9 : 1.5}, 1)`,
          }}
        >
          <div className="flex flex-col items-center space-y-2">
            <BsFillMouseFill className="text-2xl" />
            <div className="flex flex-col items-center text-black">
              <div className="w-6 h-6 rounded-md border bg-gray-200 grid place-items-center m-1">
                <BsArrowUpShort className="" />
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-md border bg-gray-200 grid place-items-center m-1">
                  <BsArrowLeftShort className="" />
                </div>
                <div className="w-6 h-6 rounded-md border bg-gray-200 grid place-items-center m-1">
                  <BsArrowDownShort className="" />
                </div>
                <div className="w-6 h-6 rounded-md border bg-gray-200 grid place-items-center m-1">
                  <BsArrowRightShort className="" />
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-300">Mouse and Keyboard support</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-700 border border-gray-600 border-opacity-30 px-3 py-2 rounded-xl bg-opacity-30">
              <BsSearch className="" />
              <p className="text-xs text-gray-300">Quick Search</p>
              <div className="flex items-center text-xs space-x-1">
                {/* if on mac FiCommand, else Ctrl */}
                {
                  navigator.platform.indexOf("Mac") > -1 ? (
                    <FiCommand className="" />
                  ) : (
                    <span className="lowercase">Ctrl</span>
                  )
                }
                <span>+</span>
                <span>K</span>
              </div>
            </div>
            <p className="text-xs text-gray-300">
              {currentPage + 1}/{mangas[current].page_count}
            </p>
          </div>
        </div>
        {current > 0 && (
          <div
            className="flex flex-col items-center absolute top-0 transition delay-200 ease-out duration-1000"
            style={{
              transform: `translateY(${isDragging ? 100 : -200
                }%) scale(${minmax(MouseDeltaY() / 100, 0.8, 1)})`,
              color: MouseDeltaY() > SCROLL_TRESHOLD ? "green" : "white",
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
              transform: `translateY(${isDragging ? -100 : 200}%) scale(${MouseDeltaY() ? 0.8 : minmax(MouseDeltaY() / 100, 0.8, 1)
                })`,
              color: MouseDeltaY() < -SCROLL_TRESHOLD ? "green" : "white",
            }}
          >
            <div className="flex flex-col items-center animate-bounce">
              <p>{mangas[current + 1].title}</p>
              <BiChevronDown className="text-5xl" />
            </div>
          </div>
        )}
        {currentPage === 0 && (
          <div
            className="flex items-center justify-center absolute left-0 mb-10 mr-1 transition delay-200 ease-out duration-1000"
            style={{
              transform: `translateX(${isDragging ? 100 : -200}%)`,
              color: MouseDeltaY() < -SCROLL_TRESHOLD ? "green" : "white",
            }}
          >
            <BsSearch className="text-2xl" />
            <p className="text-xs mr-2">Quick Search</p>
          </div>
        )}
        {mangas[current].page_count > 1 && (
          <div
            className="flex items-center justify-center absolute right-0 mb-10 mr-1 transition delay-200 ease-out duration-1000"
            style={{
              transform: `translateX(${isDragging ? -100 : 200}%)`,
              color: MouseDeltaY() < -SCROLL_TRESHOLD ? "green" : "white",
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
            className="flex flex-col overflow-hidden items-center justify-center h-full relative transition duration-500 delay-100 ease-in-out transform cursor-pointer group"
            onMouseDown={OnMouseDown}
            onMouseMove={OnMouseMove}
            onMouseUp={OnMouseUpOrLeave}
            onMouseLeave={OnMouseUpOrLeave}
            style={{
              transform: `${isDragging
                ? `translate(
                    ${currentPage * -100}%, 
                    math(${current * -100}%) + ${MouseDeltaY()}px)`
                : `translate(
                    ${currentPage * -100}%,
                    ${current * -100}%)`
                }`,
              filter: `blur(${minmax(
                AbsMouseDeltaY() / 50,
                0,
                10
              )}px) brightness(${1 - minmax(AbsMouseDeltaY() / 1000, 0, 0.5)})`,
            }}
            key={manga.id}
            data-testid="carousel-item"
          >
            <div className="w-full h-full overflow-hidden absolute top-0 left-0 z-0  rounded-3xl scale-105 cursor-pointer group-active:scale-90 transition duration-500 ease-in-out delay-100">
              <div className="absolute flex items-center justify-center w-full h-full ">
                <img
                  src={manga.image}
                  alt="manga"
                  className="w-full h-full brightness-75 group-active:brightness-50 transition-all object-cover "
                  style={{
                    opacity: index === current ? 1 : 0,
                  }}
                  draggable="false"
                />
                <div className="flex flex-col items-center justify-center h-full z-10 not-selectable absolute">
                  <h1 className="text-5xl font-bold">{manga.title}</h1>
                  <p className="text-gray-100">Chapter: {manga.chapter}</p>
                </div>
              </div>
              {current === index && isDragging && canPlayTrailer && (
                <video
                  className="flex items-center justify-center w-full h-full object-cover absolute top-0 left-0 z-10"
                  autoPlay
                  loop
                  src={require(`../assets/videos/trailers/${manga.trailerID}.mp4`)}
                ></video>
              )}
            </div>
            <img
              src={manga.image}
              alt="manga"
              className="w-full h-full brightness-95 object-cover absolute overflow-hidden top-0 left-0 -z-10 blur-3xl scale-150 transition duration-500 ease-in-out delay-100"
              style={{
                opacity: index === current ? 1 : 0,
              }}
              draggable="false"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
