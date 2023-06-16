import {IoChevronForward} from "react-icons/io5";
import {IconContext} from "react-icons";
import {motion} from 'framer-motion';

import lineImg from '../img/line.png';

let easing = [0.6,-0.05,0.01,0.99];

const container = {
    show:{
        transition:{
            staggerChildren:0.2
        }
    }
};

const item = {
    hidden:{opacity:0,y:20},
    show:{
        opacity:1,
        y:0,
        transition:{
            ease:'easeInOut',
            duration:.2
        }
    }
}

const title = {
    hidden:{
        y:60,
        opacity:0
    },
    show:{
        y:0,
        opacity:1,
        transition:{
            delay:.2,
            duration:0.6,
            ease:easing
        }
    }
};

const hoverEffect = {
    whileHover:{
        scale:1.5,rotate:630,borderRadius:"100%"
    },
    whileTap:{
        scale:.8,rotate:630,borderRadius:"100%"
    },
}


const Card = () => {
  return (
    <motion.div className="service_container">
        <div className="title_wrapper">
            <motion.span className="service_title"
                initial={{y:20, opacity:0}}
                animate={{y:0, opacity:1}}
                exit={{opacity:0}}
                transition={{duration:.5, delay:1.8}}
            >Meet Our Team</motion.span>
            <motion.h2
                initial={{y:200, opacity:0}}
                animate={{y:0, opacity:1}}
                exit={{opacity:0}}
                transition={{duration:.5, delay:1}}
            >Premium Memberships provide<br/>Weekly Live Sessions.</motion.h2>
        </div>


        <motion.div className="service_card" variants={container} initial="hidden" exit="exit" whileInView="show" viewport={{once:false}}>

            <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{backgroundColor:"#ddfbf9"}} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                    <motion.img height="50px" width="50px" src='https://avatars.githubusercontent.com/u/16820452?v=4' alt="bg" initial={{x:200, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:.5, delay:0.8}}/>
                </motion.span>
                <h3>Trey Rader</h3>
                <h3>-Founder<br/>-Instructor<br/></h3>
                <a href="#">
                    <span>learn more</span>
                    <IconContext.Provider value={{color:"#14da8f", size:"18px"}}>
                        <IoChevronForward/>
                    </IconContext.Provider>
                </a>
            </motion.div>

            <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{backgroundColor:"#e7daf8"}} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                    <motion.img height="50px" width="50px" src='https://scontent-hou1-1.xx.fbcdn.net/v/t31.18172-8/29871713_10102627125995698_8006323815448397992_o.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=yMlaH2DA4A8AX-g3evQ&_nc_ht=scontent-hou1-1.xx&oh=00_AfB0nGUaOuV5obwUzq6AJYEJJyITR0J6yDg6omkvegn-bg&oe=64593757' alt="bg" initial={{x:200, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:.5, delay:0.8}}/>
                </motion.span>
                <h3>Daniel Dekerlegand</h3>
                <h3>-Developer</h3>
                <a href="#">
                    <span>learn more</span>
                    <IconContext.Provider value={{color:"#14da8f", size:"18px"}}>
                        <IoChevronForward/>
                    </IconContext.Provider>
                </a>
            </motion.div>
            <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{backgroundColor:"#ffede6"}} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                    <motion.img height="50px" width="50px" src='https://yt3.googleusercontent.com/ytc/AL5GRJUUJ25sMxvkCQszrjTepchYGG3RMp37hl4RBrgrDA=s900-c-k-c0x00ffffff-no-rj' alt="bg" initial={{x:200, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:.5, delay:0.8}}/>
                </motion.span>
                <h3>Wilson Savoy</h3>
                <h3>-Instructor<br/></h3>
                <a href="#">
                    <span>learn more</span>
                    <IconContext.Provider value={{color:"#14da8f", size:"18px"}}>
                        <IoChevronForward/>
                    </IconContext.Provider>
                </a>
            </motion.div>
            <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{backgroundColor:"#ffe1e9"}} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                    <motion.img height="50px" width="50px" src='https://music.louisiana.edu/sites/music/files/styles/large/public/EricMcGoffin.jpeg?itok=MHEHs3Fa' alt="bg" initial={{x:200, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:.5, delay:0.8}}/>
                </motion.span>
                <h3>Eric McGoffin</h3>
                <h3>-Instructor<br/></h3>
                <a href="#">
                    <span>learn more</span>
                    <IconContext.Provider value={{color:"#14da8f", size:"18px"}}>
                        <IoChevronForward/>
                    </IconContext.Provider>
                </a>
            </motion.div>
            <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{backgroundColor:"#dcedff"}} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                    <motion.img height="50px" width="50px" src='https://live.staticflickr.com/978/40155953630_edcd84f29b_b.jpg' alt="bg" initial={{x:200, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:.5, delay:0.8}}/>
                </motion.span>
                <h3>Chris Stafford</h3>
                <h3>-Instructor<br/></h3>
                <a href="#">
                    <span>learn more</span>
                    <IconContext.Provider value={{color:"#14da8f", size:"18px"}}>
                        <IoChevronForward/>
                    </IconContext.Provider>
                </a>
            </motion.div>
            <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{backgroundColor:"#dbf9ed"}} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                    <motion.img height="50px" width="50px" src='https://scontent-hou1-1.xx.fbcdn.net/v/t1.6435-9/30127472_10211529113369096_1462504173231669248_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=174925&_nc_ohc=qM25Z1YrIYsAX8rNf13&_nc_ht=scontent-hou1-1.xx&oh=00_AfB-zyQA8HiEMuWRiGfJa1afqVOCi1euCSOX2ZklpzZ6iw&oe=64593C0E' alt="bg" initial={{x:200, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:.5, delay:0.8}}/>
                </motion.span>
                <h3>Janine Bonilla</h3>
                <h3>-Digital Marketer</h3>
                <a href="#">
                    <span>learn more</span>
                    <IconContext.Provider value={{color:"#14da8f", size:"18px"}}>
                        <IoChevronForward/>
                    </IconContext.Provider>
                </a>
            </motion.div>
            <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{backgroundColor:"#fffada"}} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                    <motion.img height="50px" width="50px" src='https://wordofsouthfestival.com/wp-content/uploads/2022/02/head-watson.jpg' alt="bg" initial={{x:200, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:.5, delay:0.8}}/>
                </motion.span>
                <h3>Cedric Watson</h3>
                <h3>-Instructor</h3>
                <a href="#">
                    <span>learn more</span>
                    <IconContext.Provider value={{color:"#14da8f", size:"18px"}}>
                        <IoChevronForward/>
                    </IconContext.Provider>
                </a>
            </motion.div>
            <motion.div className="card dark" variants={item}>
                <img src={lineImg} alt="line" className="line"/>               
                <h2>+4 <br/>More...</h2>
                <a href="#">
                    <span>View more...</span>
                    <motion.span className="service_icon" style={{backgroundColor:"#14da8f"}} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                        <IconContext.Provider value={{color:"#fff", size:"18px"}}>
                            <IoChevronForward/>
                        </IconContext.Provider>
                    </motion.span>
                </a>
            </motion.div>
        </motion.div>
        
    </motion.div>
  )
}

export default Card;