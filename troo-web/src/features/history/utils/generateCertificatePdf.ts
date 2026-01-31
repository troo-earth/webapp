import jsPDF from 'jspdf';

export interface CertificatePdfData {
  certificate_number: string;
  beneficiary: string;
  amount: string;
  project_name: string;
  retired_at: string;
  purpose: string;
}

const sanitizeText = (text: string = "") => {
  if (!text) return "";
  const map: { [key: string]: string } = {
    'ş': 's', 'Ş': 'S', 'ğ': 'g', 'Ğ': 'G', 'ç': 'c', 'Ç': 'C',
    'ü': 'u', 'Ü': 'U', 'ö': 'o', 'Ö': 'O', 'ı': 'i', 'İ': 'I'
  };
  return text
    .replace(/[şŞğĞçÇüÜöÖıİ]/g, letter => map[letter])
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const getLogoBase64 = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } else reject();
    };
    img.onerror = reject;
  });
};

export const generateCertificatePdf = async (data: CertificatePdfData, logoUrl: string) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const pageHeight = 297;

  const colors = {
    primary: [0, 116, 115] as [number, number, number],   // #007473
    secondary: [23, 62, 53] as [number, number, number], // #173E35
    accent: [255, 183, 27] as [number, number, number],  // #FFB71B
    smoke: [241, 245, 249] as [number, number, number]
  };

  // 1. COMPACT HEADER & BACKGROUND
  // Dark header bar to anchor the top
  doc.setFillColor(...colors.secondary);
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  // Right-side accent strip
  doc.setFillColor(...colors.primary);
  doc.rect(pageWidth - 5, 0, 5, 50, 'F');

  // 2. HEADER CONTENT (Prestige Style)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('times', 'bold'); 
  doc.text('CARBON RETIREMENT STATEMENT', 15, 25);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...colors.accent);
  doc.text(`REGISTRY REFERENCE: ${data.certificate_number}`, 15, 35);

  // 3. MAIN CONTENT (Reduced Whitespace)
  let y = 65;
  
  // Beneficiary Block
  doc.setTextColor(...colors.secondary);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('THIS IS TO CERTIFY THE PERMANENT RETIREMENT OF CARBON ASSETS BY:', 15, y);
  
  y += 10;
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...colors.primary);
  doc.text(sanitizeText(data.beneficiary).toUpperCase(), 15, y);

  // 4. THE IMPACT BAR (Full width, horizontal)
  y += 15;
  doc.setFillColor(...colors.smoke);
  doc.rect(0, y, pageWidth, 35, 'F');
  
  doc.setTextColor(...colors.secondary);
  doc.setFontSize(42);
  const amtStr = `${parseFloat(data.amount).toLocaleString()} tCO2e`;
  doc.text(amtStr, 15, y + 23);
  
  doc.setFontSize(10);
  doc.setTextColor(...colors.primary);
  doc.text('TOTAL TONNAGE VERIFIED AND RETIRED', 15, y + 30);

  // 5. TECHNICAL DATA GRID (Fintech Layout)
  y += 50;
  
  const drawRow = (label: string, value: string, currentY: number) => {
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.line(15, currentY, pageWidth - 15, currentY);
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.primary);
    doc.text(label, 15, currentY + 5);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.secondary);
    const splitVal = doc.splitTextToSize(sanitizeText(value), 170);
    doc.text(splitVal, 15, currentY + 12);
    
    return (splitVal.length * 5) + 12;
  };

  y += drawRow('PROJECT NAME / ORIGIN', data.project_name, y);
  y += drawRow('SERIAL REFERENCE', data.certificate_number, y);
  y += drawRow('DATE OF RETIREMENT', new Date(data.retired_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }), y);
  
  if (data.purpose && data.purpose !== "//") {
    y += drawRow('RETIREMENT PURPOSE', data.purpose, y);
  }

  // 6. COMPACT FOOTER
  const footerY = pageHeight - 40;
  
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  const legal = "This document is a formal record of asset retirement within the Troo Registry. Upon issuance of this statement, the underlying carbon units are permanently cancelled and cannot be further traded or claimed. This event is cryptographically recorded.";
  doc.text(doc.splitTextToSize(legal, 140), 15, footerY);

  // Logo Integration (Bottom Right)
  try {
    const logoBase64 = await getLogoBase64(logoUrl);
    doc.addImage(logoBase64, 'PNG', pageWidth - 55, pageHeight - 35, 40, 15, undefined, 'FAST');
  } catch (e) {
    doc.setTextColor(...colors.primary);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text("TROO", pageWidth - 15, pageHeight - 20, { align: 'right' });
  }

  doc.save(`Troo_Official_Statement.pdf`);
};