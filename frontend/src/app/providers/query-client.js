import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 phút
      gcTime: 1000 * 60 * 30, // 30 phút
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
