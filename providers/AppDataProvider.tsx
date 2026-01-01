'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { AppDataType } from '@/dal'

type AppDataContextType = {
  data: Array<AppDataType>
}

// 1️⃣ Create a context (filled data in layout in server side but used within client components) with a default value
const AppDataContext = createContext<AppDataContextType>({
  data: []
})

interface props {
  children: ReactNode
  value: AppDataContextType
}

const context: AppDataContextType = {
  data: []
}

export const AppDataProvider = ({ children, value = context }: props) => {
  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  )
}

// 2️⃣ Create a hook to access the context value
export const useAppData = () => {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within an AppDataProvider')
  return ctx
}