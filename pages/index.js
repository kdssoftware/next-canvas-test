import React, { useState, useRef, useEffect } from 'react'

function App() {
  
  const [isDrawing,setIsDrawing] = useState(false);
  const [windowWidth,setWindowWidth] = useState(null);
  const [windowHeight,setWindowHeight] = useState(null);
  const [inputValues,setInputValues] = useState(Array.from(Array(2).keys()))
  const [draw,setDraw] = useState(null);
  const [startDirection,setStartDirection] = useState("R");
  const canvasRef = useRef(null);

  function handleResize () {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight-100); //todo calc height of an element
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  function changeDirection () {
    if(startDirection === "R"){
      setStartDirection("L");
    }else{
      setStartDirection("R");
    }
  }

  useEffect(()=>{
    console.log(inputValues);
  },[inputValues])
  
  function plus() {
    //increase array size by 1
    setInputValues(inputValues.concat(inputValues.length))
  }

  async function startDrawing() {
    handleResize()
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let cursor = [15,30];
    const MIN_X = 15;
    const MIN_Y = 30;
    ctx.moveTo(cursor[0],cursor[1]);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.font = '30px Arial'
    for(let i of inputValues){
      let numbers = i.toString().split('');
      cursor[0] = MIN_X;
      for(let j of numbers){
        //draw number
        ctx.fillText(j, cursor[0], cursor[1]);
        //move cursor
        cursor[0] += 30;
        console.log(j,cursor);
      }
      cursor[1] += 30;
    }
    ctx.fill()
  }

  return (
    <>
    <div className="bg-indigo-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
         <form className="w-0 flex-1 flex items-center flex-wrap">
              {/* show equal amount of inputs as amountOfInputs */}
              {inputValues.map((v,i) => (
                <input  className="flex tracking-even-wider p-2 rounded-lg bg-indigo-800 p-2 m-1 text-white" key={i} type="number" onChange={(e) => {
                  //only setInputValues with index i
                  setInputValues(inputValues.map((v,j) => j === i ? e.target.value : v))
                }}/>
              ))}
              <button className="flex px-3 py-1 m-1 text-xl text-white rounded-lg bg-green-600" type="button" onClick={plus}>+</button>
              <button className={"flex px-3 py-1 m-1 text-xl text-white rounded-lg "+(startDirection==="R"?"bg-red-500":"bg-yellow-500")} type="button" onClick={changeDirection}>{startDirection}</button>
              <button className="flex px-3 py-2 rounded-lg bg-teal-400 m-1" type="button" onClick={startDrawing}>Tekenen</button>
          </form>
        </div>
      </div>
    </div>
    <canvas className="bg-slate-100 " ref={canvasRef} width={windowWidth} height={windowHeight} ></canvas>
    </>
  )
}

export default App