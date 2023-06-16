import Model from "../Model";
//import descripImg from "../../../assets/logo/Louisiana icon blue.png";
import "./about.scss";

const About = () => {
  return (
    <Model
      title={"ABOUT US"}
      //img={descripImg}
      paragraph1={
        "Our team at Musiana takes pride in teaching what we know of as the roots of Louisiana's music. We try our best to create a way of effectively teaching music that not only demonstrates the technique and musicality necessary to competently perform a song piece, but also by emphasizing the culture which cradles it. With so many esoteric outlooks - colloquialisms and ambiguous symbolism - and with so many family secrets of <i>a people of peoples</i>, it's no suprise that the music's cultural environment imbues such an eclectic social milieu which still gives birth and nourishes the sacredness of its music to this day. That said, Musiana is a platform that invites users of all ages, all cultural and musical backgrounds to partake in learning what the music associated with Louisiana is all about and how to play it."
      }
      paragraph2={
        "If your interest is to learn how to play Cajun & Zydeco, for example, signing up grants you access to Musiana's vast archive of high quality interactive video tutorials featuring all of our favorite standards in the Louisiana repertoire. Interested in learning to swing out to the Rythym & Blues? No worries. We can provide you with a collective insight that'll bestow you with what it takes to play with authenticity, to feel the comfortability to even add your own unique flavor to facilitate more ease in your playing."
      }
      paragraph3={
        "We have but one mission, and that is to do our very best at preserving the music we adore and are blessed to have flowing through our veins. We want everyone globally to experience the rich <i>l'esprit</i> felt in the connection between the band and audience while Cajun two-stepping at Festival Acadian, or that of an exuberant <i>lindy hop</i> frequently seen at the Spotted Cat Jazz Club in New Orleans on any day of the week."
      }
      paragraph4={
        "Like so many of its pioneers, Musiana's heros and heroines, we feel the calling to spread our musical heritage everywhere while still preserving its distinct identity. We'll looking forward to having you."
      }
    />
  );
};
export default About;
