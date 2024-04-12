import { TextEditor } from "../components"
import Appbar from "../components/Appbar"

const Publish = () => {
  return (
    <div>
        <Appbar/>
        <div className="my-8">
          <TextEditor/>
        </div>
    </div>
  )
}

export default Publish