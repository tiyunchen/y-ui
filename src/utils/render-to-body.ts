import ReactDOM from 'react-dom'
import { ReactElement } from 'react'

export function renderToBody(reactEl: ReactElement){
    const container = document.createElement('div')
    document.body.appendChild(container)
    const unmount = function(){
        const unmountResult = ReactDOM.unmountComponentAtNode(container)

        if (unmountResult && container.parentNode) {
            container.parentNode.removeChild(container)
        }
    }
    ReactDOM.render(reactEl, container)
    return unmount
}