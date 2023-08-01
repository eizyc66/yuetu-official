 
const Index = ({ src, width = 114, height = 18, className= '', imgClassName='object-contain', style = {} }) => {
  return (
    <div className={`${className} relative overflow-hidden`} style={style}>
      <div className='w-full h-0' style={{paddingBottom:`${height*100/width}%`}}></div>
      {
        src?<img src={src} className={`${imgClassName} absolute top-0 h-full left-0 w-full`}></img>:null
      }
    </div>
)}
 
export default Index;