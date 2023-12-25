'use client'

import { useEffect, useState } from "react"

function Column(col, col_index, handleSelectColumn) {
  return (<div key={col_index} onClick={() => handleSelectColumn(col_index)} className="flex flex-col w-[25px]">
    { col.map((colour, row_index) => Square(colour, row_index)) }
    </div>)
}

function Square(colour, row_index) {
  return (
    <div key={row_index} className={`h-[25px] ${colour === 0 ? "bg-white hover:bg-gray-200" : colour === 1 ? "bg-blue-600" : "bg-red-600"} hover:cursor-pointer m-[1px] rounded-full`}>{ }</div>
  )
}

export default function Home() {
  console.log("Refresh")
  let ROWS = 6
  let column = [0,0,0,0,0,0]
  let [grid, updateGrid] = useState([
    column,
    column,
    column,
    column,
    column,
    column,
    column,
  ])
  let [turn, updateTurn] = useState(1)

  // function addToken(col_index, row_index) {
  //   console.log(`Updating position at Col: ${col_index}, Row: ${row_index}`)
  //   let grid_copy = grid.slice()
  //   console.log(grid_copy[col_index])
  //   let column = grid_copy[col_index].slice()
  //   console.log(column)
  //   column[row_index] = turn
  //   console.log(column)
  //   grid_copy[col_index] = column
  //   updateGrid(grid_copy)
  //   updateTurn(turn === 1 ? 2 : 1)
  // }

  useEffect(() => {
    checkEdges()
  }, [grid])

  function checkForWin() {
    let x = 0
    let y = 0
  }

  function checkEdges() {
    let leftColumnCopy = grid[0].slice()
    for (let r = 0; r < ROWS; r++) {
      if (leftColumnCopy[r] !== 0) {
        addColLeft()
        break;
      }
    }
    let rightColumnCopy = grid[grid.length - 1].slice()
    for (let r = 0; r < ROWS; r++) {
      if (rightColumnCopy[r] !== 0) {
        addColRight()
        break;
      }
    }
  }

  function handleSelectColumn(col_index) {
    console.log(`Updating column: ${col_index}`)
    let grid_copy = grid.slice()
    let column = grid_copy[col_index].slice()
    console.log(column)
    let i = column.length - 1
    let placed = false
    for (let x = 0; x < column.length; x++) {
      if (column[i - x] === 0) {
        column[i - x] = turn
        grid_copy[col_index] = column
        break
      }
    }
    updateGrid(grid_copy)
    updateTurn(turn === 1 ? 2 : 1)
  }

  function addColLeft() {
    updateGrid([column, ...grid])
  }

  function addColRight() {
    updateGrid([...grid, column])
  }

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center">
          <div className="bg-gray-400 m-10 flex border border-black">
            { grid.map((col, i) => Column(col, i, handleSelectColumn))}
          </div>
        </div>
        <div className="text-center">{ turn === 1 ? "Blue" : "Red"}'s Turn</div>
      </div>
      {/* <button onClick={() => addColLeft()}>Add Left</button>
      <button onClick={() => addColRight()}>Add Right</button> */}
    </>
  )
}
