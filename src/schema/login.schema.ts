import * as yup from 'yup'

const userUpdateSchema = yup.object().shape({
  username: yup.string().required('Username é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('Senha obrigatória'),
})

export default userUpdateSchema
