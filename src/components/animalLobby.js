import React, { useEffect, useState } from 'react'
import axios from 'axios'
import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvunv-50d870df-d6fa-4c8b-aca1-67c3e1210abc.png'
import "../styles/animalLobby.css"
import { Link } from 'react-router-dom'
import { BsFillCloudSunFill } from 'react-icons/bs'
import Modal from 'react-modal'
import { TbCrown } from 'react-icons/tb'
import { Line } from 'rc-progress'
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import lobbySong from '../assets/music/lobbySong.wav'


export default function AnimalLobby({ token, username }) {
    const [animalList, setAnimalList] = useState([])
    const [yourAnimals, setYourAnimals] = useState([])
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [clickedImage, setClickedImage] = useState([])
    const [clickedName, setClickedName] = useState([])
    const [isPlaying, setIsPlaying] = useState(false);


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            maxWidth: '300px',
            maxHeight: '300px',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    useEffect(() => {
        axios.get('https://is-it-raining.herokuapp.com/my-animals', {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            const animalMap = response.data
            const animalArray = animalMap.map((response) => {
                return ([response.animal.name, response.animal.image, response.animal.id, response.animal.points_left_until_max, response.points, response.animal.id])
            })
            setYourAnimals(animalArray)
        })

    }, [])

    function closeModal() {
        setIsOpen(false);
    }


    const handleClick = (event) => {
        setClickedImage(event.target.src);
        setClickedName(event.target.alt);
        setIsOpen(true);
    }

    const [play, { pause }] = useSound(lobbySong);


    const playingButton = () => {
        if (isPlaying) {
            pause();
            setIsPlaying(false);
        } else {
            play();
            setIsPlaying(true);
        }
    };

    const handleMusicToggle = () => {
        pause()
    }

    return (
        <>
            <div>
                <h2 className="AnimalLobbyHeader">Animal Inventory</h2>
                <h2 className="AnimalLobbyHeaderShadow">Animal Inventory</h2>


                <div className='divForAnimalLobbyMap'>
                    <div className='animalLobbyMap'>
                        <>
                            {
                                yourAnimals.map((data =>
                                    <div className='animalLobbyCard' key={data[5]}>
                                        <div className='animalImage'>
                                            <img src={data[1]} alt={data[0]} onClick={handleClick}></img>
                                            <div className="progressBar">
                                                <Line percent={data[4] * 10}
                                                    strokeWidth="6"
                                                    strokeColor="#BF00FF"
                                                    strokeLinecap="butt"
                                                    trailWidth="5"
                                                    trailColor="#f3f3f3"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        ariaHideApp={false}
                        style={customStyles}
                    >
                        <h2 className="modalAnimalNameeAL">{clickedName}</h2>
                        <div className="modalImageDivAL">
                            <img className="modalImageAL" src={clickedImage} alt='your-new-animal'></img>
                        </div>

                        <button className="modalButtonAL" onClick={closeModal}>Back</button>
                    </Modal>
                </div>
                <div className='lobbyBackgroundImage'>
                    <img src={animalLobbyBackgroundImage} alt='profile-background'></img>
                </div>
                <div className='animalLobbyNavBar'>
                    <div>
                        <Link to='/'>
                            <button className='backToWeather' onClick={handleMusicToggle}>
                                <div><BsFillCloudSunFill /></div>
                            </button>
                        </Link>

                        <Link to='/special-animal-lobby'>
                            <button className='specialAnimalLobbyButton' onClick={handleMusicToggle}>
                                <div><TbCrown /></div>
                            </button>
                        </Link>
                    </div>
                    
                    <div className="audioPlayer">
                        <button className="playButton">
                            <IconContext.Provider value={{ size: "3.5em", color: "#FFFFFF" }}>
                            </IconContext.Provider>
                        </button>
                        {!isPlaying ? (
                            <button className="playButton" onClick={playingButton}>
                                <IconContext.Provider value={{ size: "3.5em", color: "#FFFFFF" }}>
                                    <AiFillPlayCircle />
                                </IconContext.Provider>
                            </button>
                        ) : (
                            <button className="playButton" onClick={playingButton}>
                                <IconContext.Provider value={{ size: "3.5em", color: "#FFFFFF" }}>
                                    <AiFillPauseCircle />
                                </IconContext.Provider>
                            </button>
                        )}
                        <button className="playButton">
                            <IconContext.Provider value={{ size: "3.5em", color: "#FFFFFF" }}>
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}