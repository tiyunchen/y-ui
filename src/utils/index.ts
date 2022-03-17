import { createPortal } from 'react-dom'
import { ReactElement } from 'react'

export type GetContainer = HTMLElement | (() => HTMLElement) | null

export function resolveContainer(
  getContainer: HTMLElement | (() => HTMLElement) | undefined | null
) {
  const container =
    typeof getContainer === 'function' ? getContainer() : getContainer
  return container || document.body
}


export function renderToContainer(
  node: ReactElement,
  getContainer?: GetContainer,
) {
  if (getContainer) {
    const container = resolveContainer(getContainer)
    return createPortal(node, container)
  }
  return node
}
