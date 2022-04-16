import Link from 'next/link'
import ItemStyles from './styles/ItemStyles'
import Title from './styles/Title.js'
import PriceTag from './styles/PriceTag.js'
import { formatMoney } from '../lib/formatMoney'

export function Product({ product }) {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      {/* TODO: Add delete and modify buttons */}
    </ItemStyles>
  )
}
