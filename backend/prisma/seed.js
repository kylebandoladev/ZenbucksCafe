import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
      description: "Full system access",
    },
  });

  const managerRole = await prisma.role.upsert({
    where: { name: "manager" },
    update: {},
    create: {
      name: "manager",
      description: "Inventory, catalog, and employee management",
    },
  });

  const cashierRole = await prisma.role.upsert({
    where: { name: "cashier" },
    update: {},
    create: {
      name: "cashier",
      description: "POS operations and customer service",
    },
  });

  console.log("✅ Roles created");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@zenbucks.com" },
    update: {},
    create: {
      email: "admin@zenbucks.com",
      passwordHash: hashedPassword,
      fullName: "System Administrator",
      phone: "+1234567890",
      status: "ACTIVE",
    },
  });

  // Assign admin role
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  });

  // Create manager user
  const managerUser = await prisma.user.upsert({
    where: { email: "manager@zenbucks.com" },
    update: {},
    create: {
      email: "manager@zenbucks.com",
      passwordHash: hashedPassword,
      fullName: "Store Manager",
      phone: "+1234567891",
      status: "ACTIVE",
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: managerUser.id,
        roleId: managerRole.id,
      },
    },
    update: {},
    create: {
      userId: managerUser.id,
      roleId: managerRole.id,
    },
  });

  // Create cashier user
  const cashierUser = await prisma.user.upsert({
    where: { email: "cashier@zenbucks.com" },
    update: {},
    create: {
      email: "cashier@zenbucks.com",
      passwordHash: hashedPassword,
      fullName: "Cashier Staff",
      phone: "+1234567892",
      status: "ACTIVE",
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: cashierUser.id,
        roleId: cashierRole.id,
      },
    },
    update: {},
    create: {
      userId: cashierUser.id,
      roleId: cashierRole.id,
    },
  });

  console.log("✅ Users created");

  // Create employees
  await prisma.employee.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      position: "System Administrator",
      hireDate: new Date("2024-01-01"),
      hourlyRate: 0,
      status: "ACTIVE",
    },
  });

  await prisma.employee.upsert({
    where: { userId: managerUser.id },
    update: {},
    create: {
      userId: managerUser.id,
      position: "Store Manager",
      hireDate: new Date("2024-01-15"),
      hourlyRate: 25.0,
      status: "ACTIVE",
    },
  });

  await prisma.employee.upsert({
    where: { userId: cashierUser.id },
    update: {},
    create: {
      userId: cashierUser.id,
      position: "Cashier",
      hireDate: new Date("2024-02-01"),
      hourlyRate: 15.0,
      status: "ACTIVE",
    },
  });

  console.log("✅ Employees created");

  // Create categories
  const coffeeCategory = await prisma.category.upsert({
    where: { name: "Coffee" },
    update: {},
    create: {
      name: "Coffee",
      description: "Freshly brewed coffee drinks",
      isActive: true,
    },
  });

  const foodCategory = await prisma.category.upsert({
    where: { name: "Food" },
    update: {},
    create: {
      name: "Food",
      description: "Delicious meals and snacks",
      isActive: true,
    },
  });

  const drinksCategory = await prisma.category.upsert({
    where: { name: "Drinks" },
    update: {},
    create: {
      name: "Drinks",
      description: "Refreshing beverages",
      isActive: true,
    },
  });

  console.log("✅ Categories created");

  // Create products
  const products = [
    {
      sku: "COF001",
      name: "Espresso",
      description: "Rich and bold espresso shot",
      categoryId: coffeeCategory.id,
      defaultPrice: 2.5,
    },
    {
      sku: "COF002",
      name: "Americano",
      description: "Espresso with hot water",
      categoryId: coffeeCategory.id,
      defaultPrice: 3.5,
    },
    {
      sku: "COF003",
      name: "Latte",
      description: "Espresso with steamed milk",
      categoryId: coffeeCategory.id,
      defaultPrice: 4.5,
    },
    {
      sku: "COF004",
      name: "Cappuccino",
      description: "Espresso with equal parts steamed milk and foam",
      categoryId: coffeeCategory.id,
      defaultPrice: 4.0,
    },
    {
      sku: "FOOD001",
      name: "Croissant",
      description: "Buttery, flaky pastry",
      categoryId: foodCategory.id,
      defaultPrice: 3.25,
    },
    {
      sku: "FOOD002",
      name: "Sandwich",
      description: "Fresh deli sandwich",
      categoryId: foodCategory.id,
      defaultPrice: 8.5,
    },
    {
      sku: "DRINK001",
      name: "Orange Juice",
      description: "Freshly squeezed orange juice",
      categoryId: drinksCategory.id,
      defaultPrice: 3.0,
    },
    {
      sku: "DRINK002",
      name: "Green Tea",
      description: "Premium green tea",
      categoryId: drinksCategory.id,
      defaultPrice: 2.75,
    },
  ];

  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { sku: productData.sku },
      update: {},
      create: productData,
    });

    // Create inventory item for each product
    await prisma.inventoryItem.upsert({
      where: { productId: product.id },
      update: {},
      create: {
        productId: product.id,
        quantityOnHand: 100,
        reorderLevel: 20,
        unitCost: productData.defaultPrice * 0.6, // 60% cost ratio
      },
    });
  }

  console.log("✅ Products and inventory created");

  // Create sample customers
  await prisma.customer.upsert({
    where: { email: "john.doe@email.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1234567893",
      loyaltyPoints: 50,
    },
  });

  await prisma.customer.upsert({
    where: { email: "jane.smith@email.com" },
    update: {},
    create: {
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1234567894",
      loyaltyPoints: 120,
    },
  });

  console.log("✅ Customers created");

  // Create sample supplier
  await prisma.supplier.create({
    data: {
      name: "Coffee Bean Supply Co.",
      email: "orders@coffeebeansupply.com",
      phone: "+1234567895",
      address: "123 Coffee Street, Bean City, BC 12345",
      isActive: true,
    },
  });

  console.log("✅ Suppliers created");

  console.log("🎉 Database seeded successfully!");
  console.log("\n📋 Login credentials:");
  console.log("Admin: admin@zenbucks.com / admin123");
  console.log("Manager: manager@zenbucks.com / admin123");
  console.log("Cashier: cashier@zenbucks.com / admin123");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
