import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../styles/animal.css'





const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};



function Animal({ weatherID, token }) {
    const [animal, setAnimal] = useState('')
    const [image, setImage] = useState('')
    const [variation, setVariation] = useState([])
    const [capturedAnimals, setCapturedAnimals] = useState('')
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();
    let subtitle;


    useEffect(() => {
        if (weatherID) {
            axios.get(`https://is-it-raining.herokuapp.com/weather-animal/${weatherID}/`)
                .then((response) => {
                    // console.log(response.data.random_image)
                    setAnimal(response.data.name)
                    setImage(response.data.image)
                    setVariation(response.data.variation_type)

                })
        }
    }, [weatherID])





    const handleCapture = (event) => {
        axios.post(`https://is-it-raining.herokuapp.com/captured/${animal}/${variation}`, {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            }
        )
            .then(res => {
                closeModal()
                navigate('/animal-lobby')
            })
    };

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    return (
        (token ? (

            <div className='animal'>
                <img src={image} alt='corresponding-weather-animal' onClick={openModal}></img>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                    <h2 className="modalTitle">You caught a {animal}!</h2>
                    <div className="modalImage">
                        <img src={image} alt='your-new-animal'></img>
                    </div>
                    <div className="modalChoiceTag">What would you like to do with it?</div>
                    <button className="modalButtonLeft" onClick={closeModal}>Release</button>
                    <button className="modalButtonRight" onClick={handleCapture}>Capture</button>

                </Modal>
            </div>
        ) : (<div className='animal'>
            <img src={image} alt='corresponding-weather-animal' onClick={openModal}></img>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <h2 className="modalTitle">Login to capture this {animal}!</h2>
                <div className="modalImage">
                    <img src={image} alt='your-new-animal'></img>
                </div>
                <button className="modalButtonLeft" onClick={closeModal}>Nevermind</button>
                <Link to='/login'>
                    <button className="modalButtonRight" >Login!</button>
                </Link>

            </Modal>
        </div>
        ))
    )

}

export default Animal;