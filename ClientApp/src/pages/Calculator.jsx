import React from 'react';
import Calculator from 'awesome-react-calculator';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

const Calc = () => {

    let style = {
        height: '23rem',
        width: '28rem'
    };
    const history = useHistory();

    return (
        <>
            <div className='centre-container' style={style}>
                <Calculator />
            </div>
            <div className='text-center'>
                <Button type='primary' className='btn' onClick={() => history.push('/')}>Go Back</Button>
            </div>
        </>
    );

}

export default Calc