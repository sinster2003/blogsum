import { Quote, Auth } from "../components"

const Signup = (): JSX.Element => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <Auth type="signup"/>
      <Quote/>
    </div>
  )
}

export default Signup