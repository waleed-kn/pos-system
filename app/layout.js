import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "POS System",
  description: "Point of Sale System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">🛒 POS<span>System</span></Link>
          <div className="nav-links">
            <Link href="/">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/admin">Admin</Link>
          </div>
        </nav>
        {children}
        <footer>
          <p>Developed by <span>Muhammad Waleed</span></p>
        </footer>
      </body>
    </html>
  );
}