import {
  ReactNode,
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
  FormEvent,
} from 'react'
import EyeOff from 'assets/icons/EyeOff'
import EyeOn from 'assets/icons/EyeOn'

type InputProps = {
  name: string
  label?: string
  iconStart?: ReactNode
  iconEnd?: ReactNode
  span?: number
  register?: any
  textarea?: boolean
  checkbox?: boolean
  password?: boolean
  typeNumber?: boolean
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
  typeNumber,
  iconStart,
  iconEnd,
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

  const handleKeyUp = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      if (typeNumber) {
        let { value } = event.currentTarget

        value = value.replace(/\D/g, '')

        event.currentTarget.value = value
      }
    },
    [typeNumber]
  )

  return (
    <div className='c-input'>
      {label && <label className='c-input__label'>{label}</label>}
      <div className='c-input__block'>
        {iconStart}
        <input
          name={name}
          type={password ? (!onIcon ? 'text' : 'password') : 'text'}
          ref={inputRef}
          onBlur={handleInputBlur}
          onKeyUp={handleKeyUp}
          {...register}
          {...rest}
        />
        {iconEnd
          ? iconEnd
          : password && (
              <button
                type='button'
                className={`c-input__icon-button ${isFilled && 'u-filled'}`}
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
