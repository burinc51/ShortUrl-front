import React, { useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import { Button, Modal } from 'react-bootstrap';

export default function Form() {
    const [inputValue, setInputValue] = useState("");
    const [showContent, setShowContent] = useState(false);
    const [shorturl, setShorturl] = useState("");
    const [historyData, setHistoryData] = useState([]);
    const [showhistory, setShowhistor] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showQr, setShowQr] = useState("");
    const local = "https://shorturl-server.onrender.com/"

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (inputValue !== '') {
            setShowContent(true);

            fetch(`${local}api/form`, {
                method: 'POST',
                body: JSON.stringify({ inputValue }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => response.json())
                .then(data => {
                    setShorturl(data.shorturl);
                })
                .catch(error => console.error('Error:', error));
        }
    }

    const toggleShowHistory = async () => {
        setShowhistor(!showhistory);
        await fetchHistoryData()
    }

    const fetchHistoryData = async () => {
        try {
            const response = await fetch(`${local}api/url`);
            const data = await response.json();
            setHistoryData(data);
        } catch (error) {
            console.error('Error fetching history data:', error);
        }
    }

    const show = async (prop) => {
        setShowModal(true)
        setShowQr(prop)
    }

    const handleDelete = async (prop) => {
        fetch(`${local}api/delete`, {
            method: 'DELETE',
            body: JSON.stringify({ prop }),
            headers: { 'Content-Type': 'application/json' }
        })
            .catch(error => console.error('Error:', error));
            
    }

    useEffect(() => {
        fetchHistoryData()
    })

    return (
        <div className="container mt-5 text-center">
            <h1>ShortURL and QR Code</h1>
            <div className=' justify-content-center'>
                <form onSubmit={handleSubmit} className="mb-3">
                    <div className="input-group">
                        <input
                            type="url"
                            className="form-control"
                            placeholder="Type URL"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>

                {showContent && (
                    <div className="card mb-3">
                        <div className="card-body">
                            <p className="card-text">Full URL: {inputValue}</p>
                            <p className="card-text">Short URL: <a href={local + shorturl} target="_blank" rel="noopener noreferrer">{local+shorturl}</a></p>
                            <div id='qrcode' className="text-center">
                                <QRCode
                                    size={256}
                                    value={local + shorturl}
                                />
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <button className="btn btn-primary mb-3" onClick={toggleShowHistory}>Show History</button>
            {showhistory && (
                <ul className="list-group">
                    {historyData.slice().reverse().map((item, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <span className="fw-bold">Full URL:</span> {item.furl}
                            </div>
                            <div>
                                <span className="fw-bold">Short URL:</span> <a href={local + item.surl} target="_blank" rel="noopener noreferrer">{local+item.surl}</a>
                            </div>
                            <div>
                                <span className="fw-bold">Count:</span> {item.c}
                            </div>
                            <div>
                                <Button variant="primary" onClick={() => show(item.surl)}>
                                    Show QRCode
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(item._id)}>
                                    Delete
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>

            )}

            {/* Modal for displaying QR Code */}
            <Modal show={showModal} onHide={() => setShowModal(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>QR Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <QRCode size={256} value={local + showQr} />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
