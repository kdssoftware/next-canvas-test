import React, { useState, useRef, useEffect } from 'react'

function App() {
  
  const [isDrawing,setIsDrawing] = useState(false);
  const [windowWidth,setWindowWidth] = useState(null);
  const [windowHeight,setWindowHeight] = useState(null);
  const [inputValues,setInputValues] = useState([''])
  const [draw,setDraw] = useState(null);
  const [startDirection,setStartDirection] = useState("R");
  const canvasRef = useRef(null);

  function handleResize () {
    console.log("resize")
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight-100); //todo calc height of an element
  }

  useEffect(() => {
    handleResize();
  }, []);

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
    setInputValues(inputValues.concat(''))
  }

  async function startDrawing() {
    handleResize()
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = "blue";
    ctx.fillStyle = '#000000'
    ctx.font = '30px Arial'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let cursor = [15,30];
    let DEFAULT_LINEWIDTH = 1;
    const MIN_X = 15;
    const MIN_Y = 30;
    ctx.moveTo(cursor[0],cursor[1]);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for(let i of inputValues){
      let numbers = i.toString().split('');
      cursor[0] = MIN_X;
      for(let j of numbers){
        if(j==="0"){
          cursor = [cursor[0]-5,cursor[1]+15];
          ctx.lineWidth = 3;
          drawOval(ctx,cursor);
          ctx.lineWidth = DEFAULT_LINEWIDTH;
        }else{
          cursor[1] += 30;
          cursor = drawLine(ctx,cursor,cursor[0]+500,cursor[1]);
        }
      }
    }
  }


  function drawLine(ctx,cursor,endX,endY) {
    ctx.beginPath();
    ctx.moveTo(cursor[0],cursor[1]);
    cursor[0] = endX;
    cursor[1] = endY;
    ctx.lineTo(cursor[0],cursor[1]);
    ctx.stroke();
    return cursor;
  }

  function drawTriangle(ctx,cursor,sizeOfTriangle = 15) {
    ctx.beginPath();
    ctx.moveTo(cursor[0],cursor[1]);
    ctx.lineTo(cursor[0]-sizeOfTriangle,cursor[1]-sizeOfTriangle);
    ctx.lineTo(cursor[0]-sizeOfTriangle,cursor[1]+sizeOfTriangle);
    ctx.closePath();
    ctx.fill();
  }

  function drawOval(ctx,cursor,sizeOfOval=15){
    ctx.beginPath();
    ctx.arc(cursor[0],cursor[1],sizeOfOval,0,2*Math.PI);
    ctx.stroke();
  }


  function saveCanvasToImage(ctx){
    const canvas = canvasRef.current
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = image;
    link.click();
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
              <button className="flex px-3 py-2 rounded-lg bg-slate-600 m-1" type="button" onClick={saveCanvasToImage}>Opslaan</button>
          </form>
        </div>
      </div>
    </div>
    <canvas className="bg-slate-100 " ref={canvasRef} width={windowWidth} height={windowHeight} ></canvas>
    </>
  )
}

export default App