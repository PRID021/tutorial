import "./project.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { useRef } from "react";

const items = [
  {
    id: 1,
    title: "Sherdtrip",
    img: "https://lh3.googleusercontent.com/drive-viewer/AKGpihaDjhRDfXs1PHJi7uxgkkKNaUSGXEOYPqb3Valy3mV_IC0dxkq7pNBX0zu5hzABOx4MOqISRUh7cwQtJB3TqRruRyxZU-1vzw=s1600-rw-v1",
    desc: "Welcome to SherdTrip, where shared adventures become unforgettable experiences! Dive into curated trips, connect with fellow travelers, and create lasting memories together. With safety as our priority, embark on unique journeys while forging new friendships. Receive personalized recommendations and share your travel tales with our vibrant community. Join SherdTrip today and let the journey begin!",
    refUrl: "https://www.sherdtrip.com/landing",
    buttonTitle: "See Demo",
  },
  {
    id: 2,
    title: "Search Vietnamese News",
    img: "https://lh3.googleusercontent.com/drive-viewer/AKGpiha7Uex5kHpqPlBiB50S45RsSmNKRtsQ6UH-m0xUYYnDn23E0cgp4kZNRW3l1eN1yqAM1ee9osMwstiz7uf4wQXu8fQ7JmrvzL4=s1600-rw-v1",
    desc: "The Next.js website integrates a classification algorithm to categorize and search Vietnamese news articles efficiently. With seamless rendering and navigation, users benefit from machine learning-driven content classification, enabling quick access to relevant news items and enhancing overall user experience within the Vietnamese language landscape",
    refUrl: "https://www.timgiuptui.com/",
    buttonTitle: "See Demo",
  },
  {
    id: 3,
    title: "Ajent Flutter App",
    img: "https://lh3.googleusercontent.com/drive-viewer/AKGpihY7frqNEXa4gmIi1c66mQsstOS18V0cdaQd2zgcOIjpJlg6SkVk6udQoxR5KKPZyoiJhSB631l1WuHcKopiU3Hya2sl-aUGY30=s2560",
    desc: "The Flutter app aids students during midterms or finals by connecting them with tutors or teachers. Offering a user-friendly interface, it facilitates tutor discovery, enhancing academic support. With features like scheduling and in-app communication, it streamlines the learning process, providing invaluable assistance to students when they need it most.",
    refUrl: "https://github.com/princ3od/Ajent",
    buttonTitle: "See on Github",
  },
  {
    id: 4,
    title: "Music App",
    img: "https://images.pexels.com/photos/18540208/pexels-photo-18540208/free-photo-of-wood-landscape-water-hill.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
    refUrl: "https://www.sherdtrip.com/landing",
    buttonTitle: "See on Github",
  },
];

const Single = ({ item }) => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <div className="imageContainer" ref={ref}>
            <img src={item.img} alt="" />
          </div>
          <motion.div className="textContainer" style={{ y }}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
            <button
              onClick={() => {
                window.location.href = item.refUrl;
              }}
            >
              {item.buttonTitle}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Project = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="project">
      <div className="progress">
        <h1>Featured Works</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Project;
