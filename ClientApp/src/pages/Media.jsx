import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Space, message, Table, Upload } from 'antd';
import { useLazyGet, useDelete } from '../utils/api';

const Media = () => {
    const history = useHistory();
    const [media, setMedia] = useState([]);
    const { get } = useLazyGet('/api/media');
    const { remove, isLoading } = useDelete();
    const allowedFileTypes = '.mp4,.mp3,.wav,.avi,.mkv,.ogg,.flv,.mov,.webm';

    useEffect(() => {
        async function fetchData() {
            try {
                let response = await get();
                console.log(response)
                setMedia(response);
            }
            catch {
                message.error("Error fetching data");
            }
        }
        fetchData();
    }, [])

    const uploadProps = {
        name: 'media',
        action: '/api/media',
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                async function fetchData() {
                    try {
                        let response = await get();
                        console.log(response)
                        setMedia(response);
                    }
                    catch {
                        message.error("Error fetching data");
                    }
                }
                fetchData();
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error('File upload failed.');
            }
        },
    };

    const handleMediaPlay = (file) => {
        history.push('/player', { mediaFile: file })
    }

    const handleMediaDelete = async (file) => {
        try {
            await remove('/api/media', { params: { file: file } });
            let response = await get();
            setMedia(response);
            message.success("File deleted successfully");
        }
        catch {

        }
    }

    const columns = [
        {
            title: 'File Name',
            dataIndex: 'fileName',
            key: 'fileName',
        },
        {
            title: 'Actions',
            dataIndex: 'fileName',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary' onClick={() => handleMediaPlay(text)}>Play</Button>
                    <Button type='primary' disabled={isLoading} danger onClick={() => handleMediaDelete(text)}>Delete</Button>
                </Space>
            ),
        },
    ];


    return (
        <div>
            <div className='centre-container custom-border'>
                <Table dataSource={media} columns={columns} />
            </div>
            <div className='text-center'>
                <span className='mt-1'>
                    <Button type='primary' className='mr-2' onClick={() => history.push('/')}>Go Back</Button>
                    <Upload {...uploadProps} accept={allowedFileTypes}>
                        <Button type='primary'>Add Media</Button>
                    </Upload>
                </span>
            </div>
        </div>
    );
}

export default Media;