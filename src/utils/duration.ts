export const convertMinsToHrsMins = (mins?: number) => {
  if(!mins) return ''

  if (mins < 60) return `${mins}m`;

  const h: number | string = Math.floor(mins / 60);
  const m: number | string = mins % 60;
  return `${h}h${m}m`;
};
