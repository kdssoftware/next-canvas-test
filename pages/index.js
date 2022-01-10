import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Canvas  from '../modules/Canvas'

// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
export default function Home() {

  
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(1)**2, 0, 2*Math.PI)
    ctx.fill()
  }

  function resizeCanvasToDisplaySize(canvas) {
    
    const { width, height } = canvas.getBoundingClientRect()

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
      return true
    }

    return false
}
function resizeCanvas(canvas) {
    const { width, height } = canvas.getBoundingClientRect()
    
    if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio:ratio=1 } = window
        const context = canvas.getContext('2d')
        canvas.width = width*ratio
        canvas.height = height*ratio
        context.scale(ratio, ratio)
        return true
    }

    return false
}

  return (
    <div>
      <Canvas draw={draw} />
    </div>
  )
}
