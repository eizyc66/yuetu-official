import { useState, useEffect } from "react";
import NoSSR from 'react-no-ssr';
import { ReactSVG } from 'react-svg';

const Panel = ({ value = {}, status = false }) => {
  const { country, list} = value
  const [open, setOpen] = useState(status)

  useEffect(()=>{
    setOpen(status)
  }, [status])

  const beforeInjection = (svg, open) => {
    svg.setAttribute('style', open?'color: rgba(255, 255, 255, 0.5)':'color: rgba(0, 0, 0, 0.5)')
  }

  const attrs = [
    {
      key:'tel', 
      label: 'Tel'
    },
    {
      key:'email', 
      label: 'Email'
    },
    {
      key:'address', 
      label: 'Address'
    },
    {
      key:'website', 
      label: 'Company website'
    },
  ]

  const renderInfo = (info)=> {
    const list = attrs.filter(attr=>info[attr.key])
    return (
      <>
      {
        list.map(item=>(
          <p key={`${item.label}:${info[item.key]}`} className="leading-[20px]">
            {item.label}: {info[item.key]}
          </p>
        ))
      }
      </>
    )
  }
  
  return (
    <div>
      <div className={`${open?'bg-black text-white':'text-black'} text-sm flex flex-row justify-between px-6 py-4 transition-all ease-in-out duration-200`}>
        {country} 
      {/* <NoSSR>
        <ReactSVG className='w-4 h-4 svg' beforeInjection={(svg)=>beforeInjection(svg, open)} src={open?'/svg/minus.svg':'/svg/add.svg'}/>
      </NoSSR> */}
      </div>
      <div className={`${open?'max-h-[1000px] border':'max-h-0 border-0 border-t'}  px-6 border-black/[.15] overflow-hidden transition-all ease-in-out duration-[380ms]`}>
        <div className="py-4">
          {/* {
            list.map((item, idx)=>(
              <>
              {idx==0?null:(
                <hr className="bg-black/[.11] h-px w-full my-5"/>
              )}
              <div key={item.company} className="text-xs text-black/70">
                <p className="mb-4">{item.company}</p>
                {renderInfo(item)}
              </div>
              </>
            ))
          } */}
        </div>
      </div>
    </div>
)}
 
export default Panel;