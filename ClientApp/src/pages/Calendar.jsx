import React from 'react';
import Calendar from 'react-calendar';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

const Cal = () => {
    const history = useHistory();

    return (
        <div>
            <div className='centre-container'>
                <Calendar />
            </div>
            <div className='text-center'>
                <Button type='primary' className='btn' onClick={() => history.push('/')}>Go Back</Button>
            </div>
        </div>
    );
}

export default Cal