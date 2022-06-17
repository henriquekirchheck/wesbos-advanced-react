import { UpdateProduct } from '../components/UpdateProduct'
import { useRouter } from 'next/router'
export default function SellPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <UpdateProduct id={id}/>
    </div>
  )
}
