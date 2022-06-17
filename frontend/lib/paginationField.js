import { PAGINATION_QUERY } from '../components/Pagination'

export function paginationField() {
  return {
    keyargs: false,
    read(existing = [], { args, cache }) {
      const { skip, take } = args
      const data = cache.readQuery({ query: PAGINATION_QUERY })

      const items = existing.slice(skip, skip + take).filter((x) => x)

      /// Uncomment if problem with pagination
      // const count = data?.productsCount
      // const page = skip / take + 1
      // const pages = Math.ceil(count / take)
      // if (items.length && items.length !== take && page === pages) return items

      if (items.length !== take) return false

      if (items.length) {
        console.log(`${items.length} itens in cache`)
        return items
      }

      return false
    },
    merge(existing, incoming, { args }) {
      const { skip, take } = args
      const merged = existing ? existing.slice(0) : []
      for(let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip]
      }

      return merged
    },
  }
}
