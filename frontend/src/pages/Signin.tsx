import { Auth, Quote } from "../components"
import { signinTypes } from '@sinster2003/blogsum-zod-types';

const Signin = (): JSX.Element => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <Auth<signinTypes> type="signin"/>
      <Quote/>
    </div>
  )
}

export default Signin