 
import { useMeasure, useScroll, useWindowSize } from "react-use";
import { useMemo, useRef } from 'react';
import NoSSR from "react-no-ssr";

const Index = ({ rightArrow, leftArrow, children, className= ''}) => {

  const [contentRef, { width:contentWidth }] = useMeasure();
  const scrollRef = useRef(null)
  const [containerRef, { width:containerWidth }] = useMeasure();
  const {x, y} = useScroll(scrollRef);

  const hasNext = useMemo(()=>{
    if(contentWidth < containerWidth) return false
    return Math.abs(contentWidth - containerWidth - x) > 1
  },[x, contentWidth, containerWidth])

  const slickFn = (direction) => {
    let offset = containerWidth
    if(direction == 'prev') offset*=-1
    scrollRef.current.scrollTo({
      top: 0,
      left: x + offset,
      behavior: 'smooth'
    });
  }

  const leftRendner = leftArrow??(
    <div className="w-8 h-full bg-white/80 flex items-center justify-center">
      <img className="w-5 h-5" src="/svg/arrow-left.svg" alt="" />
    </div>)

  const rightRender = rightArrow??(
      <div className="w-8 h-full bg-white/80 flex items-center justify-center">
        <img className="w-5 h-5" src="/svg/arrow-right.svg" alt="" />
      </div>
  )



  return (
    <div ref={containerRef} className={`w-full relative ${className}`}>
      <div>
        {
          x==0?null:(
            <div className="absolute left-0 top-0 bottom-0" onClick={()=>slickFn('prev')}>
              {leftRendner}
            </div>
          )
        }
        {
          hasNext?(
            <div className="absolute right-0 top-0 bottom-0" onClick={()=>slickFn('next')}>
              {rightRender}
            </div>
          ):null
        }
      </div>
      <div ref={scrollRef} className="overflow-x-scroll">
        <div ref={contentRef} className="flex flex-row w-max">
          {children}
        </div>
      </div>
    </div>
)}
 
export default Index;