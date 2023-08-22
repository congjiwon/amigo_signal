export function Timestamptz(date: any) {
  const koreanTime = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);

  return Timestamptz;
}

// const now = new Date();

// // export const Timestamptz = now.toISOString().replace(/Z$/, '+09:00');
// export const Timestamptz = new Date(now.getTime() + 9 * 60 * 60 * 1000);
