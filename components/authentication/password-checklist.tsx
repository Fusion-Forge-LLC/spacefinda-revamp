import React from 'react'
import { CheckIcon, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PasswordChecklistProps {
  password: string
  className?: string
}

export const passwordRequirements = [
  { id: 'uppercase', label: "At least 1 uppercase", test: (pw: string) => /[A-Z]/.test(pw) },
  { id: 'lowercase', label: "At least 1 lower case", test: (pw: string) => /[a-z]/.test(pw) },
  { id: 'number', label: "At least 1 number", test: (pw: string) => /[0-9]/.test(pw) },
  { id: 'symbol', label: "At least 1 symbol", test: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
  { id: 'length', label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
]

export function PasswordChecklist({ password, className }: PasswordChecklistProps) {
  return (
    <div className={cn("space-y-3 bg-white p-4 rounded-xl border border-light-Grey shadow-2xl z-50", className)}>
      <div className='grid grid-cols-5 gap-2'>
        {passwordRequirements.map((item, index) => {
          const totalChecked = passwordRequirements.filter(item => item.test(password)).length;
          return (
            <span 
              key={index} 
              className={cn(
                'h-1.5 rounded-full transition-colors duration-300', 
                index < totalChecked ? "bg-green-500" : "bg-light-Grey" 
              )} 
            />
          )
        })}
      </div>
      <p className="text-sm font-semibold text-Text-dark">Password must contain:</p>
      <ul className="space-y-2">
        {passwordRequirements.map((req) => {
          const isMet = req.test(password)
          return (
            <li
              key={req.id}
              className={cn(
                "flex items-center gap-2 text-xs font-['Poppins'] tracking-tight transition-colors duration-300",
                isMet ? "text-green-600" : "text-Text-body-text"
              )}
            >
              <span className={cn(
                "flex items-center justify-center size-4 rounded-full text-white transition-all duration-300", 
                isMet ? "bg-green-500" : "bg-gray-300"
              )}>
                {isMet ? <CheckIcon size={10} strokeWidth={3} /> : <XIcon size={10} strokeWidth={3} />}
              </span>
              {req.label}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
