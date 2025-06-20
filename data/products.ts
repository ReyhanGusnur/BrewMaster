import type { Product } from '../types';

// Sample coffee products data
export const products: Product[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop&auto=format",
    description: "A bright and floral coffee with notes of lemon, bergamot, and jasmine. This single-origin Ethiopian coffee offers a clean, tea-like body with vibrant acidity that awakens your senses. Grown at high altitudes in the Yirgacheffe region, this coffee represents the pinnacle of Ethiopian coffee craftsmanship.",
    roastingOptions: ["Light Roast", "Medium Roast", "Medium-Dark Roast"],
    origin: "Ethiopia",
    flavor: ["Floral", "Citrus", "Tea-like", "Bright"]
  },
  {
    id: 2,
    name: "Colombian Supremo",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0d9?w=400&h=400&fit=crop&auto=format",
    description: "Full-bodied with rich chocolate and caramel notes. This premium Colombian coffee delivers a smooth, well-balanced cup with hints of nuts and citrus. Sourced from high-altitude farms in the Colombian Andes, each bean is carefully selected for its exceptional quality and flavor profile.",
    roastingOptions: ["Light Roast", "Medium Roast", "Dark Roast"],
    origin: "Colombia",
    flavor: ["Chocolate", "Caramel", "Nutty", "Balanced"]
  },
  {
    id: 3,
    name: "Guatemala Antigua",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=400&fit=crop&auto=format",
    description: "Complex and smoky with spicy undertones. Grown in volcanic soil, this coffee features bold flavors with hints of cocoa and subtle smokiness. The unique terroir of Antigua Valley creates a distinctive cup with remarkable depth and character that coffee connoisseurs treasure.",
    roastingOptions: ["Medium Roast", "Medium-Dark Roast", "Dark Roast"],
    origin: "Guatemala",
    flavor: ["Smoky", "Spicy", "Cocoa", "Bold"]
  },
  {
    id: 4,
    name: "Costa Rican Tarrazú",
    price: 28.99,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop&auto=format",
    description: "Bright acidity with wine-like characteristics. This high-altitude Costa Rican coffee offers exceptional clarity with fruity and floral notes. The cool mountain climate and mineral-rich soil of the Tarrazú region produce beans with remarkable complexity and a clean, crisp finish.",
    roastingOptions: ["Light Roast", "Medium Roast"],
    origin: "Costa Rica",
    flavor: ["Wine-like", "Fruity", "Floral", "Bright"]
  },
  {
    id: 5,
    name: "Brazilian Santos",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop&auto=format",
    description: "Smooth and nutty with low acidity. A classic Brazilian coffee that's perfect for espresso blends, offering chocolate and nut flavors with a creamy body. This traditional pulped natural process creates a coffee that's approachable yet sophisticated, perfect for daily enjoyment.",
    roastingOptions: ["Medium Roast", "Medium-Dark Roast", "Dark Roast"],
    origin: "Brazil",
    flavor: ["Nutty", "Chocolate", "Smooth", "Creamy"]
  },
  {
    id: 6,
    name: "Jamaican Blue Mountain",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=400&h=400&fit=crop&auto=format",
    description: "The world's most coveted coffee. Exceptionally smooth with perfect balance, mild flavor, and virtually no bitterness. A true luxury experience that represents the pinnacle of coffee excellence. Grown in the misty peaks of Jamaica's Blue Mountains, this rare coffee is meticulously cultivated and hand-picked.",
    roastingOptions: ["Light Roast", "Medium Roast"],
    origin: "Jamaica",
    flavor: ["Smooth", "Balanced", "Mild", "Luxury"]
  },
  {
    id: 7,
    name: "Kenyan AA",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&auto=format",
    description: "Bold and wine-like with black currant notes. This high-grade Kenyan coffee offers intense flavor with bright acidity and full body. The double fermentation process and high-altitude growing conditions create a cup with remarkable complexity and a distinctive African character that stands out among all origins.",
    roastingOptions: ["Light Roast", "Medium Roast", "Medium-Dark Roast"],
    origin: "Kenya",
    flavor: ["Wine-like", "Black currant", "Bold", "Intense"]
  },
  {
    id: 8,
    name: "Sumatra Mandheling",
    price: 25.99,
    image: "https://images.unsplash.com/photo-1520970014086-2208d157c9e2?w=400&h=400&fit=crop&auto=format",
    description: "Earthy and herbal with full body. This Indonesian coffee features unique processing methods that create complex, earthy flavors with low acidity. The wet-hulling process and tropical climate of Sumatra produce a coffee with distinctive character and a heavy, syrupy body that's truly unique.",
    roastingOptions: ["Medium-Dark Roast", "Dark Roast", "French Roast"],
    origin: "Indonesia",
    flavor: ["Earthy", "Herbal", "Complex", "Full-bodied"]
  }
];