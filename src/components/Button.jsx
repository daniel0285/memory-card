export function Button({ clickHandler, children }) {
  return <button onClick={clickHandler}>{children}</button>;
}
