import React, {CSSProperties, useEffect, useRef, useState} from 'react';
export interface SlideProps {
  imgSrc: string
}

const CLASS_PREFIX = 'yui-image-viewer-slides'
const Slide: React.FC<SlideProps> = ({imgSrc}) => {
  const [baseZoom, setZoom] = useState(1)
  useEffect(()=>{
    let metaEl = document.querySelector('meta[name="viewport"]');
    let metaCtt = metaEl ? metaEl.getAttribute('content') : '';
    let matchScale = metaCtt?.match(/initial\-scale=([\d\.]+)/);
    let scale = matchScale ? (1 / parseFloat(matchScale[1])) : 1;
    setZoom(scale)
    console.log('scale', scale)
  })
  const slideItemRef = useRef<HTMLDivElement>(null)

  let imgStyle: CSSProperties & {
    '--zoom': number
  } = {
    '--zoom': baseZoom
  }
  return (
    <div className={`${CLASS_PREFIX}-content-item`} ref={slideItemRef}>
      <div className={`${CLASS_PREFIX}-content-item-wrap`}>
        <img
          src={imgSrc}
          alt=""
          style={imgStyle}
        />
      </div>
    </div>
  )
};

export default Slide;
