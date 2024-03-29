import { Avatar } from "."

const Appbar = () => {
  return (
    <div className="flex items-center justify-between w- p-5 shadow-lg">
        <div className="text-extrabold text-black text-2xl">
            BlogSum
        </div>
        <ul>
            <li>
                <Avatar authorName={"Alpha"}/>
            </li>
        </ul>
    </div>
  )
}

export default Appbar