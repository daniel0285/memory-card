import { useEffect, useState } from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchPokemons(setPokemons);
  }, []);

  return (
    <>
      <h1>Score: {score}</h1>

      {pokemons.map((pokemon) => (
        <button key={pokemon.id} id={pokemon.id}>
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
