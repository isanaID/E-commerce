import React from "react";

const Input = ({type, name, placeholder, className, register, onChange}) => {
    return (
        <div>
        <label>
            
        </label><input type={type} name={name} placeholder={placeholder} className={className} onChange={onChange}/>
        <br />
        </div>
    )
}

export default Input;