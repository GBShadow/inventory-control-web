import { createContext, ReactNode, useState } from 'react'

type SidebarContextData = {
  menuToggle: () => void
  menuIsOpen: boolean
}

type MenuProviderProps = {
  children: ReactNode
}

export const SidebarContext = createContext({} as SidebarContextData)

export function MenuProvider({ children }: MenuProviderProps) {
  const [menuIsOpen, setMenuIsOpen] = useState(true)

  function menuToggle() {
    setMenuIsOpen(!menuIsOpen)
  }

  return (
    <SidebarContext.Provider value={{ menuToggle, menuIsOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}
