import {create} from 'zustand'
import { persist } from 'zustand/middleware'

interface IUseTheme {
    dark: boolean,
    changeTheme: () => void
}
const useTheme = create<IUseTheme>()(
    persist(
        (set) => ({
            dark: false,
            changeTheme: () => set((state) => ({dark: !state.dark})) 
        }),
        {
            name: 'theme-storage'
        }
    )
)

export default useTheme;