export function generateMetadata({params}){
    return {
        title: params.slug[0].toUpperCase().replace(/_/g, " "),
        description: params.slug[1].toLowerCase().replace(/_/g, " ")
    }
}
export default function Layout({children}) {
  return (
    <div>{children}</div>
  )
}
