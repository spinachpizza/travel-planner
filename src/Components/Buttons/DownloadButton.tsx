import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MdDownload } from "react-icons/md";
import '../../App.css'

interface Props {
  captureRef: React.RefObject<HTMLDivElement | null>;
}

export default function DownloadButton({ captureRef }: Props) {
    const downloadPDF = async () => {
        if (!captureRef.current) return;

        const element = captureRef.current;

		const originalBg = element.style.backgroundColor;
		element.style.backgroundColor = "transparent";
        const canvas = await html2canvas(element, { scale: 2, backgroundColor: null });
		element.style.backgroundColor = originalBg;

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

		while (heightLeft > 0) {
			position = heightLeft - imgHeight;
			pdf.addPage();
			pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
			heightLeft -= pdfHeight;
		}

        pdf.save("trip.pdf");
    };

    return (
        <div className="main-edit-button-container" onClick={downloadPDF} title="Download Trip as PDF (experimental)">
            <MdDownload size={50} style={{ marginTop: 14 }} />
        </div>
    );
}