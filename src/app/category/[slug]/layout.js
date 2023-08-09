
export function generateMetadata({params}){
    return {
        title: `KATEGORY : ${params.slug.toUpperCase()}`
    }
}

export default function Layout({children}) {
  return (
    <div>{children}</div>
  )
}
