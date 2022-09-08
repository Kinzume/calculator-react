import { useState } from 'react'

export default function App() {
  const [currentValue, setCurrentValue] = useState([])
  const [previousValue, setPreviousValue] = useState([])
  const [operation, setOperation] = useState([])

  function handleNumberInput(e) {
    const newNumberInput = Number(e.target.innerHTML)
    const newCurrentValue = [...currentValue, newNumberInput]
    setCurrentValue(newCurrentValue)
  }

  function handleOperationInput(e) {
    const newPreviousValue = [...currentValue]
    const newOperationInput = [e.target.innerHTML]
    setPreviousValue(newPreviousValue)
    setOperation(newOperationInput)
    setCurrentValue([])
  }

  function evaluate(finalPreviousValue, finalCurrentValue, operation) {
    switch (operation[0]) {
      case '+':
        return finalPreviousValue + finalCurrentValue
      case '-':
        return finalPreviousValue - finalCurrentValue
      case '*':
        return finalPreviousValue * finalCurrentValue
      case '/':
        return finalPreviousValue / finalCurrentValue
    }
  }

  function compute() {
    const finalPreviousValue = Number(previousValue.join(''))
    const finalCurrentValue = Number(currentValue.join(''))
    const computedValue = [
      evaluate(finalPreviousValue, finalCurrentValue, operation),
    ]
    setCurrentValue(computedValue)
    setPreviousValue([])
    setOperation([])
  }

  const HANDLE_INPUT = {
    Number: (e) => handleNumberInput(e),
    Operation: (e) => handleOperationInput(e),
    Compute: () => compute(),
  }

  return (
    <div className="App">
      <div className="display">
        <div className="prev">
          {previousValue}
          {operation}
        </div>
        <div className="curr">{currentValue}</div>
      </div>
      <div className="userInput">
        <button className="input" onClick={HANDLE_INPUT.Number}>
          7
        </button>
        <button className="input" onClick={HANDLE_INPUT.Number}>
          8
        </button>
        <button className="input" onClick={HANDLE_INPUT.Number}>
          9
        </button>
        <button className="input" onClick={HANDLE_INPUT.Operation}>
          *
        </button>
        <button className="input" onClick={HANDLE_INPUT.Number}>
          4
        </button>
        <button className="input" onClick={HANDLE_INPUT.Number}>
          5
        </button>
        <button className="input" onClick={HANDLE_INPUT.Number}>
          6
        </button>
        <button className="input" onClick={HANDLE_INPUT.Operation}>
          -
        </button>
        <button className="input" onClick={HANDLE_INPUT.Number}>
          1
        </button>
        <button className="input" onClick={HANDLE_INPUT.Number}>
          2
        </button>
        <button className="input" onClick={HANDLE_INPUT.Number}>
          3
        </button>
        <button className="input" onClick={HANDLE_INPUT.Operation}>
          +
        </button>
        <button className="input" onClick={HANDLE_INPUT.Operation}>
          /
        </button>
        <button className="input" onClick={HANDLE_INPUT.Number}>
          0
        </button>
        <button className="input">.</button>
        <button className="input" onClick={HANDLE_INPUT.Compute}>
          =
        </button>
      </div>
    </div>
  )
}
