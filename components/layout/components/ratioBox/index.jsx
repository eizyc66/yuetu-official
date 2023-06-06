 
const Index = ({ width = 114, height = 18, className= '', style = {} }) => {
  return (
    <div className={className} style={style}>
      <div className='w-full h-0' style={{paddingBottom:`${height*100/width}%`}}></div>
    </div>
)}
 
export default Index;