import "./globals.css";

export const metadata = {
  title: {
    template: "%s | Restaria Liba Bestellen",
    default: "Restaria Liba Bestellen",
  },
  description: "Bestel online eten bij Restaria Liba!",
}

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
