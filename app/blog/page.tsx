

export default function Articles() {
  const servertoClientPropErr = ""
  const plainObjectPropErr = ""
  return (
    <div className="grow">
        <h1>Blog Page</h1>
        <h2>Ideas</h2>
        <ul>
            <li>Server Actions must end in "Action", or they will cause the error: {servertoClientPropErr} when passed to Client Components</li>
            <li>Data passed to the Client must be React Serializable, else the error: {plainObjectPropErr} a Mongo native _id value will cause this, for example </li>
        </ul>
    </div>
  )
}