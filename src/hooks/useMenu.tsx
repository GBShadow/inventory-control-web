import { useContext } from 'react'
import { SidebarContext } from '../context/sidebar'

export function useMenu() {
  const context = useContext(SidebarContext)

  return context
}
