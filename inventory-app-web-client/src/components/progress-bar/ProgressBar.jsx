import React, { useEffect, useRef } from 'react'
import './progress-bar.scss'

const ProgressBar = ({ value }) => {
    const barInnerRef = useRef()

    useEffect(() => {
        const maxPercentage = 100

        const clampedValue = Math.min(Math.max(value, 0), maxPercentage)

        barInnerRef.current.style.width = `${clampedValue}%`
    }, [value])

    return (
        <div className='progress-bar'>
            <div ref={barInnerRef} className="progress-bar__inner" />
        </div>
    )
}

export default ProgressBar
