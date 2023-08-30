import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useState, useRef, useEffect } from 'react';
import './index.css'

export default function Order() {

    const [position, setPostition] = useState({
        lat: 32.790603,
        lng: -96.856575
    })

    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyBiC-knCF8B1sha04loDyGfM3sM_yaC93U',
    })

    const marker = () => {
        return (
            <Marker
            position={position}
            icon={{
                url:'/images/car.png',
            }}
            ></Marker>
        )
    }

    const containerStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '0px 0px 10px 10px',
        marginBottom: '0px',
        zIndex: '0'
    }

    let progress = 1

    useEffect(() => {
        const handleProgress = () => {

            if (progress === 6) {
                clearInterval(interval)
            }
            const progText = document.getElementById(`progress-text`)
            if (progress <= 5) {
                const currentBar = document.getElementById(`bar${progress}`)
                currentBar.className = 'green'

                if (progress <= 4) {

                    const nextBar = document.getElementById(`bar${progress + 1}`)

                    nextBar.className = 'light-green'
                }



                if (progress === 1) {
                    progText.innerText = 'Brad is picking up your order..'
                    setPostition({
                        lat: 32.778732,
                        lng: -96.856661
                    })
                }
                else if (progress === 2) {
                    progText.innerText = 'Brad is on the way with order..'
                    setPostition({
                        lat: 32.766392,
                        lng: -96.856747
                    })
                }
                else if (progress === 3) {
                    progText.innerText = 'Brad is close by...'
                    setPostition({
                        lat: 32.748852,
                        lng:  -96.857090


                    })
                }
                else if (progress === 4) {
                    progText.innerText = 'Catch Brad outside...'
                    setPostition({
                        lat: 32.735063,
                        lng: -96.857348
                    })
                }
                else {
                    progText.innerText = 'Order complete'
                    setPostition({
                        lat: 32.720694,
                        lng: -96.857348
                    })
                }

            }
            progress += 1
        }

        const interval = setInterval(handleProgress, 4000)

      }, []);

    return (
        <div>
            <script
                defer
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
            ></script>
            <div id='order-info'>
                <div>
                    <p>Restaurant Name</p>
                </div>
                <div id='progress-container'>
                    <div className='gray' id='bar1'></div>
                    <div className='gray' id='bar2'></div>
                    <div className='gray' id='bar3'></div>
                    <div className='gray' id='bar4'></div>
                    <div className='gray' id='bar5'></div>
                </div>
                <div>
                    <p id='progress-text'>Preparing your oder...</p>
                </div>
            </div>
            <div id='map'>

            {
                    isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={{
                                lat: 32.766392,
                                lng: -96.856747
                            }}
                            zoom={12}

                            options={{


                                scrollwheel: false,
                                //draggable: false,
                                mapTypeControlOptions: {
                                    style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                                    position: window.google.maps.ControlPosition.LEFT_TOP,
                                },
                                fullscreenControlOptions: {
                                    position: window.google.maps.ControlPosition.RIGHT_TOP,
                                }}
                            }
                            heading={100}
                            //onClick={(e) => handleMapClick(e)}
                            //onLoad={(map) => mapRef.current = map

                            //}
                        >
                            {
                                marker()
                            }
                        </GoogleMap>

                    ) : <></>
                }
            </div>
        </div>
    )
}
