import { useState } from 'react'

export default function App() {
  const [currentValue, setCurrentValue] = useState([])
  const [previousValue, setPreviousValue] = useState([])
  const [currentOperation, setOperation] = useState([])

  function handleNumberInput(e) {
    const newNumberInput = Number(e.target.innerHTML)
    const newCurrentValue = [...currentValue, newNumberInput]
    setCurrentValue(newCurrentValue)
  }

  function handleDecimal(e) {
    const decimal = e.target.innerHTML
    if (currentValue.includes(decimal)) {
      return console.log('test')
    }

    setCurrentValue(decimal)
  }

  const OPERATION_INPUT_LOGIC = {
    NewOperation: currentOperation.length == 0 && previousValue.length == 0,
    ChangeCurrentOperation:
      currentOperation.length !== 0 && currentValue.length == 0,
    EvaluateCurrentOperation:
      currentOperation.length !== 0 && currentValue.length !== 0,
  }

  function handleOperationInput(e) {
    const newPreviousValue = [...currentValue]
    const newOperationInput = [e.target.innerHTML]
    if (OPERATION_INPUT_LOGIC.NewOperation) {
      setPreviousValue(newPreviousValue)
      setOperation(newOperationInput)
      setCurrentValue([])
    }
    if (OPERATION_INPUT_LOGIC.ChangeCurrentOperation) {
      setOperation(newOperationInput)
    }
    if (OPERATION_INPUT_LOGIC.EvaluateCurrentOperation) {
      setPreviousValue([
        evaluateToValue(previousValue, currentValue, currentOperation),
      ])
      setOperation(newOperationInput)
      setCurrentValue([])
    }
  }

  function evaluateToValue(
    finalPreviousValueArray,
    finalCurrentValueArray,
    currentOperation
  ) {
    const finalPreviousValue = Number(finalPreviousValueArray.join(''))
    const finalCurrentValue = Number(finalCurrentValueArray.join(''))
    switch (currentOperation[0]) {
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

  const HANDLE_INPUT = {
    Number: (e) => handleNumberInput(e),
    Operation: (e) => handleOperationInput(e),
    Decimal: (e) => handleDecimal(e),
    Compute: () => {
      console.log([
        evaluateToValue(previousValue, currentValue, currentOperation),
      ])
      setCurrentValue([
        evaluateToValue(previousValue, currentValue, currentOperation),
      ])
      setPreviousValue([])
      setOperation([])
    },
  }

  return (
    <div className="App">
      <div className="display">
        <div className="prev">
          {previousValue}
          {currentOperation}
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
        <button className="input" onClick={HANDLE_INPUT.Decimal}>
          .
        </button>
        <button className="input" onClick={HANDLE_INPUT.Compute}>
          =
        </button>
      </div>
    </div>
  )
}
