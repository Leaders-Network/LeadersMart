import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    subcategories: [
      {
        id: '1-1',
        name: 'Phones and Tablets',
        items: [
          'Smartphones (Samsung, Apple, Xiaomi, Tecno)',
          'Feature phones',
          'Tablets',
          'Smartwatches',
          'Power banks',
          'Screen protectors',
          'Phone cases',
          'Charging cables',
          'Bluetooth headsets',
        ],
      },
      {
        id: '1-2',
        name: 'Televisions and Video',
        items: [
          'Smart TVs (LED, OLED, QLED)',
          'Satellite TV accessories',
          'Home theatre systems',
          'Soundbars',
          'DVD/Blu-ray players',
          'Projectors',
        ],
      },
      {
        id: '1-3',
        name: 'Audio',
        items: [
          'Headphones (wireless, wired)',
          'Earbuds',
          'Portable Bluetooth speakers',
          'Hi-Fi systems',
          'Car audio',
        ],
      },
      {
        id: '1-4',
        name: 'Computers and Accessories',
        items: [
          'Laptops (gaming, business)',
          'Desktop PCs',
          'Printers and scanners',
          'Monitors',
          'External hard drives and SSDs',
          'USB flash drives',
          'Routers and modems',
          'Keyboards',
          'Mice',
          'Software (antivirus, MS Office)',
        ],
      },
      {
        id: '1-5',
        name: 'Video Games',
        items: [
          'Consoles (PS5, Xbox, Nintendo Switch)',
          'Game titles and discs',
          'Controllers',
          'Gaming chairs',
          'VR headsets',
        ],
      },
      {
        id: '1-6',
        name: 'Cameras and Drones',
        items: [
          'DSLR cameras',
          'Mirrorless cameras',
          'Action cameras',
          'Security cameras',
          'Drones',
          'Camera lenses',
          'Memory cards',
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    subcategories: [
      {
        id: '2-1',
        name: "Women's Fashion",
        items: [
          'Dresses (casual, evening)',
          'Tops and T-shirts',
          'Trousers and jeans',
          'Skirts',
          'Lingerie and sleepwear',
          'Sportswear',
          'Shoes (heels, sneakers, sandals)',
          'Handbags and purses',
          'Jewelry and watches',
          'Traditional wear',
        ],
      },
      {
        id: '2-2',
        name: "Men's Fashion",
        items: [
          'T-shirts and polos',
          'Shirts (formal, casual)',
          'Jeans and trousers',
          'Suits and blazers',
          'Underwear and socks',
          'Sportswear',
          'Shoes (formal, sneakers, boots)',
          'Watches',
          'Belts and wallets',
        ],
      },
      {
        id: '2-3',
        name: "Kids' Fashion",
        items: [
          'Baby clothing (0–24 months)',
          'Toddler clothing',
          "Kids' shoes",
          'School uniforms',
          'Costumes',
        ],
      },
      {
        id: '2-4',
        name: 'Fashion Accessories',
        items: ['Sunglasses', 'Hats and caps', 'Scarves', 'Luggage and travel gear'],
      },
    ],
  },
  {
    id: '3',
    name: 'Home and Office',
    slug: 'home-office',
    subcategories: [
      {
        id: '3-1',
        name: 'Home Appliances',
        items: [
          'Refrigerators and freezers',
          'Washing machines',
          'Air conditioners and fans',
          'Microwave ovens',
          'Blenders and juicers',
          'Electric kettles',
          'Irons',
          'Vacuum cleaners',
        ],
      },
      {
        id: '3-2',
        name: 'Kitchen and Dining',
        items: [
          'Cookware sets',
          'Dinnerware',
          'Glassware',
          'Cutlery',
          'Kitchen storage containers',
          'Water filters',
        ],
      },
      {
        id: '3-3',
        name: 'Furniture and Decor',
        items: [
          'Living room furniture',
          'Bedroom furniture',
          'Office chairs and desks',
          'Lighting and lamps',
          'Wall art',
          'Curtains and blinds',
          'Bedding',
        ],
      },
      {
        id: '3-4',
        name: 'Office Supplies',
        items: ['Paper', 'Pens', 'Files and folders', 'Printers', 'Office storage solutions'],
      },
    ],
  },
  {
    id: '4',
    name: 'Beauty and Health',
    slug: 'beauty-health',
    subcategories: [
      {
        id: '4-1',
        name: 'Skincare',
        items: [
          'Face creams and moisturizers',
          'Sunscreen',
          'Body lotions',
          'Soaps and shower gels',
          'Lip care',
          'Facial serums',
        ],
      },
      {
        id: '4-2',
        name: 'Make-Up',
        items: [
          'Foundations',
          'Lipsticks',
          'Mascara',
          'Eyeshadow palettes',
          'Make-up brushes',
          'Nail polish',
        ],
      },
      {
        id: '4-3',
        name: 'Hair Care',
        items: [
          'Shampoos and conditioners',
          'Hair oils and serums',
          'Hair extensions and wigs',
          'Styling tools',
          'Hair dyes',
        ],
      },
      {
        id: '4-4',
        name: 'Health and Personal Care',
        items: [
          'Vitamins and supplements',
          'Perfumes and fragrances',
          'Oral care products',
          'Feminine hygiene products',
          'Adult diapers',
        ],
      },
    ],
  },
  {
    id: '5',
    name: 'Baby and Kids',
    slug: 'baby-kids',
    subcategories: [
      {
        id: '5-1',
        name: 'Diapering and Wipes',
        items: ['Diapers', 'Baby wipes', 'Diaper bags'],
      },
      {
        id: '5-2',
        name: 'Feeding',
        items: ['Formula milk', 'Baby bottles', 'Bibs', 'High chairs', 'Sterilizers'],
      },
      {
        id: '5-3',
        name: 'Baby Gear',
        items: ['Strollers', 'Car seats', 'Baby carriers', 'Cots and cribs'],
      },
      {
        id: '5-4',
        name: 'Toys and Gifts',
        items: ['Educational toys', 'Action figures', 'Board games', 'Outdoor play equipment'],
      },
    ],
  },
  {
    id: '6',
    name: 'Sports and Fitness',
    slug: 'sports-fitness',
    subcategories: [
      {
        id: '6-1',
        name: 'Exercise and Fitness',
        items: [
          'Treadmills',
          'Exercise bikes',
          'Dumbbells and weights',
          'Yoga mats',
          'Resistance bands',
          'Smartwatches and fitness trackers',
        ],
      },
      {
        id: '6-2',
        name: 'Sportswear',
        items: ['Running shoes', 'Gym apparel', 'Sport bags'],
      },
      {
        id: '6-3',
        name: 'Outdoor Recreation',
        items: ['Camping gear', 'Bicycles', 'Swimming equipment'],
      },
    ],
  },
  {
    id: '7',
    name: 'Grocery and Household',
    slug: 'grocery-household',
    subcategories: [
      {
        id: '7-1',
        name: 'Pantry Staples',
        items: ['Rice', 'Pasta', 'Cooking oils', 'Sugar', 'Canned goods', 'Cereals', 'Spices'],
      },
      {
        id: '7-2',
        name: 'Beverages',
        items: ['Soft drinks', 'Bottled water', 'Coffee', 'Tea', 'Alcoholic beverages'],
      },
      {
        id: '7-3',
        name: 'Household Cleaning',
        items: ['Detergents', 'Disinfectants', 'Toilet cleaners', 'Air fresheners', 'Paper towels'],
      },
    ],
  },
  {
    id: '8',
    name: 'Automotive and Industrial',
    slug: 'automotive-industrial',
    subcategories: [
      {
        id: '8-1',
        name: 'Car Accessories',
        items: ['Car mats', 'Air fresheners', 'Motor oil', 'Batteries', 'Jump cables', 'Car wash supplies'],
      },
      {
        id: '8-2',
        name: 'Tools and Hardware',
        items: ['Power tools', 'Hand tools', 'Electrical supplies'],
      },
    ],
  },
  {
    id: '9',
    name: 'Clothing',
    slug: 'clothing',
    subcategories: [
      {
        id: '9-1',
        name: 'Apparel',
        items: ['T-shirts', 'Jeans', 'Jackets', 'Dresses', 'Shoes', 'Sneakers'],
      },
    ],
  },
  {
    id: '10',
    name: 'Home & Garden',
    slug: 'home-garden',
    subcategories: [
      {
        id: '10-1',
        name: 'Home Decor',
        items: ['Plants', 'Lighting', 'Pillows', 'Garden Tools'],
      },
    ],
  },
  {
    id: '11',
    name: 'Books',
    slug: 'books',
    subcategories: [
      {
        id: '11-1',
        name: 'All Books',
        items: ['Programming', 'Fiction', 'Non-Fiction', 'Educational'],
      },
    ],
  },
  {
    id: '12',
    name: 'Home Appliances',
    slug: 'home-appliances',
    subcategories: [
      {
        id: '12-1',
        name: 'Kitchen Appliances',
        items: ['Refrigerators', 'Microwaves', 'Dishwashers', 'Coffee Makers', 'Blenders', 'Toasters'],
      },
      {
        id: '12-2',
        name: 'Laundry',
        items: ['Washing Machines', 'Dryers', 'Irons'],
      },
      {
        id: '12-3',
        name: 'Climate Control',
        items: ['Air Conditioners', 'Heaters', 'Fans'],
      },
    ],
  },
  {
    id: '13',
    name: 'Gadgets',
    slug: 'gadgets',
    subcategories: [
      {
        id: '13-1',
        name: 'Smart Devices',
        items: ['Smart Home', 'Wearables', 'Drones', 'VR Headsets', 'Action Cameras'],
      },
      {
        id: '13-2',
        name: 'Tech Accessories',
        items: ['Power Banks', 'USB Cables', 'Phone Cases', 'Screen Protectors'],
      },
    ],
  },
];
