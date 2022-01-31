import { Link } from "react-router-dom"
import './css/NotFound.css'
export default function NotFound() {
    return (
        < div className="page">
            <h1 className="title_404">404</h1>
            <h2 className="sub_title">Oops! Page Not Found</h2>
            <p className="helper_text">Sorry the page you were looking for was not found</p>
            <div className="link_back_div">
                <Link className="link_back" to="/">Back to home</Link>
            </div>

        </div >
    )
}