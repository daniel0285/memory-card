export function Button({ clickHandler, children }) {
  return (
    <button
      className='px-4 py-2 font-bold bg-yellow-400 rounded-lg'
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
