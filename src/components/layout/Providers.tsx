import { ThemeProvider } from "./ThemeProvider";
import { SessionProvider } from "./SessionProvider";
import { QueryProvider } from "./QueryProvider";

/**
 * Root Providers wrapper.
 * Composes all global providers in the correct dependency order:
 * ThemeProvider → QueryProvider → SessionProvider
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <SessionProvider>{children}</SessionProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
