import * as yup from 'yup'

const createProductSchema = yup.object().shape({
  name: yup.string().required('Nome do produto é obrigatório'),
  value: yup.string().required('Valor do produto é obrigatório'),
  quantity: yup
    .string()
    .min(1, 'Quantidade do produto é obrigatório')
    .required('Quantidade do produto é obrigatório'),
})

export default createProductSchema
