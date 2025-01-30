import React from 'react';
import './Grid.css';
//data.json'dan gelen veriyi tablo olarak gösterdim.
//data.json'ı prop olarak aldım.
interface GridProps {
  data: {
    name: string;
    mailReceivedDate: string;
    solutionSentDate?: string;
    isBackgroundColorRed: boolean;
  }[];
}
//isBackgroundColorRed değerine göre satır arkaplan rengini kırmızı yaptım.
export const Grid: React.FC<GridProps> = ({ data }) => {
  return (
    <table>
      <tbody>
        {data.map((item, index) => (
          <tr 
            key={index} 
            style={{ backgroundColor: item.isBackgroundColorRed ? 'red' : 'initial' }}
          >
            <td>{item.name}</td>
            <td className="mailReceivedDate">{item.mailReceivedDate}</td>
            <td className="solutionSentDate">{item.solutionSentDate || ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};