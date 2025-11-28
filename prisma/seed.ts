import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const electronics = await prisma.category.upsert({
    where: { slug: "electronics" },
    update: {},
    create: { name: "Electronics", slug: "electronics" },
  });

  const clothing = await prisma.category.upsert({
    where: { slug: "clothing" },
    update: {},
    create: { name: "Clothing", slug: "clothing" },
  });

  const accessories = await prisma.category.upsert({
    where: { slug: "accessories" },
    update: {},
    create: { name: "Accessories", slug: "accessories" },
  });

  // Create products
  const products = [
    {
      name: "Wireless Headphones",
      description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
      price: 199.99,
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"],
      stock: 50,
      featured: true,
      categoryId: electronics.id,
    },
    {
      name: "Smart Watch",
      description: "Track your fitness, receive notifications, and more with this feature-packed smartwatch.",
      price: 299.99,
      images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"],
      stock: 30,
      featured: true,
      categoryId: electronics.id,
    },
    {
      name: "Laptop Stand",
      description: "Ergonomic aluminum laptop stand for better posture and cooling.",
      price: 49.99,
      images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500"],
      stock: 100,
      featured: false,
      categoryId: accessories.id,
    },
    {
      name: "Cotton T-Shirt",
      description: "Comfortable 100% cotton t-shirt in classic fit.",
      price: 29.99,
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"],
      stock: 200,
      featured: false,
      categoryId: clothing.id,
    },
    {
      name: "Denim Jacket",
      description: "Vintage style denim jacket with classic wash.",
      price: 89.99,
      images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"],
      stock: 40,
      featured: true,
      categoryId: clothing.id,
    },
    {
      name: "Leather Wallet",
      description: "Genuine leather bifold wallet with RFID protection.",
      price: 59.99,
      images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=500"],
      stock: 75,
      featured: false,
      categoryId: accessories.id,
    },
    {
      name: "Bluetooth Speaker",
      description: "Portable waterproof speaker with 360° sound.",
      price: 79.99,
      images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"],
      stock: 60,
      featured: true,
      categoryId: electronics.id,
    },
    {
      name: "Sunglasses",
      description: "Polarized UV400 protection sunglasses with metal frame.",
      price: 129.99,
      images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500"],
      stock: 45,
      featured: false,
      categoryId: accessories.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.name.toLowerCase().replace(/\s+/g, "-") },
      update: product,
      create: product,
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
