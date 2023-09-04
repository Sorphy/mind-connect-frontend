import React from "react";
import "./about.css";
import image1 from "../../assets/images/picture_4.png"
import image2 from "../../assets/images/picture_1.png"
import image3 from "../../assets/images/picture_2.png"
import image4 from "../../assets/images/picture_3.png"
function About() {
  return (
    <div className="about-us">
      <h1>What We Provide</h1>
      <section id="provision">
        <article className="artilces">
          <img src={image1} alt="picture" />
          <h3>Safe Space</h3>
          <p>
            Share, connect and an provide support in a safe space for mental
            health. A community of empatics where you get to unburdenyour mind
          </p>
        </article>

        <article className="artilces">
          <img src={image2} alt="picture2" />
          <h3>Share</h3>
          <p>
            Share, connect, and provide support in a safe space for mental
            health. A community of empatics where you get to unburden your mind.
          </p>
        </article>

        <article className="artilces">
          <img src={image3} alt="picture3" />
          <h3>Supportive Community</h3>
          <p>
            Share, connect, and provide support in a safe space for mental
            health. A community of empatics where you get to unburden your mind.
          </p>
        </article>

        <article className="artilces">
          <img src={image4} alt="picture4" />
          <h3>Learn</h3>
          <p>
            Share, connect, and provide support in a safe space for mental
            health. A community of empatics where you get to unburden your mind.
          </p>
        </article>
      </section>
    </div>
  );
}

export default About;

