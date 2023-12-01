'use client'

import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface CheckboxWithLabelProps {
    label: string
    register: UseFormRegister<any>
    name: string
}

const CheckboxWithLabel = ({ label, register, name }: CheckboxWithLabelProps) => {
    const [value, setValue] = useState(true)

    function handle(e: string | boolean) {
        if (typeof e === 'string') {
            if (e === 'on') {
                setValue(true)
            } else {
                setValue(false)
            }
        } else {
            setValue(e)
        }
    }

    return (
        <div className='flex flex-row justify-start items-center'>
            <input {...register(name)} type='checkbox' checked={value} id={name} onChange={(e) => handle(e.target.checked)} className='form-checkbox h-5 w-5 text-black bg-black data-[state=checked]:bg-black'/>
            <p className='pl-2 text-base'>{label}</p>
        </div>
    )
}

export default CheckboxWithLabel