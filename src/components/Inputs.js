import React from 'react'

function Inputs({name,label,type,icon,valeur,onChange,placeholder,min,max,step}) {
  return (
    <div class=" mb-3">
    <label  class="form-label">{label}</label>
    <div class="input-group">
      <span class="input-group-text" >
        <i class={icon}></i>
        </span>
      <input type={type} name={name} class="form-control" value={valeur} onChange={onChange} placeholder={placeholder} min= {min} max={max} step={step}  />
    </div>
  </div>
  )
}

export default Inputs