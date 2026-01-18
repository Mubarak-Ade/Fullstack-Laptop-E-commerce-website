import {create} from "zustand";
import {persist} from "zustand/middleware";

type Theme="dark"|"light"

interface ThemeState {
    theme: Theme,
    toggleTheme: () => void,
    setTheme: (theme: Theme) => void
}

export const useThemeStore=create<ThemeState>()(
    persist((set,get) => ({
        theme: "light",
        toggleTheme: () => {
            const newTheme = get().theme === "light" ? "dark" :"light"
            set({theme: newTheme})
        },
        setTheme: (theme) => set({theme})
    }),
        {
            name: "theme-storage"
        }

    )
)