import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TokenState {
  token: string;
  setToken: (s: string) => void;
}

export const useToken = create<TokenState>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (s) => set(() => ({ token: s }))
      }),
      {
        name: "token"
      }
    )
  )
);
