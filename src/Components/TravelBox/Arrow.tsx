import { BsTriangle } from 'react-icons/bs'
import './TravelBox.css'

export default function Arrow() {
    return (
        <div style={{height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <div className="arrow-line" />
            <BsTriangle size={20} style={{ transform: "rotate(180deg)", marginLeft: 1}}/>
        </div>
    )
}