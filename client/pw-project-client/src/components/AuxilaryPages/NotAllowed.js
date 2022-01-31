import { Link } from "react-router-dom";
import "./css/NotFound.css";
export default function NotAllowed() {
  return (
    <div className="page">
      <h1 className="title_404">403</h1>
      <h2 className="sub_title">Oops! Insuficient Permissions</h2>
      <p className="helper_text">
        Sorry it would seem that you do not have permission to view this page,
        if you believe this to be a mistake contact our moderators.
      </p>
      <div className="link_back_div">
        <Link className="link_back" to="/">
          Back to home
        </Link>
      </div>
    </div>
  );
}
