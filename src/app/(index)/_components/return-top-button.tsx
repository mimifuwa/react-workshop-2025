import { useEffect, useState } from "react";

export function ReturnTopButton() {
  const [isButtonActive, setIsButtonActive] = useState(false);

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollWindow);
    return () => {
      window.removeEventListener("scroll", scrollWindow);
    };
  }, []);

  const scrollWindow = () => {
    const top = 100;
    let scroll = 0;
    scroll = window.scrollY;
    if (top <= scroll) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  };

  const normalStyle = "opacity-0 transition-opacity duration-500";
  const activeStyle =
    "opacity-100 transition-opacity duration-500 fixed bottom-6 right-6 bg-indigo-600 text-white cursor-pointer rounded-full p-2";

  const style = isButtonActive ? activeStyle : normalStyle;

  return (
    <button className={style} onClick={returnTop}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="36 30 24 18 12 30"></polyline>
      </svg>
    </button>
  );
}
