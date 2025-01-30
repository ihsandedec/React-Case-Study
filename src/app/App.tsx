import React from 'react';
import './App.css';
import dataList from './data.json';
import { Grid } from './components/Grid';

//Tarih farkı
function dateDiffInDays(a: Date, b: Date): number {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function control(today: Date, limit: number) {
  const allTrs = [...document.querySelectorAll('table tr')] as HTMLTableRowElement[];
  let wrongEntryCount = 0;
  const wrongEntries: { name: string; reason: string }[] = [];

  for (let i = 0; i < allTrs.length; i++) {
    const tr = allTrs[i];
    const name = tr.querySelector('td:nth-child(1)')?.textContent || '';
    const mailReceivedDate = tr.querySelector('td:nth-child(2)')?.textContent || '';
    const solutionSentDate = tr.querySelector('td:nth-child(3)')?.textContent || '';

    if (mailReceivedDate) { // Boş satırlar
      const date1 = new Date(mailReceivedDate);
      let date2 = new Date(solutionSentDate);

      if (!solutionSentDate || solutionSentDate.trim().length === 0) {
        date2 = today;
      }

      const dayDiffTotal = dateDiffInDays(date1, date2);
      const hasRedBackground = window.getComputedStyle(tr).backgroundColor.includes('rgb(255, 0, 0)');
      const shouldBeRed = dayDiffTotal > limit;

      if (hasRedBackground !== shouldBeRed) {
        wrongEntryCount++;
        const reason = shouldBeRed
          ? `Geçen gün sayısı : ${dayDiffTotal} limitten (${limit}) fazla olmasına rağmen kırmızı değil`
          : `Geçen gün sayısı : ${dayDiffTotal} limit içinde olmasına rağmen kırmızı renkte`;
        wrongEntries.push({ name, reason });
      }
    }
  }

  
  let resultText = `Toplam ${wrongEntryCount} adet hatalı satır bulundu.`;
  if (wrongEntries.length > 0) {
    resultText += '\n\nDetaylar:\n';
    wrongEntries.forEach(entry => {
      resultText += `- ${entry.name}: ${entry.reason}\n`;
    });
  }

  const resultHtml = document.querySelector('.result') as HTMLElement;
  resultHtml.innerText = resultText;
  resultHtml.style.display = 'block';
}

const App: React.FC = () => {
  const [today, setToday] = React.useState<string>('2021-10-06');
  const [limit, setLimit] = React.useState<number>(5);

  const handleCalculate = () => {
    control(new Date(today), limit);
  };

  return (
    <div className="app">
      <h1>Dgpays Case Study</h1>
      <Grid data={dataList} />
      <div style={{ margin: '20px 0' }}>
        <div>
          <label>Today: </label>
          <input 
            type="date" 
            value={today}
            onChange={(e) => setToday(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Limit (days): </label>
          <input 
            type="number" 
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          />
        </div>
        <button 
          onClick={handleCalculate}
          style={{ marginTop: '10px' }}
        >
          Calculate
        </button>
      </div>
      <div className="result" style={{ display: 'none' }}></div>
    </div>
  );
};

export default App;