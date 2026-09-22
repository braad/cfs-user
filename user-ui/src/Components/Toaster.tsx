import React, { useEffect, useState } from 'react';

interface ToasterProps {
    message: string;
}

const Toaster = ({message}:ToasterProps) => {

    const [toastMessage, setToastMessage] = useState<string | null>(message);

    // When toaster is displayed clear it after 4 seconds
    useEffect(() => {
        if (message) {
            setToastMessage(message);
            const timer = setTimeout(() => {
                setToastMessage(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div>
            {toastMessage && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    backgroundColor: '#acddae',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '4px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 1000,
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                }} >
                    {toastMessage}
                </div>
            )}
        </div>
    )
}

export default Toaster;