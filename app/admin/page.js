import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";

async function addProduct(formData) {
    "use server";

    const name = formData.get("name");
    const price = parseFloat(formData.get("price"));
    const category = formData.get("category");

    await prisma.product.create({
        data: { name, price, category },
    });

    revalidatePath("/");
    revalidatePath("/admin");
}

async function deleteProduct(formData) {
    "use server";

    const id = parseInt(formData.get("id"));
    await prisma.product.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath("/admin");
}

export default async function Admin() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <main>
            <h1>Admin <span>Panel</span></h1>

            <div className="admin-wrapper">
                <div className="add-product">
                    <h2>Add Product</h2>
                    <form action={addProduct} className="product-form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Product name"
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price (Rs.)"
                            required
                        />
                        <select name="category" required>
                            <option value="">Select category</option>
                            <option value="Burgers">Burgers</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Drinks">Drinks</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Sides">Sides</option>
                        </select>
                        <button type="submit">Add Product</button>
                    </form>
                </div>

                <div className="products-list">
                    <h2>All Products ({products.length})</h2>
                    {products.map((product) => (
                        <div className="product-row" key={product.id}>
                            <div>
                                <p className="product-name">{product.name}</p>
                                <p className="product-meta">{product.category} — Rs. {product.price}</p>
                            </div>
                            <form action={deleteProduct}>
                                <input type="hidden" name="id" value={product.id} />
                                <button type="submit" className="delete-btn">Delete</button>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}