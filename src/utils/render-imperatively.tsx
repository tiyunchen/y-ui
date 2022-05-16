import React, {useEffect, FC, ReactElement, useState, useRef, useImperativeHandle} from 'react'

import {renderToBody} from './render-to-body'

type WrapperHandler = {
    close: ()=>void
}

type ImperativeProps = {
    visible?: boolean,
    onClose?: ()=>void,
    afterClose?: ()=>void
}


export function renderImperatively(element: ReactElement<ImperativeProps>){
    const Wrapper = React.forwardRef<WrapperHandler>((_, ref)=>{
        const [visible, setVisible] = useState(false)
        const closeRef = useRef(false)
        useEffect(()=>{
            if(!closeRef.current){
                setVisible(true)
            } else {
                afterClose()
            }
        }, [])

        function onClose(){
          closeRef.current = true
          setVisible(false)
          element.props.onClose?.()
        }

        function afterClose(){
            unmount()
            element.props.afterClose?.()
        }

        useImperativeHandle(ref, ()=>({
            close: onClose
        }))

        return React.cloneElement(element, {
            ...element.props,
            visible,
            onClose,
            afterClose
        })

    })

    const wrapperRef = React.createRef<WrapperHandler>()

    const unmount = renderToBody(<Wrapper ref={wrapperRef} />)

    function close(){
        wrapperRef.current?.close()
    }

    return {
        close
    }
}
