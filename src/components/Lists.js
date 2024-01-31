import React from 'react'

export default function lists({ expsData}) {
  return (
    <div>
      {expsData.map((exps) => (
        <div key={exps.id}>{`${exps.item}: ${exps.value}`}</div>
      ))}
    </div>
  )
}
