'use client';

import { Button } from '@/components/Button';

type Props = { filename: string; header: string[]; rows: (string | number)[][]; label: string };

function cell(value: string | number): string {
  const text = String(value);
  return /[";\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/**
 * Client-side CSV. UTF-8 BOM so Excel reads umlauts; semicolon delimiter because
 * German Excel splits on it by default (NOTES.md).
 */
export function CsvExport({ filename, header, rows, label }: Props) {
  function download() {
    const lines = [header, ...rows].map((row) => row.map(cell).join(';'));
    const blob = new Blob(['﻿' + lines.join('\r\n') + '\r\n'], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <Button variant="secondary" fullWidth={false} onClick={download}>
      {label}
    </Button>
  );
}
