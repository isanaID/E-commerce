import React from "react";

const Input = ({type, name, placeholder, className, register, onChange}) => {
    return (
        <div className="mx-auto my-auto">
            <input type={type} name={name} placeholder={placeholder} className={className} ref={register} onChange={e => onChange(e.target.value)}/>
        <br />
        </div>
    )
}

export default Input;