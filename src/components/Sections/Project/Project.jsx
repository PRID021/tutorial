import "./project.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { useRef } from "react";

const items = [
  {
    id: 1,
    title: "Sherdtrip",
    img: "https://lh3.googleusercontent.com/drive-viewer/AKGpihZUohKqBx4S-NSI6RYgBTN8kvAgfe3vBqGXkArc0Q8kfVkGF-FtWcRh-TkV3nJPJeblxzcKUylN7SRBjXIMtkgne7FStIEGTw=s1600-rw-v1",
    desc: "Welcome to SherdTrip, where shared adventures become unforgettable experiences! Dive into curated trips, connect with fellow travelers, and create lasting memories together. With safety as our priority, embark on unique journeys while forging new friendships. Receive personalized recommendations and share your travel tales with our vibrant community. Join SherdTrip today and let the journey begin!",
    refUrl: "https://www.sherdtrip.com/landing",
  },
  {
    id: 2,
    title: "Next.js Blog",
    img: "https://images.pexels.com/photos/18023772/pexels-photo-18023772/free-photo-of-close-up-of-a-person-holding-a-wristwatch.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
    refUrl: "https://www.sherdtrip.com/landing",
  },
  {
    id: 3,
    title: "Vanilla JS App",
    img: "https://images.pexels.com/photos/6894528/pexels-photo-6894528.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
    refUrl: "https://www.sherdtrip.com/landing",
  },
  {
    id: 4,
    title: "Music App",
    img: "https://images.pexels.com/photos/18540208/pexels-photo-18540208/free-photo-of-wood-landscape-water-hill.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
    refUrl: "https://www.sherdtrip.com/landing",
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
              See Demo
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
