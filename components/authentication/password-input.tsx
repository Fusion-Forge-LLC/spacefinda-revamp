import React, { useState } from 'react'
import { EyeSlash, Eyes } from '../icons/icons'
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
            {/* Hidden by default: slashed eye while hidden, open eye once the password is shown */}
            <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className='absolute cursor-pointer right-1 top-1/2 -translate-1/2 rounded outline-none focus-visible:ring-2 focus-visible:ring-primary/40'
                onClick={() => setShowPassword(prevState => !prevState)}
            >
                {showPassword ? <Eyes /> : <EyeSlash />}
            </button>
        </div>
    )
}

export default PasswordInput