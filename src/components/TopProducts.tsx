

const products = [
  {name: 'Nike Sneakers', sold: 120},
  {name: 'Adidas Running Shoes', sold: 95},
  {name: 'Puma Sportswear', sold: 80},
  {name: 'Reebok Classic', sold: 75},
  {name: 'Under Armour Gear', sold: 60},
  {name: 'New Balance Trainers', sold: 50},
  {name: 'Smart Watch', sold: 45},
  {name: 'Wireless Earbuds', sold: 40},
  {name: 'iphone 14 pro', sold: 35},
]
export default function TopProducts() {
  return(
    <div>
      <h3>Top Products</h3>
      <ul>
        {products.map((product, index) => (
          <li key={index} >
            <span>{product.name}</span>
            <span>{product.sold}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}