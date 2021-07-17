import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import socketClient from "socket.io-client";
import { usePost } from '../utils/api';
import './Home.module.css';

const Home = () => {
    const imagesKeys = [...Array(10).keys()];
    const history = useHistory();
    const [weather, setWeather] = useState({ humidity: 0, temp: 0 });
    const [shutdownModalVisible, setShutdownModalVisible] = useState(false);
    const { post, isLoading } = usePost('/api/shutdown');

    useEffect(() => {
        let socket = socketClient('http://localhost:3001/');
        socket.on('connection', () => {
            console.log(`I'm connected with the back-end`);
        });
        socket.on('dht', payload => {
            setWeather(payload);
            console.log('doings');
        })
    }, []);

    const toggleShutdownModalVisible = () => {
        let bool = !shutdownModalVisible;
        setShutdownModalVisible(bool);
    }

    const handleShutdown = async () => {
        try{
            await post({}, {});
        }
        catch{

        }
    }



    return (
        <div className="text-center">
            <span className="m-1">
                <Button onClick={() => history.push("/calculator")} type="primary" className="mr-2 btn">
                    Calculator
                </Button>
                <Button onClick={() => history.push("/calendar")} type="primary" className="mr-2 btn">
                    Calendar
                </Button>
                <Button onClick={() => history.push("/media")} type="primary" className="mr-2 btn">
                    Media
                </Button>
                <Button danger onClick={toggleShutdownModalVisible} type="primary" className="mr-2 btn">
                    Shutdown
                </Button>
            </span>
            <p>
                Temperature:<span className='mr-2'> {Number(weather.temp).toFixed(1)}⁰C</span>
                Humidity:<span className='mr-2'> {Number(weather.humidity).toFixed(1)}%</span>
            </p>
            <Carousel stopOnHover={false} autoPlay={true} showStatus={false} infiniteLoop={true} showArrows={false}
                dynamicHeight={false} showIndicators={false} showThumbs={false}>
                {
                    imagesKeys.map((item) => (
                        <div key={item}>
                            <img alt="Slideshow" preview={false} style={{ width: '100%', minHeight: '100%' }}
                                src={`${window.location.origin}/slideshow-images/${item}.jpg`} />
                        </div>
                    ))
                }
            </Carousel>

            <Modal
                title="Shutdown Home-TV"
                visible={shutdownModalVisible}
                onCancel={toggleShutdownModalVisible}
                footer={[
                    <Button key="back" onClick={toggleShutdownModalVisible}>
                        Cancel
                    </Button>,
                    <Button danger key="submit" htmlType="submit" type="primary" loading={isLoading}
                        onClick={handleShutdown}>
                        Shutdown
                    </Button>,
                ]}>
                <p>Are you sure you want to shutdown?</p>
            </Modal>
        </div>
    );
}

export default Home;