import React from 'react'


const TabButton = ({ isActive, icon, text, onClick, }) => {
    return (
        <button
            style={{
                padding: '8px 16px',
                borderRadius: '4px',
                background: isActive ? 'var(--homeMainBtn)' : 'var(--infoCardClr)',
                border: '1px solid var(--homeMainBtn)',
                color: isActive ? 'var(--homePrimaryClr)' : 'var(--homeMainBtn)',
                alignItems: 'center',
                gap: '8px',
                flex: '1',
                minWidth: '200px',
            }}
            onClick={onClick}
        >
            {icon} {text}
        </button>
    )
}

export default TabButton