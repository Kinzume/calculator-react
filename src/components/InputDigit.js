export default function InputDigit(props) {
  return (
    <button
      className="input"
      onClick={() =>
        props.dispatch({ type: 'add-digit', typeName: props.digit })
      }
    >
      {props.digit}
    </button>
  )
}
