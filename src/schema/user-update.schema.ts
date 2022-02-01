import * as yup from 'yup'

const userUpdateSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  surname: yup.string().required('Sobrenome é obrigatório'),
  username: yup.string().required('Username é obrigatório'),
})

export default userUpdateSchema
