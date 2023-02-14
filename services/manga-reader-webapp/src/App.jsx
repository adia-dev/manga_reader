import { useEffect, useState } from "react";
import "./App.css";
import AccountBar from "./components/AccountBar";
import Searchbar from "./components/Searchbar";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";

function App() {

  const [searchBarOpened, setSearchBarOpened] = useState(false);
  const [accountBarOpened, setaccountBarOpened] = useState(false);

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
    <div className="" data-testid="app">
      <AuthContextProvider>
        <AccountBar accountBarOpened={accountBarOpened} setaccountBarOpened={setaccountBarOpened} />
        <Home setSearchBarOpened={setSearchBarOpened} />
        <Searchbar searchBarOpened={searchBarOpened} setSearchBarOpened={setSearchBarOpened} />
      </AuthContextProvider>
    </div>
  );
}

export default App;
