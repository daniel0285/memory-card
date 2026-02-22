import { useEffect, useState } from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    fetchPokemons(setPokemons);
  }, []);

  function handleClick(e) {
    const pokemonID = e.target.id;
    if (!selectedPokemons.includes(pokemonID)) {
      setSelectedPokemons((curr) => [...curr, pokemonID]);
      setScore((curr) => curr + 1);
      setPokemons((curr) => shuffle(curr));
    } else {
      setIsGameOver(true);
    }
  }

  return (
    <>
      <h1>Score: {score}</h1>

      {isGameOver && <h1>Game over</h1>}
      {pokemons.map((pokemon) => (
        <button key={pokemon.id} id={pokemon.id} onClick={handleClick}>
          <img
            key={pokemon.id}
            id={pokemon.id}
            src={pokemon.img}
            alt={pokemon.name}
          />
          <p>{pokemon.name}</p>
        </button>
      ))}
    </>
  );
}

function getRandomID() {
  const pokemonId = [];
  while (pokemonId.length < 10) {
    const id = Math.floor(Math.random() * 100 + 1);
    if (!pokemonId.includes(id)) pokemonId.push(id);
  }
  return pokemonId;
}

function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

async function fetchPokemons(setState) {
  const pokemonID = getRandomID();

  try {
    const pokemonList = await Promise.all(
      pokemonID.map(async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const data = await res.json();

        return {
          name: data.name,
          id,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };
      }),
    );

    setState(pokemonList);
  } catch (error) {
    alert(error);
  }
}

export default App;
