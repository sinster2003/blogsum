import { Auth, Quote } from "../components"

const Signin = (): JSX.Element => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <Auth type="signin"/>
      <Quote/>
    </div>
  )
}

export default Signin