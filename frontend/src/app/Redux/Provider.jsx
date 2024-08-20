"use client";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { store } from "./Store";
import { useState } from "react";

export function Providers({ children }) {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
        </Provider>
    )
}