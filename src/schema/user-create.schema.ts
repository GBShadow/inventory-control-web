import * as yup from 'yup'

const userCreateSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  surname: yup.string().required('Sobrenome é obrigatório'),
  username: yup.string().required('Username é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('Senha obrigatória'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Confirmação da senha esta incorreta'),
})

export default userCreateSchema
