import './styles/globals.css'

export const metadata = {
  title: 'Nguyen Khanh Huy - Portfolio',
  description: 'Software Engineer Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
