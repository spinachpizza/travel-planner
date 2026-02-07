import '.././Styles/Arrow.css'
import { TbTriangleInverted } from 'react-icons/tb'

export default function Arrow() {
    return (
        <div className="arrow-container">
            <div className="arrow-line" />
            <TbTriangleInverted size={20} style={{ marginTop: -2 }} />
        </div>
    )
}