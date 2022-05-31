import Pages from "./pages/Pages";
import NavBar from "./components/NavBar";

function App() {
  

  return (
    <div className="App">
      <NavBar />
      <div className="container">
          <Pages />
        </div>
    </div>
  );
}

export default App;
