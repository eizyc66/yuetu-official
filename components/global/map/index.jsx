import { useEffect, useMemo, useRef, useState } from "react";
import NoSSR from "react-no-ssr";
import { useWindowSize } from "react-use";
import { geoTimes } from 'd3-geo-projection'
import * as d3 from "d3";
import { WORLD_LIST } from '@/utils/const'
import './index.css'




const D3Map = ({ active = 'northAmerica' , onChange }) => {

  const { width } = useWindowSize()
  const svgRef = useRef(null)
  const [list, setList] = useState([])
  const [paths, setPaths] = useState([])

  const svgWidth = useMemo(()=>{
    return Math.max(375, 0.62* width) 
    // 640/830
  }, [width])

  const svgHeight = useMemo(()=>{
    return 0.493*svgWidth
    // return 0.554 * svgWidth
  }, [svgWidth])

  const buttonScale = useMemo(()=>{
    if(width> 800) {
      return 1 
    } else {
      return 0.6
    }
  }, [width])

  const getJson = async (item) => {
    const { value: id } = item
    const data = await d3.json(`/geojson/${id}.json`)
    return {
      ...data,
      ...item,
      id
    }
  }


  const fetchJson =  async ()=> {
    let jsonArr = [...WORLD_LIST]
    jsonArr = jsonArr.sort((a,b)=>(a.priority - b.priority))
    let arr = await Promise.allSettled(jsonArr.map(item=>getJson(item)))
    arr = arr.map(item=>item.value)
    setList(arr);
  }

  const render = () => {
    let offset = [svgWidth/2, svgHeight/1.6];
    const features = list.reduce((res, item)=>{
      res.push(...item.features)
      return res
    },[])
    let projection = geoTimes().rotate([-8.2, 0])
    let path = d3.geoPath().projection(projection);
    const bounds  = path.bounds({
      "type":"FeatureCollection", features
    });
    let scale = 250
    let hscale  = scale* svgHeight  / (bounds[1][0] - bounds[0][0]);
    let vscale  = scale* svgWidth / (bounds[1][1] - bounds[0][1]);
    scale   = (hscale < vscale) ? hscale : vscale;
    projection = projection.scale(scale).translate(offset);
    path = d3.geoPath().projection(projection);


    const xMargin = 4
    const yMargin = 2

    const svg = d3.select(".svg")
    svg.selectAll(".group")
    .data(list)
    .join("g")
    .attr("class", "group")
    .attr("id", d=>d.id)

    svg.selectAll('.group')
    .selectAll("path")
    .data(d=>d.features.map(item=>({
      ...item,
      fill: d.id === active?'#FC0407':'#fff'
    })))
    .join("path")
    .attr("fill", (d) => d.fill??'#fff')
    .attr("stroke", "#868686")
    .attr("stroke-width",0.27)
    .attr("d", path)

    const buttons = svg
    .selectAll('.buttons')
    .data(list)
    .join("g")
    .attr("transform", (d)=>{
      let _path = path
      if(d.id === 'asia') {
        let _projection = projection
        _projection = _projection.rotate([-12, 0])
        _path = d3.geoPath().projection(_projection);
      }
      const bounds  = _path.bounds(d);
      const offset = d.offest??[2,2]
      const x = (bounds[1][0]+bounds[0][0])/offset[0]
      const y = (bounds[1][1]+bounds[0][1])/offset[1]
      return `translate(${x}, ${y})`
    })
    .attr("class", "buttons")
    .style("cursor", (d)=>{
      if(d.id === active) return ""
      else return "pointer"
    })
    .on('click', (_,d) => {
      if(d.id === active) return
      onChange(d.id)
    })


    buttons
    .selectAll("rect")
    .data(d=>[d])
    .join("rect")
    .style("fill", (d)=>{
      if(d.id === active) return "#F3F7FF"
      else return 'transparent'
     })
    .style("filter", (d)=>{
      if(d.id === active) return "drop-shadow(0px 4px 7px rgba(0, 0, 0, 0.25))"
      else return ''
    })
    .style("opacity", "0")

    const buttonInner = buttons
    .selectAll("g")
    .data(d=>[d])
    .join("g")
    .attr("class", "inner")

    const text = buttonInner
    .selectAll('text')
    .data(d=>[d])
    .join("text")
    .text(d=>d.label)
    .style("color", "rgba(0, 0, 0, 0.9)")
    .style("font-weight", 500)
    .style("font-size", `${Math.max(12,(14*buttonScale))}px`)

    buttonInner
    .selectAll('.icon')
    .data(d=>[d])
    .join("image")
    .attr('width', 24*buttonScale)
    .attr('height', 24*buttonScale)
    .attr("xlink:href", d=>`/svg/${active==d.id?'selected':'location'}.svg`)
    .attr("class", "icon")
    .attr("x", xMargin)
    .attr("y", yMargin)
    .each(function(d) { d.icon = this.getBBox() })

    text
    .attr("dy", '0.75em')
    .attr("x", d=>d.icon.width + 6)
    .attr("y", 0)


    buttonInner
    .each(function(d) { d.bbox = this.getBBox() })

    text
    .attr("x", d=>d.icon.width + 6)
    .attr("y", function(d){
      const height = this.getBBox()?.height
      return yMargin + (d.bbox.height - height)/2
    })

    buttons
    .selectAll("rect")
    .data(d=>[d])
    .join("rect")
    .style("opacity", "1")
    .attr("width", d => (d.bbox.width + 2 * xMargin + 2))
    .attr("height", d => (d.bbox.height ))
    .attr("rx", 2 )
    .attr("ry", 2 )
  }
  

  useEffect(()=>{
    fetchJson()
  },[])

  useEffect(()=>{
    if(!list.length && width) return
    render()
  },[width, list, active, buttonScale])
  

  return (
    <NoSSR>
      <svg className='D3_map' width={svgWidth} height={svgHeight}>
        <g className="svg"></g>
      </svg>
    </NoSSR>
)}
 
export default D3Map;