// app/providers.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"       // pone 'dark' o 'light' en <html class="...">
      defaultTheme="system"   // usa el tema del SO por defecto
      enableSystem            // permite 'system'
      disableTransitionOnChange // evita flasheos al cambiar de tema
    >
      {children}
    </NextThemesProvider>
  );
}
