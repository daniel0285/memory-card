export function Cards({ array, handleClick, isGameOver, score }) {
  return array.map((item) => (
    <button
      key={item.id}
      id={item.id}
      className='bg-gray-200 rounded-xl flex flex-col items-center justify-center w-30 h-45 lg:w-45 lg:h-60 gap-1 py-5 px-2 cursor-pointer'
      onClick={handleClick}
      disabled={isGameOver || (score === 10 && true)}
      aria-labelledby={item.name}
    >
      <img
        key={item.id}
        id={item.id}
        src={item.img}
        alt={item.name}
        className='w-auto h-full'
      />
      <p
        id={item.name}
        className='text-gray-700  capitalize font-bold text-xs md:text-md lg:text-lg'
      >
        {item.name}
      </p>
    </button>
  ));
}
