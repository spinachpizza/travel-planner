import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MdDownload } from "react-icons/md";

interface Props {
  captureRef: React.RefObject<HTMLDivElement | null>;
}

export default function DownloadButton({ captureRef }: Props) {
  const downloadPDF = async () => {
    if (!captureRef.current) return;

    const element = captureRef.current;

    // Render at higher scale for better resolution
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Image dimensions in PDF units
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pdfWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save("trip.pdf");
  };

  return (
    <div
      className="main-edit-button-container"
      onClick={downloadPDF}
      style={{ cursor: "pointer" }}
      title="Download Trip as PDF (experimental)"
    >
      <MdDownload size={50} style={{ marginTop: 14 }} />
    </div>
  );
}