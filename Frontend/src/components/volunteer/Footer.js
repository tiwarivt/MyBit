import React from "react";

function Footer() {
  return (
    <footer className="bg-dark py-3" style={{ backgroundColor: "#e9ecef" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5
              style={{
                marginBottom: "1rem",
                fontWeight: "bold",
                color: "#F0FFFF",
                fontFamily: "Merriweather",
                fontSize: "1.5rem",
              }}
            >
              Connect with us
            </h5>
            <ul className="list-inline mb-0">
              <li className="list-inline-item mx-2">
                <a
                  href="https://instagram.com/"
                  className="text-light"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-instagram-icon-png-image_6315974.png"
                    alt="Instagram"
                    className="img-fluid social-media-icon"
                    style={{ maxWidth: "40px", height: "auto" }}
                  />
                  <span className="d-block mt-2">Instagram</span>
                </a>
              </li>

              <li className="list-inline-item mx-2">
                <a
                  href="https://twitter.com/"
                  className="text-light"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png"
                    alt="Twitter"
                    className="img-fluid social-media-icon"
                    style={{ maxWidth: "40px", height: "auto" }}
                  />
                  <span className="d-block mt-2">Twitter</span>
                </a>
              </li>
              <li className="list-inline-item mx-2">
                <a
                  href="https://www.facebook.com/"
                  className="text-light"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png"
                    alt="Facebook"
                    className="img-fluid social-media-icon"
                    style={{ maxWidth: "40px", height: "auto" }}
                  />
                  <span className="d-block mt-2">Facebook</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-6 text-md-right">
            <p className="mb-0" style={{ color: "white" }}>
              We are grateful for your contribution towards our mission to make
              a positive impact in India. As per the Income Tax Act of 1961,
              your donation is eligible for tax deduction up to 50% of your
              gross total income under Section 80G. Thank you for your support
              in helping us create a better tomorrow. <br />
              <br />
              <span style={{ color: "whitesmoke" }}>
                &copy; 2023 CharityXchange. All rights reserved.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
