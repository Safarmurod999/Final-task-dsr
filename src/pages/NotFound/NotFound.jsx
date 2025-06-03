import { Link } from 'react-router'
import notfound from '../../assets/videos/notfound.gif'
const NotFound = () => {
  return (
    <section className="not-found">
      <div className="container">
        <div className="not-found__title">
          404
        </div>
        <img src={notfound} alt="animation" />
        <div className="h1">

        </div>

        <Link
          aria-label='main-page'
          to={"/todos"}
        >
          Main page
        </Link>
      </div>
    </section>)
}

export default NotFound