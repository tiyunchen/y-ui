import { useRef } from 'react'

type Direction = '' | 'vertical' | 'horizontal'
const MIN_DISTANCE = 10
function getDirection(x: number, y:number): Direction{
  if(x>y && x > MIN_DISTANCE){
    return 'horizontal'
  }
  if(y>x && y>MIN_DISTANCE){
    return 'vertical'
  }
  return ''
}



export function useTouch(){
  const startX = useRef(0)
  const startY = useRef(0)
  const deltaX = useRef(0)
  const deltaY = useRef(0)
  const offsetX = useRef(0)
  const offsetY = useRef(0)
  const direction = useRef<Direction>('')


  // 是否是垂直的
  const isVertical = () => direction.current === 'vertical'
  // 是否是水平方向的
  const isHorizontal  = () => direction.current === 'horizontal'


  const reset = () => {
    deltaX.current = 0
    deltaY.current = 0
    offsetX.current = 0
    offsetY.current = 0
    direction.current = ''
  }

  const start = ((event: TouchEvent) => {
    // 每次移动都要将数据归0
    reset()
    startX.current = event.touches[0].clientX
    startY.current = event.touches[0].clientY
  }) as EventListener

  const move = ((event: TouchEvent)=>{
    const touch = event.touches[0]
    // 通过与起始点进行对比
    deltaX.current = touch.clientX < 0 ? 0 : touch.clientX - startX.current
    deltaY.current = touch.clientY - startY.current
    offsetX.current = Math.abs(deltaX.current)
    offsetY.current = Math.abs(deltaY.current)

    if(!direction.current){
      direction.current = getDirection(offsetX.current, offsetY.current)
    }

  }) as EventListener


  return {
    move,
    start,
    reset,
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal,
  }

}
