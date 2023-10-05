import React from 'react'
import { Circles } from 'react-loader-spinner'

export default function Loader({label} : {label : any}) {
  return (
        <aside className="flex flex-col justify-center items-center p-5">
          <Circles wrapperClass="" height={40} width={40} ariaLabel={'Compressing Files'} />
          <label className='m-auto'>{label}</label>
        </aside>
  )      
}
