import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query-client.js";

export function AppProviders({ children }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
