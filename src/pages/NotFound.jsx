import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="container section center">
      <h1>Page not found</h1>
      <Link to="/" className="btn">Back to restaurants</Link>
    </div>
  )
}
