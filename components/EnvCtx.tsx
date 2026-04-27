'use client'

import { createContext, useContext } from 'react'
import type { Environment } from '@/lib/types'

export const EnvCtx = createContext<Environment>('home')
export const useEnv = () => useContext(EnvCtx)
