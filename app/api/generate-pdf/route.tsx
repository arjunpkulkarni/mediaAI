import { NextRequest, NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import PDFTemplate from '../../../components/PDFTemplate';
import { Readable } from 'stream';

export async function POST(request: NextRequest) {
  console.log("PDF generation request received");
  try {
    const body = await request.json();
    console.log("Request body:", body);
    
    const stream = await renderToStream(<PDFTemplate {...body} />);
    console.log("PDF stream created");
    
    const headers = new Headers({
      'Content-Type': 'application/pdf',
    });

    const nodeStream = Readable.from(stream);

    return new Response(nodeStream as any, { headers });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
} 