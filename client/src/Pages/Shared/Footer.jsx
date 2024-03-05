import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center p-10 bg-gray-600 text-base-content rounded">
        <div className="grid grid-flow-col gap-4 text-white">
          <Link to="/about-us" className="link link-hover ">
            About us
          </Link>
          <Link to="/contactUs" className="link link-hover">
            Contact
          </Link>
        </div>
        <div>
          <div className="grid text-3xl grid-flow-col gap-4 text-white">
            <a href="https://www.facebook.com/hasibulcse" target="blank">
              <FaFacebook />
            </a>
            <a href="https://www.facebook.com/hasibulcse" target="blank">
              <FaLinkedin />
            </a>
            <a href="https://www.facebook.com/hasibulcse" target="blank">
              <CgMail />
            </a>
          </div>
        </div>
        <div>
          <p className="text-white font-bold">
            Copyright © 2024 - All right reserved by
            <Link
              className="text-cyan-300 underline"
              target="_blank"
              to="https://hasibul-islam365.netlify.app/"
            >
              {" "}
              Hasibul Islam
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
