import { jsPDF } from 'jspdf';
import resumeContent from '../../docs/resume.md?raw';

export interface GeneratePdfOptions {
  filename?: string;
}

/**
 * Gera um documento PDF profissional com base no conteúdo de docs/resume.md
 */
export function generateResumePdf(): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const lines = resumeContent.split('\n');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin - 5) {
      doc.addPage();
      y = margin;
    }
  };

  // Faixa decorativa superior em azul Win2K
  doc.setFillColor(0, 0, 128);
  doc.rect(margin, y, contentWidth, 1.2, 'F');
  y += 5;

  // Cabeçalho Principal
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(0, 0, 128);
  doc.text('LUIS FELIPE FELIX FILHO', margin, y);
  y += 5.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 60);
  doc.text('Platform Engineer | Cloud & DevOps Specialist', margin, y);
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(
    'Bonn, Germany | luis.felix.filho@hotmail.com | github.com/luisfelix-93 | linkedin.com/in/luisfelixfilho',
    margin,
    y
  );
  y += 5;

  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, margin + contentWidth, y);
  y += 5;

  // Processamento linha a linha do markdown
  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // remove links markdown
      .replace(/\[\.underline\]/g, '')
      .replace(/[\{\}]/g, '')
      .replace(/\*\*/g, '')
      .replace(/^>\s*/, '')
      .trim();

    if (!line) {
      y += 2;
      continue;
    }

    if (line.startsWith('# ')) {
      // Já renderizado no cabeçalho customizado
      continue;
    } else if (line.startsWith('## ')) {
      checkPageBreak(12);
      y += 3;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(0, 0, 128);
      const sectionTitle = line.replace(/^##\s*/, '').toUpperCase();
      doc.text(sectionTitle, margin, y);
      y += 1.8;
      doc.setDrawColor(0, 0, 128);
      doc.line(margin, y, margin + contentWidth, y);
      y += 4;
    } else if (
      line.startsWith('-   ') ||
      line.startsWith('- ') ||
      line.startsWith('● ') ||
      line.startsWith('* ')
    ) {
      checkPageBreak(7);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(40, 40, 40);
      const bulletText = line.replace(/^[-●*]\s+/, '').trim();
      const splitBullet = doc.splitTextToSize(bulletText, contentWidth - 5);

      doc.text('•', margin + 1, y);
      doc.text(splitBullet, margin + 4.5, y);
      y += splitBullet.length * 3.8;
    } else {
      checkPageBreak(6);
      const isMetadata =
        line.includes('(') &&
        (line.includes('Present') ||
          line.includes('202') ||
          line.includes('Brazil') ||
          line.includes('Remote') ||
          line.includes('On Site'));

      if (isMetadata) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(30, 30, 30);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(50, 50, 50);
      }

      const splitLine = doc.splitTextToSize(line, contentWidth);
      doc.text(splitLine, margin, y);
      y += splitLine.length * 3.8;
    }
  }

  // Rodapé com paginação
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(140, 140, 140);
    doc.text(
      `Luis Felipe Felix Filho - Currículo Profissional | Página ${p} de ${totalPages}`,
      pageWidth / 2,
      pageHeight - 6,
      { align: 'center' }
    );
  }

  return doc;
}

/**
 * Dispara o download automático do currículo em formato PDF
 */
export function downloadResumePdf(filename = 'curriculo_luis_felipe_felix.pdf'): void {
  const doc = generateResumePdf();
  doc.save(filename);
}
