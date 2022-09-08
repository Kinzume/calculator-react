import { useState } from 'react'

export default function App(props) {
  const [curr, ChangeCurr] = useState([])
  const [prev, ChangePrev] = useState([])
  const [opr, ChangeOpr] = useState([])
  const INPUT_TYPE = {
    Number: (e) => amendCurr(e),
    Arithmetic: (e) => amendPrev(e),
  }

  function amendCurr(e) {
    const newInput = Number(e.target.innerHTML)
    const amendedCurr = [...curr, newInput]
    ChangeCurr(amendedCurr)
  }

  function amendPrev(e) {
    const amendedPrev = [...curr]
    const amendedOpr = [e.target.innerHTML]
    ChangePrev(amendedPrev)
    ChangeOpr(amendedOpr)
    ChangeCurr([])
  }

  function evaluate(finalPrev, finalCurr, opr) {
    switch (opr[0]) {
      case '+':
        return finalPrev + finalCurr
      case '-':
        return finalPrev - finalCurr
      case '*':
        return finalPrev * finalCurr
      case '/':
        return finalPrev / finalCurr
    }
  }

  function compute() {
    const finalPrev = Number(prev.join(''))
    const finalCurr = Number(curr.join(''))
    const finalComp = [evaluate(finalPrev, finalCurr, opr)]
    ChangeCurr(finalComp)
    ChangePrev([])
    ChangeOpr([])
  }

  return (
    <div className="App">
      <div className="display">
        <div className="prev">
          {prev}
          {opr}
        </div>
        <div className="curr">{curr}</div>
      </div>
      <div className="userInput">
        <button className="input" onClick={(e) => amendCurr(e)}>
          7
        </button>
        <button className="input" onClick={(e) => amendCurr(e)}>
          8
        </button>
        <button className="input" onClick={(e) => amendCurr(e)}>
          9
        </button>
        <button className="input" onClick={(e) => amendPrev(e)}>
          *
        </button>
        <button className="input" onClick={(e) => amendCurr(e)}>
          4
        </button>
        <button className="input" onClick={(e) => amendCurr(e)}>
          5
        </button>
        <button className="input" onClick={(e) => amendCurr(e)}>
          6
        </button>
        <button className="input" onClick={(e) => amendPrev(e)}>
          -
        </button>
        <button className="input" onClick={(e) => amendCurr(e)}>
          1
        </button>
        <button className="input" onClick={(e) => amendCurr(e)}>
          2
        </button>
        <button className="input" onClick={(e) => amendCurr(e)}>
          3
        </button>
        <button className="input" onClick={(e) => amendPrev(e)}>
          +
        </button>
        <button className="input" onClick={(e) => amendPrev(e)}>
          /
        </button>
        <button className="input" onClick={(e) => amendCurr(e)}>
          0
        </button>
        <button className="input">.</button>
        <button className="input" onClick={() => compute()}>
          =
        </button>
      </div>
    </div>
  )
}
