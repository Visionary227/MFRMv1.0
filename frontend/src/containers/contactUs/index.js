import React from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import "./style.css";

export default function ContactUs () {

  return (
    <div className="contactUs home">
      <Header />
      <div>
        <div className="size">
          <div className="contactUsContainer">
            <div className="cotactUsBlock">
              <h3>
                Contact <span>us</span>{" "}
              </h3>
              <p className="cotactUsBlockText">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut.
              </p>
              <div className="cotactUsBlockFlex">
                <div className="cotactUsBlockFlexBox">
                  <p>Name</p>
                  <input placeholder="Name" />
                </div>
                <div className="cotactUsBlockFlexBox">
                  <p>Email Address</p>
                  <input placeholder="Email Address" />
                </div>
              </div>
              <div className="cotactUsBlockFlexBox">
                <p>Write your message here</p>
                <textarea placeholder="Write your message here"></textarea>
              </div>
              <div className="cotactUsBlockFlexBoxBtnBox">
                <button>send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
