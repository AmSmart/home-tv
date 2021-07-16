import React from 'react';
import { useHistory } from 'react-router';
import { Button } from 'antd';
import ReactPlayer from 'react-player'

const Player = (props) => {
    const history = useHistory();
    const mediaFile = encodeURI(props.location.state.mediaFile);    

    return (
        <div>
            <div className='centre-container'>
                <ReactPlayer controls={true} url={`http://localhost:3001/${mediaFile}`} />
            </div>
            <div className='text-center'>
                <Button type='primary' className='btn' onClick={() => history.push('/media')}>Go Back</Button>
            </div>
        </div>
    );
}

export default Player;