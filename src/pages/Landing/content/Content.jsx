import '../landing.scss';
import {IoChevronForwardCircle, IoStar} from 'react-icons/io5';
import {IconContext} from "react-icons";
import Card from '../card/Card';
import {motion} from 'framer-motion';
import { Link } from 'react-router-dom';

let easeing = [0.6,-0.05,0.01,0.99];

const stagger = {
  animate:{
    transition:{
      delayChildren:0.4,
      staggerChildren:0.2,
      staggerDirection:1
    }
  }
}

const fadeInUp = {
  initial:{
    y:-60,
    opacity:0,
    transition:{
      duration:0.6, ease:easeing
    }
  },
  animate:{
    y:0,
    opacity:1,
    transition:{
      duration:0.6,
      delay:0.5,
      ease:easeing
    }
  }
};

const transition = {duration:1.4,ease:[0.6,0.01,-0.05,0.9]};

const firstName = {
  initial:{
    y:-20,
  },
  animate:{
    y:0,
    transition:{
      delayChildren:0.4,
      staggerChildren:0.04,
      staggerDirection:-1
    }
  }
}

const lastName = {
  initial:{
    y:-20,
  },
  animate:{
    y:0,
    transition:{
      delayChildren:0.4,
      staggerChildren:0.04,
      staggerDirection:1
    }
  }
}

const letter = {
  initial:{
    y:400,
  },
  animate:{
    y:0,
    transition:{duration:1, ...transition}
  }
};

const btnGroup={
  initial:{
    y:-60,
    opacity:0,
    transition:{duration:0.6, ease:easeing}
  },
  animate:{
    y:0,
    opacity:1,
    animation:{
      duration:0.6,
      ease:easeing
    }
  }
};
const star={
  initial:{
    y:60,
    opacity:0,
    transition:{duration:0.8, ease:easeing}
  },
  animate:{
    y:0,
    opacity:1,
    animation:{
      duration:0.6,
      ease:easeing
    }
  }
};

export const Content = () => {
  return (
    <motion.div initial='initial' animate='animate'> {/*Added layout classnmae that needs to change */}
      <motion.div className="content_wrapper" initial={{opacity:0,scale:0}} animate={{opacity:1, scale:1}} transition={{duration:0.3, ease:easeing}}>
        <div className="left_content_wrapper">
          <motion.h2>

            <motion.span variants={firstName} initial="initial" animate="animate" className='first'>
                <motion.span variants={letter}>L</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>a</motion.span>
                <motion.span variants={letter}>r</motion.span>
                <motion.span variants={letter}>n</motion.span>
                <motion.span variants={letter} className="second">t</motion.span>
                <motion.span variants={letter}>o</motion.span>
                <motion.span variants={letter} className="second">p</motion.span>
                <motion.span variants={letter}>l</motion.span>
                <motion.span variants={letter}>a</motion.span>
                <motion.span variants={letter}>y</motion.span>
            </motion.span>
            <motion.span variants={lastName} initial="initial" animate="animate" className='last'>
                <motion.span variants={letter}>L</motion.span>
                <motion.span variants={letter}>o</motion.span>
                <motion.span variants={letter}>u</motion.span>
                <motion.span variants={letter}>i</motion.span>
                <motion.span variants={letter}>s</motion.span>
                <motion.span variants={letter}>i</motion.span>
                <motion.span variants={letter}>a</motion.span>
                <motion.span variants={letter}>n</motion.span>
                <motion.span variants={letter}>a</motion.span>
                <motion.span variants={letter} className="second">M</motion.span>
                <motion.span variants={letter}>u</motion.span>
                <motion.span variants={letter}>s</motion.span>
                <motion.span variants={letter}>i</motion.span>
                <motion.span variants={letter}>c</motion.span>
                <motion.span variants={letter}>!</motion.span>
            </motion.span>
          </motion.h2>

          <motion.p variants={fadeInUp}>Our team at Musiana takes pride in teaching what we know <br/>of as the roots of Louisiana's music.</motion.p>
          <motion.div className="btn_group" variants={stagger}>
            <Link to="/signup">
              <motion.div className="btn btn_primary" variants={btnGroup} whileHover={{scale:1.05}} whileTap={{scale:0.95}}>Sign Up
                  <IconContext.Provider value={{color:"#14da8f", size:"25px"}}>
                    <IoChevronForwardCircle />
                  </IconContext.Provider>
              </motion.div>
            </Link>
            <motion.div className="btn btn_secondary" variants={btnGroup} whileHover={{scale:1.05}} whileTap={{scale:0.95}}>Live Chat</motion.div>
          </motion.div>

          <motion.div className="review_container" variants={stagger}>
            <motion.p className="total_review" variants={star}>64+ Reviews</motion.p>
            <IconContext.Provider value={{color:"#fff", size:"18px"}}>
                <motion.span variants={star} whileHover={{scale:1.2, rotate:180,borderRadius:'100%',cursor:'pointer'}}><IoStar/></motion.span>
                <motion.span variants={star} whileHover={{scale:1.2, rotate:180,borderRadius:'100%',cursor:'pointer'}}><IoStar/></motion.span>
                <motion.span variants={star} whileHover={{scale:1.2, rotate:180,borderRadius:'100%',cursor:'pointer'}}><IoStar/></motion.span>
                <motion.span variants={star} whileHover={{scale:1.2, rotate:180,borderRadius:'100%',cursor:'pointer'}}><IoStar/></motion.span>
                <motion.span variants={star} whileHover={{scale:1.2, rotate:180,borderRadius:'100%',cursor:'pointer'}}><IoStar/></motion.span>
            </IconContext.Provider>
            <motion.p className="more_review" variants={star}>More then 50+ students are enrolled.</motion.p> {/*eventually this ought to reveal the number of videos uploaded*/}
          </motion.div>
        </div>

        <motion.div className="right_content_wrapper">          
          <motion.img src='https://images.vexels.com/media/users/3/223261/isolated/preview/d9d5e162fbef6b53184431babf2c74a0-man-playing-accordion.png' alt="bg" initial={{x:200, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:.5, delay:0.8}}/>
        </motion.div>
      </motion.div>

      <Card/>

    </motion.div>
  );
}

export default Content;
