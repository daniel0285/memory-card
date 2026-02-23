export function Cards({ array, handleClick, isGameOver, score }) {
  return array.map((item) => (
    <button
      key={item.id}
      id={item.id}
      onClick={handleClick}
      disabled={isGameOver || (score === 10 && true)}
    >
      <img key={item.id} id={item.id} src={item.img} alt={item.name} />
      <p>{item.name}</p>
    </button>
  ));
}
