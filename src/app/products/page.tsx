import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product/product-card";

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const { category, search } = params;

  const where: Record<string, unknown> = {};

  if (category) {
    where.category = { slug: category };
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <h2 className="font-semibold mb-4">Categories</h2>
          <nav className="space-y-2">
            <a
              href="/products"
              className={`block px-3 py-2 rounded-md hover:bg-gray-100 ${
                !category ? "bg-gray-100 font-medium" : ""
              }`}
            >
              All Products
            </a>
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className={`block px-3 py-2 rounded-md hover:bg-gray-100 ${
                  category === cat.slug ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {cat.name}
              </a>
            ))}
          </nav>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">
              {category
                ? categories.find((c) => c.slug === category)?.name || "Products"
                : "All Products"}
            </h1>
            <span className="text-muted-foreground">
              {products.length} products
            </span>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.images[0]}
                  category={product.category.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
