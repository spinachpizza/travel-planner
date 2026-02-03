interface Props {
    title: string;
    content: string;
}

export default function TitleAndContent({ title, content}: Props) {
    return (
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 5}}>
            <p style={{ fontSize: 12, color: "rgb(128, 128, 128)" }}>{title}</p>
            <p className="default-text">{content}</p>
        </div>
    )
}