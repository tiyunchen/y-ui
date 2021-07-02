/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'


import * as styles from './styles'

import './props.css'

export const getDefaultValue = ({ defaultValue, type, flowType }) => {
  const propType = flowType ? flowType : type
  if (!defaultValue || !defaultValue.value) return null
  if (defaultValue.value === "''") {
    return '[Empty string]'
  }
  if (propType && propType.name === 'string') {
    return defaultValue.value.replace(/\'/g, '"')
  }
  if (typeof defaultValue.value === 'object' && defaultValue.value.toString) {
    return defaultValue.value.toString()
  }
  return defaultValue.value
}


export const Props = ({ props, getPropType, isToggle }) => {
  const entries = Object.entries(props)
  const bodyData = entries.map(([key, prop])=>{
      const type = getPropType(prop)
      const defaultValue = getDefaultValue(prop)
      const required = prop.required
      const description = prop.description
      return {
          name: key,
          type,
          defaultValue,
          required,
          description
      }
  })
    console.log('dd', bodyData)
  return (
    <div>
        <table className={'prop-table'}>
            <thead>
                <tr>
                    <th>属性</th>
                    <th>描述</th>
                    <th>类型</th>
                    <th>默认值</th>
                </tr>
            </thead>
            <tbody>
            {bodyData.map(tr=>{
                return <tr key={tr.name}>
                    <td>{tr.name}</td>
                    <td>{tr.description}</td>
                    <td>
                        <code><pre>{tr.type}</pre></code>
                    </td>
                    <td><pre>{tr.defaultValue || '-'}</pre></td>
                </tr>
            })}
            </tbody>
        </table>

    </div>
  )
}
