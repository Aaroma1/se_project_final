import "./About.css";

function About() {
  return (
    <section className="about">
      <div className="about__avatar-container">
        <img
          className="about__avatar"
          src="/Aaron-Main-Headshot.jpg"
          alt="Author avatar"
        />
      </div>
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          Aaron Romano is a former videographer, and current bartender. He
          started Tripleten in September of 2024 to change careers and break
          into the tech industry as a software engineer. His tech stack includes
          HTML,CSS, Javascript, React, and Node.js.
          <br />
          <br />
          With the help of Tripleten Aaron learned how to think like an engineer
          with a strong focus on the user's needs. Tripleten gave Aaron the
          tools needed for success as a web developer and UI/UX design.
        </p>
      </div>
    </section>
  );
}

export default About;
