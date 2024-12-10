'use client'
import React from 'react'
import { DynamicHeader } from './dynamicHeaderFooter'

const RootFileData = ({ children }) => {
    const { renderFooter, renderHeader } = DynamicHeader()
    return (
        <div>
            {renderHeader()}
            {children}
            {renderFooter()}
        </div>
    )
}

export default RootFileData