import React, { useState } from 'react'
import { Eyes } from '../icons/icons'
import { Input } from '../ui/input'

function PasswordInput({field, placeholder="Enter your password"}:{field: any, placeholder?: string}) {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className='relative'>
            <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
            />
            <button
                type="button"
                className='absolute cursor-pointer right-1 top-1/2 -translate-1/2'
                onClick={() => setShowPassword(prevState => !prevState)}
            >
                <Eyes />
            </button>
        </div>
    )
}

export default PasswordInput