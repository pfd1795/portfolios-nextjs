import { ExpandableRow } from './ExpandableRow';

export interface TableBodyProps {
  tbodyData: Array<{
    columns: (string | number | React.ReactNode)[];
    subRow?: (string | number | React.ReactNode) | null;
  }>
  theadLength: number;
}

export const TableBody: React.FC<TableBodyProps> = ({
  tbodyData = [{
    columns: [],
    subRow: null
  }],
  theadLength = 1
}) => {
  return (
    <tbody>
      {tbodyData.length > 0 ? (
        tbodyData.map((data, i) =>
          data.subRow ? (
            <ExpandableRow
              key={i}
              columns={data.columns}
              subRow={data.subRow}
            />
          ) : (
            <tr key={i} className="border-b-2 border-t-2 border-sky-900">
              {data.columns.map((data, j) => <td key={j} className="text-center p-1 md:px-2">{data}</td>)}
            </tr>
          )
        )
      ) : (
        <tr>
          <td className="text-center p-1 md:px-2" colSpan={theadLength}>
            <p className="h-full flex justify-center items-center">columnas de tabla vacias..</p>
          </td>
        </tr>
      )}
    </tbody>
  )
}
