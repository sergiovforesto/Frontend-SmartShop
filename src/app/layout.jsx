import '../globals.css'
import { Nunito_Sans} from 'next/font/google'
const nunito = Nunito_Sans({ subsets: ['latin'] })
import { AuthProvider } from './context/authProvider'
import { CartProvider } from './context/cartProvider'

export const metadata = {
  title: 'Shopsmart E-commerce',
  description: 'Buy All about tegnology',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript">
        </script>
      </head>
      <body className={nunito.className }>
        <div className="bg-fondo">
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}
