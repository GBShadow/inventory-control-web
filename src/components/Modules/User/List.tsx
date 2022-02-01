import { useEffect, useRef, useState } from 'react'

import { api } from 'services/apiClient'
import Input from 'components/Input'
import Close from 'assets/icons/Close'
import Search from 'assets/icons/Search'
import Button from 'components/Button'
import Edit from 'assets/icons/Edit'
import ModalCreateUser, {
  ModalCreateUserHandles,
} from 'components/Modals/User/ModalCreate'
import ModalEditUser, {
  ModalEditUserHandles,
} from 'components/Modals/User/ModalEdit'
import normalizedText from 'utils/normalized'
import ModalShowUser, {
  ModalShowUserHandles,
} from 'components/Modals/User/ModalShow'

type User = {
  id: number
  name: string
  surname: string
  username: string
}

export default function UserList() {
  const modalCreateRef = useRef<ModalCreateUserHandles>(null)
  const modalEditRef = useRef<ModalEditUserHandles>(null)
  const modalShowRef = useRef<ModalShowUserHandles>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [reload, setReload] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [filterData, setFilterData] = useState<User[]>([])
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

        const { data } = await api.get('/users')

        setUsers(data)
        setFilterData(data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    })()
  }, [reload])

  useEffect(() => {
    if (filterText === '') {
      setFilterData(users)
    }

    const filter = users.filter(user => {
      const searchText = normalizedText(filterText).toLowerCase()

      return (
        normalizedText(user.name)?.toLowerCase().includes(searchText) ||
        normalizedText(user.surname)?.toLowerCase().includes(searchText) ||
        user.username?.includes(searchText)
      )
    })

    setFilterData(filter)
  }, [users, filterText])

  return (
    <>
      <div className='c-list-users'>
        <header className='c-list-users__header'>
          <Input
            name='search'
            value={filterText}
            placeholder='Pesquisar usuário'
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
          <Button onClick={() => modalCreateRef.current?.openModalCreateUser()}>
            Novo usuário
          </Button>
        </header>

        <div className='c-list-users__container'>
          <div className='c-list-users__head'>
            <div className='c-list-users__row'>
              <strong>Nome</strong>
              <strong>Sobrenome</strong>
              <strong>Username</strong>
            </div>
            <strong>Ações</strong>
          </div>
          <div className='c-list-users__items'>
            {filterData.map((user, index) => (
              <div className='c-list-users__item' key={index}>
                <div
                  className='c-list-users__row'
                  onClick={() =>
                    modalShowRef.current?.openModalShowUser(user.id)
                  }
                >
                  <p>{user.name}</p>
                  <p>{user.surname}</p>
                  <p>{user.username}</p>
                </div>
                <button
                  type='button'
                  onClick={() =>
                    modalEditRef.current?.openModalEditUser(user.id)
                  }
                >
                  <Edit />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalShowUser ref={modalShowRef} reload={setReload} />
      <ModalEditUser ref={modalEditRef} reload={setReload} />
      <ModalCreateUser ref={modalCreateRef} reload={setReload} />
    </>
  )
}
