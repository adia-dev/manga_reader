import { useEffect, useState } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import Home from "./pages/Home";

function App() {

  const [searchBarOpened, setSearchBarOpened] = useState(false);

  useEffect(() => {
    // when I press cmd + k, the search bar should open
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        setSearchBarOpened(true);
      }

      if (e.key === "Escape") {
        setSearchBarOpened(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
  }, [searchBarOpened]);


  return (
    <div className="">
      <Home setSearchBarOpened={setSearchBarOpened} />
      <Searchbar searchBarOpened={searchBarOpened} setSearchBarOpened={setSearchBarOpened} />

    </div>
  );
}

export default App;
