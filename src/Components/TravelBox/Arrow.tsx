import './TravelBox.css'
import { TbTriangleInverted } from 'react-icons/tb'

export default function Arrow() {
    return (
        <div style={{height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <div className="arrow-line" />
            <TbTriangleInverted size={20} style={{ marginTop: -2 }} />
        </div>
    )
}