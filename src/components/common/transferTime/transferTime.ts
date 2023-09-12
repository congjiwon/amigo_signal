// 작성시간(createAt) -> 시간 경과 렌더링하도록 변경
export const timeAgo = (createDate: string) => {
  const date = new Date(createDate);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const timeUnits = [
    { value: days, unit: '일' },
    { value: hours, unit: '시간' },
    { value: minutes, unit: '분' },
    { value: seconds, unit: '초' },
  ];
  const result = timeUnits.find((unit) => unit.value > 0) || timeUnits[timeUnits.length - 1];
  return `${result.value}${result.unit} 전`;
};
