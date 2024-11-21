import './global.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './_components/NavBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className='app'>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}