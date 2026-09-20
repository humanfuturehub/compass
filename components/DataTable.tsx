import type { ReactNode } from 'react';

export type Column<Row> = {
  key: string;
  header: string;
  render: (row: Row) => ReactNode;
  align?: 'left' | 'right';
};

type Props<Row> = {
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  caption: string;
  empty: string;
};

/** Plain admin table. Wide content scrolls inside its own container. */
export function DataTable<Row>({ columns, rows, rowKey, caption, empty }: Props<Row>) {
  return (
    <div className="overflow-x-auto rounded-card border border-border">
      <table className="w-full text-small text-ink">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-surface-sunken text-left text-micro text-ink-muted">
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className={`px-12 py-8 font-medium ${column.align === 'right' ? 'text-right' : ''}`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-12 py-16 text-ink-muted">
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={rowKey(row)} className="border-t border-border">
                {columns.map((column) => (
                  <td key={column.key} className={`px-12 py-8 ${column.align === 'right' ? 'text-right' : ''}`}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
