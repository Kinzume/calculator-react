import { useReducer } from 'react'
import InputDigit from './components/InputDigit'
import InputOperation from './components/InputOperation'

export default function App() {
  let initialState = {
    previousValue: '',
    currentValue: '',
    currentOperation: '',
  }

  const [{ previousValue, currentValue, currentOperation }, dispatch] =
    useReducer(myReducer, initialState)

  function myReducer(state, action) {
    switch (action.type) {
      case 'add-digit':
        if (state.overwrite) {
          return { ...state, currentValue: action.typeName, overwrite: false }
        }
        if (action.typeName === '0' && state.currentValue === '0') return state
        if (action.typeName === '.' && state.currentValue.includes('.'))
          return state
        return {
          ...state,
          currentValue: `${state.currentValue}${action.typeName}`,
        }
      case 'operation':
        if (state.previousValue === '' && state.currentValue === '') {
          return state
        }
        if (state.previousValue === '')
          return {
            ...state,
            currentOperation: action.typeName,
            previousValue: state.currentValue,
            currentValue: '',
          }
        if (state.currentValue === '') {
          return { ...state, currentOperation: action.typeName }
        }
        return {
          ...state,
          previousValue: evaluateToValue(state),
          currentOperation: action.typeName,
          currentValue: '',
        }
      case 'all-clear':
        return initialState
      case 'compute':
        if (
          state.currentOperation === '' ||
          state.previousValue === '' ||
          state.currentValue === ''
        ) {
          return state
        }
        return {
          ...state,
          currentValue: evaluateToValue(state),
          previousValue: '',
          currentOperation: '',
          overwrite: true,
        }
    }
  }
  function evaluateToValue({ previousValue, currentValue, currentOperation }) {
    const previous = parseFloat(previousValue)
    const current = parseFloat(currentValue)
    if (isNaN(previous) || isNaN(current)) return ''
    let computation = ''
    switch (currentOperation) {
      case '+':
        computation = previous + current
        break
      case '-':
        computation = previous - current
        break
      case '*':
        computation = previous * current
        break
      case '/':
        computation = previous / current
        break
    }
    return computation.toString()
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
        <button
          className="input"
          onClick={() => dispatch({ type: 'all-clear' })}
        >
          AC
        </button>
        <InputDigit dispatch={dispatch} digit="7" />
        <InputDigit dispatch={dispatch} digit="8" />
        <InputDigit dispatch={dispatch} digit="9" />
        <InputOperation dispatch={dispatch} operation="*" />
        <InputDigit dispatch={dispatch} digit="4" />
        <InputDigit dispatch={dispatch} digit="5" />
        <InputDigit dispatch={dispatch} digit="6" />
        <InputOperation dispatch={dispatch} operation="-" />
        <InputDigit dispatch={dispatch} digit="1" />
        <InputDigit dispatch={dispatch} digit="2" />
        <InputDigit dispatch={dispatch} digit="3" />
        <InputOperation dispatch={dispatch} operation="+" />
        <InputOperation dispatch={dispatch} operation="/" />
        <InputDigit dispatch={dispatch} digit="0" />
        <InputDigit dispatch={dispatch} digit="." />
        <button className="input" onClick={() => dispatch({ type: 'compute' })}>
          =
        </button>
      </div>
    </div>
  )
}
