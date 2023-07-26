import React from 'react';
import { hours } from '@/data';

export default function ReportTable({ reports }) {
  const hourTotals = Array.from({ length: hours.length }, () => 0);

  reports.forEach((report) => {
    report.hourly_sales.forEach((sales, idx) => {
      hourTotals[idx] += sales;
    });
  });

  return (
    <div className="flex justify-center mb-4">
      {reports.length === 0 ? (
        <h2 className="text-2xl font-bold text-red-600">No Cookie Stands Available</h2>
      ) : (
        <table className="w-full border-collapse border border-green-500">
          <thead>
            <tr>
              <th className="bg-green-500 text-white text-left px-4 py-2 border border-green-500 font-bold">
                Location
              </th>
              {hours.map((hour) => (
                <th
                  className="bg-green-500 text-white text-center border border-green-500 font-bold"
                  key={hour}
                >
                  {hour}
                </th>
              ))}
              <th className="bg-green-500 text-white text-center px-4 py-2 border border-green-500 font-bold">
                Totals
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="text-center border border-green-500">
                  {report.location}
                  <button
                    className="text-red-600"
                    onClick={() => onDeleteRow(report.id)}
                  >
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-6 h-6 inline-block mr-2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
            </button>
                </td>
                {report.hourly_sales.map((sales, index) => (
                  <td key={index} className="text-center border border-green-500">
                    {sales}
                  </td>
                ))}
                <td className="text-center border border-green-500 font-bold">
                  {report.hourly_sales.reduce((acc, sales) => acc + sales, 0)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="bg-green-500 text-white text-left px-4 py-2 border border-green-500 font-bold">
                Total
              </td>
              {hours.map((_, index) => (
                <td
                  key={index}
                  className="bg-green-500 text-white text-center border border-green-500 font-bold"
                >
                  {reports.reduce((acc, report) => acc + report.hourly_sales[index], 0)}
                </td>
              ))}
              <td className="bg-green-500 text-white text-center px-4 py-2 border border-green-500 font-bold">
                {reports.reduce(
                  (acc, report) =>
                    acc + report.hourly_sales.reduce((a, b) => a + b, 0),
                  0
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
