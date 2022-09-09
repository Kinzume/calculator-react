export default function InputDigit(props) {
  return (
    <button
      className="input"
      onClick={() =>
        props.dispatch({ type: 'operation', typeName: props.operation })
      }
    >
      {props.operation}
    </button>
  )
}
