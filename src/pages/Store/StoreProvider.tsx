import React from "react";
import { rootStore, type RootStore } from "./rootstore/rootStore";

export const StoreContext = React.createContext<RootStore | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
}
