import React, { useId } from 'react'
import { forwardRef } from 'react'


//Method 1 of using ForwardRef
const InputButton = forwardRef(function InputButton({
    label,
    type="text",
    className="",
    ...props

}, ref){
    const id = useId();
    return (
        <div>
            {   //means if label is given then do the following code
                label && <label
                htmlFor={id}>
                    {label}
                </label>
            }


            <input
             className={` ${className}`}
             ref={ref}
             type={type}
             id={id}
             {...props}/>
        </div>
    )
})

export default InputButton