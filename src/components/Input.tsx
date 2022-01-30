import {
  ReactNode,
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react'
import EyeOff from 'assets/icons/EyeOff'
import EyeOn from 'assets/icons/EyeOn'

type InputProps = {
  name: string
  label?: string
  icon?: ReactNode
  span?: number
  register?: any
  textarea?: boolean
  checkbox?: boolean
  password?: boolean
  error?: boolean
  helperText?: string
  containerClass?: string
  editBlock?: boolean
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>

export default function Input({
  name,
  span,
  label,
  register,
  checkbox,
  password,
  icon,
  error,
  helperText,
  editBlock,
  ...rest
}: InputProps) {
  const [onIcon, setOnIcon] = useState(true)
  const [isFilled, setIsFilled] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputBlur = useCallback(() => {
    setIsFilled(!!inputRef.current?.value)
  }, [])

  return (
    <div className='c-input'>
      {label && <label className='c-input__label'>{label}</label>}
      <div className='c-input__block'>
        <input
          name={name}
          type={password ? (!onIcon ? 'text' : 'password') : 'text'}
          ref={inputRef}
          onBlur={handleInputBlur}
          {...register}
          {...rest}
        />
        {icon
          ? icon
          : password && (
              <button
                type='button'
                className='c-input__icon-button'
                onClick={() => setOnIcon(!onIcon)}
              >
                {onIcon ? <EyeOn /> : <EyeOff />}
              </button>
            )}
      </div>
      {error && <p className='c-input__error-message'>{helperText}</p>}
    </div>
  )
}
