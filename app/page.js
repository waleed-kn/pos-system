import Link from "next/link";
import prisma from "../lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <h1>Our <span>Menu</span></h1>

      {products.length === 0 && (
        <div className="empty">
          <p>No products yet.</p>
          <Link href="/admin">Go to Admin to add products →</Link>
        </div>
      )}

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-category">{product.category}</div>
            <h2>{product.name}</h2>
            <p className="price">Rs. {product.price}</p>
            <Link href={`/cart?add=${product.id}`} className="add-btn">
              Add to Cart +
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}