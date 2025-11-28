'use client';
import { useState, ChangeEvent } from 'react';
// Hooks
import { useThemeController } from '@/libs/hooks/useThemeController';
// Components
import { InputField } from '@/components/form';
// Local Components
import { TableHeader, TableHeaderProps } from './TableHeader';
import { TableBody, TableBodyProps } from './TableBody';

interface CreateTableProps {
  theadData: TableHeaderProps['columns'];
  tbodyData: TableBodyProps['tbodyData'];
  tfootData?: React.ReactNode | null;
  searcher?: boolean;
}

export function CreateTable({
  theadData = [],
  tbodyData = [{ columns: [], subRow: null }],
  tfootData = null,
  searcher = false
}: CreateTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  };

  const filteredData = tbodyData.filter((rows) =>
    rows.columns?.some((rowData) => String(rowData).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const startIndex = 0; // (currentPage - 1) * rowsPerPage
  const endIndex = 100; // startIndex + rowsPerPage
  const pageData = filteredData.length || searchTerm.length ? filteredData.slice(startIndex, endIndex) : tbodyData.slice(startIndex, endIndex);

  const { tones } = useThemeController();

  return (
    <section className="h-full w-full overflow-auto">
      <table className="h-full w-full">
        <TableHeader
          columns={theadData}
          subRow={searcher ?
            <div className={`flex items-center gap-2 p-1 md:px-2`}>
              {/* <Button text={"buscar"} /> */}

              <InputField
                name="tableSearch"
                onChange={handleSearchTerm}
                placeholder="buscar en la tabla"
                value={searchTerm}
              />

              {/* <Button text={"cerrar"} /> */}
            </div> : null
          }
        />

        <TableBody
          tbodyData={pageData}
          theadLength={theadData.length}
        />

        {tfootData &&
          <tfoot className={`${tones.bgColor.dark} ${tones.textColor} sticky bottom-0 z-0`}>
            {tfootData}
          </tfoot>
        }
      </table>
    </section>
  );
}
