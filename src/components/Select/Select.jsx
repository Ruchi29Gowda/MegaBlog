import React, { forwardRef, useId } from 'react'


function Select({
    label, 
    className="",
    options,
    ...props
}, ref) {
    const id = useId();
  return (
    <div>
        {label && <label htmlFor={id}>
            {label}
            </label>}
        
        <select  id={id} className={`${className}`} {...props}>

            {options?.map((option)=>(
                <option key={option} value={option}>
                    {option}
                </option>
            ))}

        </select>
    </div>
  )
}

export default forwardRef(Select);