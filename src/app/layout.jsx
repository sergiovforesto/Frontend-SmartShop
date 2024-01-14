import '../globals.css'
import { Nunito_Sans} from 'next/font/google'
const nunito = Nunito_Sans({ subsets: ['latin'] })
import { AuthProvider } from './context/authProvider'
import { CartProvider } from './context/cartProvider'
import { SearchProvider } from './context/searchProvider'

export const metadata = {
  title: 'Shopsmart E-commerce',
  description: 'Buy All about tegnology',
}

export default function RootLayout({ children }) {
  

  return (
    <html lang="en">
      <body className={nunito.className }>
        <div className="bg-fondo">
          <SearchProvider>
            <AuthProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </AuthProvider>
          </SearchProvider>
        </div>
      </body>
    </html>
  )
}
