'use client'
import React from 'react'
import MasterLogin from './master-login/MasterLogin'
import { useState } from 'react'
import MasterPanel from './master-panel/MasterPanel'

const page = () => {
    const [step, setstep] = useState(0)
    return (
        <div>
            {step === 0 ? <MasterLogin /> : <MasterPanel />}
        </div>
    )
}

export default page