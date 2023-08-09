export function generateMetadata({params}){
    return {
        title: params.slug[1].replace(/%/g, ' - ').toUpperCase(),
        description: params.slug[1].replace(/%/g, ' ')
    }
}
export default function Layout({children}) {
  return (
    <div>{children}</div>
  )
}
