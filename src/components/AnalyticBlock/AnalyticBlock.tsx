import { FC, useState, useEffect } from 'react';
import styles from './AnalyticBlock.module.css';
import Plot from 'react-plotly.js';

interface Props {
  plot: { data: any; layout: any };
  text: string;
  status: 'bad' | 'good' | 'ok';
}
export const AnalyticBlock: FC<Props> = ({ plot, text, status }) => {
  const [statusColor, setStatusColor] = useState('');

  function Color(stat: string) {
    if (stat === 'bad') {
      setStatusColor('red');
    } else if (stat === 'ok') {
      setStatusColor('#8C64D8');
    } else if (stat === 'good') {
      setStatusColor('green');
    }
  }

  useEffect(() => {
    Color(status);
  }, []);

  return (
    <div
      className={styles.block}
      style={{ border: `${statusColor} 5px solid` }}
    >
      <p className={styles.text}>{text}</p>
      <Plot data={plot.data} layout={plot.layout} />
    </div>
  );
};
