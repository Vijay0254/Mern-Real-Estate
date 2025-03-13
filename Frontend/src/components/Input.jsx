import React from 'react'

const Input = ({ type, placeholder, id, name, value, onChange, error }) => {
  return (
    <div className='relative'>
      {type === "textarea" ? 
        <textarea className='inp resize-none' rows={4} value={value} onChange={onChange} placeholder={placeholder} id={id} name={name} /> :
        (type === "checkbox" ?
          <label className='flex items-center gap-x-2'>
            <input type={type} checked={value} onChange={onChange} placeholder={placeholder} id={id} name={name} />
            <span>{placeholder}</span>
          </label> :
          (type === "number" ? 
            <div className='gap-x-2 flex items-center'>
              <input className={`rounded-md ${(name === "price" || name === "discountedPrice") ? "w-32" : "w-20"} px-3 py-2 bg-white border border-slate-300`} type={type} value={value} onChange={onChange} placeholder={placeholder} id={id} name={name} />
              <label className={`text-sm font-medium ${(name === "price" || name === "discountedPrice") ? "flex flex-col items-center" : ""}`} htmlFor={name}>{placeholder}{(name === "price" || name === "discountedPrice") && <span className='text-xs'>($ / Month)</span>}</label>
            </div> :
            <input disabled={error == "Disabled"} className='inp' value={value} onChange={onChange} type={type} placeholder={placeholder} id={id} name={name} />
          )
        )
      }
      {error && error !== "Disabled" && <p className='text-red-500 absolute pl-5 mt-[-3px]'>{error}</p>}
    </div>
  )
}

export default Input