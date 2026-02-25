import { useEffect, useState } from "react";
import { Cards } from "./components/Cards";
import { Button } from "./components/Button";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPokemons(setPokemons, setIsLoading);
  }, []);

  function handleCardClick(e) {
    const pokemonID = e.target.id;
    if (!selectedPokemons.includes(pokemonID)) {
      setSelectedPokemons((curr) => [...curr, pokemonID]);
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        setHighScore((prevHigh) => (prevHigh < newScore ? newScore : prevHigh));
        return newScore;
      });
      setPokemons((curr) => shuffle(curr));
    } else {
      setIsGameOver(true);
      setSelectedPokemons([]);
      setHighScore((curr) => (curr < score ? score : curr));
    }
  }

  function handlePlayAgain() {
    console.log("play again");
    setIsGameOver(false);
    setScore(0);
    setSelectedPokemons([]);
    setPokemons((curr) => shuffle(curr));
  }

  return (
    <main className='h-full font-[pokemon-classic]'>
      <header className='flex justify-center items-center bg-[#FFCB05] p-5'>
        <img
          className='h-10 md:h-15 w-auto'
          src='dist/assets/img/pokemon-memory-card.png'
          alt='Pokemon Memory Card'
        />
      </header>
      <section className='flex flex-row flex-wrap w-full gap-4 justify-evenly p-5 text-md font-bold'>
        <h2>High score: {highScore}</h2>
        <h2>Score: {score}</h2>
      </section>

      {isLoading && <h1>Loading</h1>}

      {isGameOver && <h1>Game over</h1>}
      {isGameOver || (score === 10 && <h1>You won</h1>)}
      {isGameOver && (
        <Button clickHandler={handlePlayAgain}>Play Again?</Button>
      )}

      <section className='flex justify-center gap-5 flex-wrap p-5'>
        <Cards
          array={pokemons}
          handleClick={handleCardClick}
          isGameOver={isGameOver}
          score={score}
        />
      </section>
    </main>
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

async function fetchPokemons(setState, setIsLoading) {
  const pokemonID = getRandomID();

  try {
    setIsLoading(true);
    const pokemonList = await Promise.all(
      pokemonID.map(async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const data = await res.json();

        return {
          name: data.name,
          id,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      }),
    );
    setIsLoading(false);
    setState(pokemonList);
  } catch (error) {
    alert(error);
  }
}

export default App;
