import {motion} from "framer-motion";

const Model = (props) => {
    return(
        <motion.div className="Model"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{delay: .25, duration: .5, ease: 'easeOut'}}
        >
            <motion.div className="title"
                initial={{y: "-100px"}}
                animate={{y: "0px"}}
                exit={{y: "-100px"}}
                transition={{delay: .25, duration: .5, ease: 'easeOut'}}
            >{props.title}</motion.div>
            <motion.div className="img-container"
                initial={{x: "-200px"}}
                animate={{x: "0px"}}
                exit={{x: "-200px"}}
                transition={{delay: .25, duration: .5, ease: 'easeOut'}}
            >
                <img src={props.img}/>
                <motion.div className="square"
                    initial={{rotate: -90}}
                    animate={{rotate: 0}}
                    exit={{rotate: -90}}
                    transition={{delay: .25, duration: .5, ease: 'easeOut'}}
                ></motion.div>
            </motion.div>
            <motion.div className="paragraph"
                initial={{y: "100px"}}
                animate={{y: "0px"}}
                exit={{y: "100px"}}
                transition={{delay: .25, duration: .5, ease: 'easeOut'}}
            >
                <p>{props.paragraph1}</p>
                <br/>
                <p>{props.paragraph2}</p>
                <br/>
                <p>{props.paragraph3}</p>
                <br/>
                <p>{props.paragraph4}</p>
            </motion.div>
        </motion.div>
  	);
}
export default Model;