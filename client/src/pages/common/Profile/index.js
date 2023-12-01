import React from "react";
import PageTitle from "../../../component/pageTitle";
import img1 from "../../../../src/img/a.jpg";
import img2 from "../../../../src/img/b.jpg";
import img3 from "../../../../src/img/c.jpeg";
import img4 from "../../../../src/img/d.jpeg";

function index() {
  return (
    <div>
      <PageTitle title="Our Profile" />
      <div className="profile">
        <h1>DIRECTORS DESK ___________</h1>

        <div className="director">
          <img src={img1} alt="Default image" />
          <p>
            <span style={{ color: "red", fontSize: "2.5rem" }}>B</span>arasat
            Academic Association (BAA) was established in 2010 with a view to
            provide guidance and coaching to the young aspirants for Competitive
            Examinations of both State and Central levels with utmost quality
            and care, scientific manners, systematic techniques. BAA helps them
            realize their true potentiality and secure qualifying marks in
            different competitive examinations, thereby making them eligible for
            various government jobs. Our faculty team, research and development
            wings, study materials developers have been working hard
            continuously for the benefits of the unemployed educated youth. BAA
            offers rights opportunity, scope and grooms them in the most
            suitable way, so that they can reach confidently to their
            expectations. This association strives to be perfect in knowledge
            and time management. I hope that mutual co-operation and a very
            skill full approach together as a team, we will be able to reach the
            apex in near future.
          </p>
        </div>
        <h1 style={{ color: "black" }}>___________ Ranjit Ghosh (Director)</h1>

        <h1>COURSES WE OFFERED</h1>
        <div className="course">
          <p>WBCS</p>
          <p>SCHOOL SERVICE - PT</p>
          <p>COMBINED</p>
          <p>MOCK INTERVIEW</p>
          <p>WBC MAINS MOCK TEST</p>
          <p>WBCS PRELIM MOCK TEST</p>
          <p>PRIMARY - TET</p>
          <p>POLICE</p>
        </div>
        <h1>OUR GALLERY</h1>

        <div className="image">
          <img src={img2} alt="" />
          <br/>
          <br/>
          <img src={img4} alt="" />
          <br/>
          <img src={img3} alt="" />
          <br/>
        </div>
      </div>
    </div>
  );
}

export default index;
