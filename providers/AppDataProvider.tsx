'use client'

import { createContext, useContext, type ReactNode } from 'react'

export type AppData = {
  allProfile: Array<unknown>
}

// 1️⃣ Create a server context with a default value
export const AppDataContext = createContext<AppData>({
  allProfile: []
})

type AppDataProviderProps = {
  children: ReactNode
  value?: AppData
}

const initialValue: AppData = {
  allProfile: []
}

export const AppDataProvider = ({
  children,
  value = initialValue
}: AppDataProviderProps) => {
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