import { camelCaseToTextCapitalize } from "../utils/utils";

interface IProps {
  title: string;
  description: string;
  data: any[];
  keysToExclude?: string[];
  loading?: boolean;
  action?: string;
  onAction?: () => void;
}

const Table = (props: IProps) => {
  const { title, description, data, keysToExclude, loading, action, onAction } =
    props;
  let keys = Object.keys(data[0] ?? {});

  if (keysToExclude) {
    keys = keys.filter((el) => !keysToExclude.includes(el));
  }
  let hasData = true;

  if (loading !== undefined) {
    hasData = data.length > 0 && !loading;
  }
  return (
    <>
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        {action && onAction && (
          <div className="mt-3 md:mt-0">
            <p
              onClick={() => onAction()}
              className="cursor-pointer text-sm inline-block px-3 py-1 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              {action}
            </p>
          </div>
        )}
      </div>
      <div className="mt-3 border rounded-lg overflow-x-auto">
        {hasData ? (
          <>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  {keys.map((el) => {
                    return (
                      <th className="py-3 px-6">
                        {camelCaseToTextCapitalize(el)}
                      </th>
                    );
                  })}
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {data.map((item, idx) => (
                  <tr key={idx}>
                    {Object.keys(item).map((el, index: number) => (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item[keys[index]]}
                        </td>
                      </>
                    ))}
                    {/* <td className="text-right px-6 whitespace-nowrap">
                  <a
                    href="javascript:void()"
                    className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Edit
                  </a>
                  <button
                    href="javascript:void()"
                    className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Delete
                  </button>
                </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <p className="text-center text-sm text-gray-400 py-4">
              No Data Found
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Table;
