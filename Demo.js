// demo.js
export const mostSoldProducts = [
    { id: 1, name: "Product A", totalSold: 300, revenue: 9000 },
    { id: 2, name: "Product B", totalSold: 250, revenue: 7500 },
    { id: 3, name: "Product C", totalSold: 200, revenue: 6000 },
    { id: 4, name: "Product D", totalSold: 180, revenue: 5400 },
    { id: 5, name: "Product E", totalSold: 150, revenue: 4500 },
  ];
  
  // lowStock.js
export const lowStockItems = [
  { id: 1, name: "Product X", stock: 60 },
  { id: 2, name: "Product Y", stock: 75 },
  { id: 3, name: "Product Z", stock: 85 },
  { id: 4, name: "Product W", stock: 90 },
  { id: 5, name: "Product V", stock: 95 },
];


export const inventoryData = [
  {
    id: 1,
    name: "Marker",
    category: "Stationery",
    quantity: 120,
    subQuantity: 12, // Number of markers in a box
    price: 15,
    lastUpdated: "2024-11-28",
  },
  {
    id: 2,
    name: "Notebook",
    category: "Stationery",
    quantity: 200,
    subQuantity: 5, // Number of notebooks in a pack
    price: 50,
    lastUpdated: "2024-11-27",
  },
  {
    id: 3,
    name: "Printer Paper",
    category: "Office Supplies",
    quantity: 500,
    subQuantity: 500, // Number of sheets in a ream
    price: 120,
    lastUpdated: "2024-11-25",
  },
  {
    id: 4,
    name: "Whiteboard",
    category: "Classroom Supplies",
    quantity: 25,
    subQuantity: 1, // Single unit, no sub-units
    price: 600,
    lastUpdated: "2024-11-24",
  },
  {
    id: 5,
    name: "Pen",
    category: "Stationery",
    quantity: 300,
    subQuantity: 10, // Number of pens in a box
    price: 10,
    lastUpdated: "2024-11-29",
  },
  {
    id: 6,
    name: "Projector",
    category: "Electronics",
    quantity: 8,
    subQuantity: 1, // Single unit, no sub-units
    price: 45000,
    lastUpdated: "2024-11-22",
  },
  {
    id: 7,
    name: "File Folder",
    category: "Office Supplies",
    quantity: 150,
    subQuantity: 10, // Number of folders in a pack
    price: 30,
    lastUpdated: "2024-11-28",
  },
  {
    id: 8,
    name: "Calculator",
    category: "Electronics",
    quantity: 50,
    subQuantity: 1, // Single unit, no sub-units
    price: 1200,
    lastUpdated: "2024-11-26",
  },
  {
    id: 9,
    name: "Stapler",
    category: "Office Supplies",
    quantity: 40,
    subQuantity: 1, // Single unit, no sub-units
    price: 200,
    lastUpdated: "2024-11-23",
  },
  {
    id: 10,
    name: "Eraser",
    category: "Stationery",
    quantity: 500,
    subQuantity: 20, // Number of erasers in a pack
    price: 5,
    lastUpdated: "2024-11-28",
  },
];

export const suppliers = [
  {
    name: 'John Doe',
    contact: '9876543210',
    email: 'john.doe@example.com',
    businessName: 'Doe Enterprises',
    businessEmail: 'contact@doeenterprises.com',
    website: 'https://www.doeenterprises.com',
    address: '1234 Elm Street, Springfield, IL, 62701'
  },
  {
    name: 'Jane Smith',
    contact: '9876543211',
    email: 'jane.smith@example.com',
    businessName: 'Smith Goods',
    businessEmail: 'info@smithgoods.com',
    website: 'https://www.smithgoods.com',
    address: '5678 Oak Avenue, Springfield, IL, 62702'
  },
  {
    name: 'Michael Johnson',
    contact: '9876543212',
    email: 'michael.johnson@example.com',
    businessName: 'Johnson Supplies',
    businessEmail: 'sales@johnsonsupplies.com',
    website: 'https://www.johnsonsupplies.com',
    address: '9876 Pine Road, Springfield, IL, 62703'
  },
  {
    name: 'Emily Davis',
    contact: '9876543213',
    email: 'emily.davis@example.com',
    businessName: 'Davis Distributors',
    businessEmail: 'contact@davisdistributors.com',
    website: 'https://www.davisdistributors.com',
    address: '1357 Maple Drive, Springfield, IL, 62704'
  },
  {
    name: 'Robert Brown',
    contact: '9876543214',
    email: 'robert.brown@example.com',
    businessName: 'Brown Manufacturing',
    businessEmail: 'support@brownmanufacturing.com',
    website: 'https://www.brownmanufacturing.com',
    address: '2468 Cedar Lane, Springfield, IL, 62705'
  },
  {
    name: 'Linda Wilson',
    contact: '9876543215',
    email: 'linda.wilson@example.com',
    businessName: 'Wilson Traders',
    businessEmail: 'sales@wilsontraders.com',
    website: 'https://www.wilsontraders.com',
    address: '3690 Birch Street, Springfield, IL, 62706'
  },
  {
    name: 'David Miller',
    contact: '9876543216',
    email: 'david.miller@example.com',
    businessName: 'Miller Enterprises',
    businessEmail: 'info@millerenterprises.com',
    website: 'https://www.millerenterprises.com',
    address: '4820 Pinehurst Drive, Springfield, IL, 62707'
  },
  {
    name: 'Sarah Moore',
    contact: '9876543217',
    email: 'sarah.moore@example.com',
    businessName: 'Moore Trading',
    businessEmail: 'contact@mooretrading.com',
    website: 'https://www.mooretrading.com',
    address: '5932 Willow Road, Springfield, IL, 62708'
  },
  {
    name: 'James Taylor',
    contact: '9876543218',
    email: 'james.taylor@example.com',
    businessName: 'Taylor Imports',
    businessEmail: 'sales@taylorimports.com',
    website: 'https://www.taylorimports.com',
    address: '7045 Elm Avenue, Springfield, IL, 62709'
  },
  {
    name: 'Jessica Martinez',
    contact: '9876543219',
    email: 'jessica.martinez@example.com',
    businessName: 'Martinez Wholesale',
    businessEmail: 'contact@martinezwholesale.com',
    website: 'https://www.martinezwholesale.com',
    address: '8156 Birch Avenue, Springfield, IL, 62710'
  }
];

export const demoPurchases = [
  {
    name: "Item A",
    category: "Electronics",
    supplier_id:("60b8d295b0b7f5b1bfa1e1a2"), // Example Supplier ID
    price: 100,
    quantity: 5,
    subUnit: 1,
    description: "A high-quality electronic device.",
    isPaid: true,
    paidPrice: 100, // Paid price
    discount: 10
  },
  {
    name: "Item B",
    category: "Furniture",
    supplier_id: ("60b8d295b0b7f5b1bfa1e1a2"), // Example Supplier ID
    price: 200,
    quantity: 3,
    subUnit: 1,
    description: "Comfortable office chair.",
    isPaid: false,
    paidPrice: 100, // Paid price so far
    discount: 20
  },
  {
    name: "Item C",
    category: "Stationery",
    supplier_id: ("60b8d295b0b7f5b1bfa1e1a2"), // Example Supplier ID
    price: 50,
    quantity: 10,
    subUnit: 1,
    description: "Set of premium pens.",
    isPaid: false,
    paidPrice: 0, // Nothing paid yet
    discount: 0
  }
];

export const demoSales = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    soldTo: "John Doe",
    soldPrice: 1200,
    soldDate: "2024-11-10",
  },
  {
    id: 2,
    name: "Phone",
    category: "Electronics",
    soldTo: "Jane Smith",
    soldPrice: 800,
    soldDate: "2024-11-12",
  },
  {
    id: 3,
    name: "Headphones",
    category: "Accessories",
    soldTo: "Alice Brown",
    soldPrice: 150,
    soldDate: "2024-11-14",
  },
  {
    id: 4,
    name: "Keyboard",
    category: "Accessories",
    soldTo: "Bob Johnson",
    soldPrice: 100,
    soldDate: "2024-11-15",
  },
  {
    id: 5,
    name: "Desk Chair",
    category: "Furniture",
    soldTo: "Charlie White",
    soldPrice: 250,
    soldDate: "2024-11-18",
  },
  {
    id: 6,
    name: "Monitor",
    category: "Electronics",
    soldTo: "Diana Green",
    soldPrice: 400,
    soldDate: "2024-11-20",
  },
  {
    id: 7,
    name: "Smartwatch",
    category: "Electronics",
    soldTo: "Emily Clark",
    soldPrice: 300,
    soldDate: "2024-11-22",
  },
  {
    id: 8,
    name: "Mouse",
    category: "Accessories",
    soldTo: "Frank Harris",
    soldPrice: 50,
    soldDate: "2024-11-25",
  },
  {
    id: 9,
    name: "Printer",
    category: "Electronics",
    soldTo: "Grace Lee",
    soldPrice: 200,
    soldDate: "2024-11-26",
  },
  {
    id: 10,
    name: "Office Chair",
    category: "Furniture",
    soldTo: "Henry King",
    soldPrice: 300,
    soldDate: "2024-11-28",
  },
];






