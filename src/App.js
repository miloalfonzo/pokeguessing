import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokeimg, setPokeImg] = useState([]);
  const [guesspokemon, setGuesspokemon] = useState({
    poke: ""
  });
  const [gamestate, setGameState] = useState(false);
  const [error, setError] = useState(false);

  const { poke } = guesspokemon;

  useEffect(() => {
    const consultApi = async () => {
      let url = `https://pokeapi.co/api/v2/pokemon/${Math.round(
        Math.random() * (105 - 1) + 1
      )}`;
      const result = await axios.get(url);
      setPokemon(result.data);
      setPokeImg(result.data.sprites.front_default);
    };
    consultApi();
  }, []);

  const onChange = (e) => {
    setGuesspokemon({
      [e.target.name]: e.target.value
    });
  };

  const refresh = () => {
    window.location.reload(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (poke.trim() === "") {
      setError(true);
      return;
    }
    setError(false);

    if (poke.toLowerCase() === pokemon.name) {
      setGameState(true);
    } else {
      setGameState(false);
      setError(true);
    }
    setGuesspokemon(poke);
  };

  return (
    <div className="App nes-container with-title is-centered is-rounded ">
      <h2 className="title"> Pokeguess </h2>
      <img alt="Pokemon" className={gamestate ? "win" : ""} src={pokeimg} />
      {gamestate ? <h3>¡Es {pokemon.name}!</h3> : ""}
      <form onSubmit={onSubmit}>
        <div className="inputs">
          <input
            type="text"
            className={`nes-input ${error ? "is-error" : ""} ${
              gamestate ? "is-success disabled" : ""
            }`}
            value={poke || ""}
            disabled={gamestate ? "disabled" : ""}
            name="poke"
            onChange={onChange}
          />
          {gamestate ? (
            <input
              type="button"
              className="nes-btn is-warning"
              value="Jugar otra vez"
              onClick={refresh}
            />
          ) : (
            <input
              type="submit"
              className="nes-btn is-error"
              value="Adivinar!"
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
