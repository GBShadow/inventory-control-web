import { useEffect, useRef, useState } from 'react'

import { api } from 'services/apiClient'
import Input from 'components/Input'
import Close from 'assets/icons/Close'
import Search from 'assets/icons/Search'
import Button from 'components/Button'
import Edit from 'assets/icons/Edit'
import ModalCreate, { ModalCreateHandles } from 'components/Modals/ModalCreate'
import ModalEdit, { ModalEditHandles } from 'components/Modals/ModalEdit'
import { formatValue } from 'utils/formatValue'
import normalizedText from 'utils/normalized'
import ModalShow, { ModalShowHandles } from 'components/Modals/ModalShow'

type Product = {
  id: number
  name: string
  value: number
  quantity: number
}

export default function ProductList() {
  const modalCreateRef = useRef<ModalCreateHandles>(null)
  const modalEditRef = useRef<ModalEditHandles>(null)
  const modalShowRef = useRef<ModalShowHandles>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [reload, setReload] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [filterData, setFilterData] = useState<Product[]>([])
  const [filterText, setFilterText] = useState('')

  const handleClear = () => {
    setFilterText('')
  }

  useEffect(() => {
    ;(async () => {
      try {
        setReload(false)
        setLoading(true)
        setError(false)

        const { data } = await api.get('/products')

        const productsSerialized = data.map(product => ({
          ...product,
          value: formatValue(product.value),
        }))

        setProducts([
          ...productsSerialized,
          ...productsSerialized,
          ...productsSerialized,
          ...productsSerialized,
        ])
        setFilterData([
          ...productsSerialized,
          ...productsSerialized,
          ...productsSerialized,
          ...productsSerialized,
        ])
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    })()
  }, [reload])

  useEffect(() => {
    if (filterText === '') {
      setFilterData(products)
    }

    const filter = products.filter(product => {
      const searchText = normalizedText(filterText).toLowerCase()

      return (
        normalizedText(product.name)?.toLowerCase().includes(searchText) ||
        product.value?.toString().includes(searchText) ||
        product.quantity?.toString().includes(searchText)
      )
    })

    setFilterData(filter)
  }, [products, filterText])

  return (
    <>
      <div className='c-list-products'>
        <header className='c-list-products__header'>
          <Input
            name='search'
            value={filterText}
            placeholder='Pesquisar produto'
            onChange={e => setFilterText(e.target.value)}
            iconStart={<Search className='c-icon' />}
            iconEnd={
              filterText && (
                <button type='button' onClick={handleClear}>
                  <Close className='c-icon' />
                </button>
              )
            }
          />
          <Button onClick={() => modalCreateRef.current?.openModalCreate()}>
            Novo produto
          </Button>
        </header>

        <div className='c-list-products__container'>
          <div className='c-list-products__head'>
            <div className='c-list-products__row'>
              <strong>Name</strong>
              <strong>Valor</strong>
              <strong>Quantidade</strong>
            </div>
            <strong>Ações</strong>
          </div>
          <div className='c-list-products__items'>
            {filterData.map((product, index) => (
              <div className='c-list-products__item' key={index}>
                <div
                  className='c-list-products__row'
                  onClick={() =>
                    modalShowRef.current?.openModalShow(product.id)
                  }
                >
                  <p>{product.name}</p>
                  <p>{product.value}</p>
                  <p className='u-padding'>{product.quantity}</p>
                </div>
                <button
                  type='button'
                  onClick={() =>
                    modalEditRef.current?.openModalEdit(product.id)
                  }
                >
                  <Edit />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalShow ref={modalShowRef} reload={setReload} />
      <ModalEdit ref={modalEditRef} reload={setReload} />
      <ModalCreate ref={modalCreateRef} />
    </>
  )
}
