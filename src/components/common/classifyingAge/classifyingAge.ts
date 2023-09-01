export default function classifyingAge(birthDate: string): string | null {
  const birthYear = new Date(birthDate).getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  if (age < 0) {
    return null; // 잘못된 날짜 입력에 대한 처리
  }

  const decade = Math.floor(age / 10);
  const remainder = age % 10;

  let ageRange = '';

  if (decade >= 1 && decade <= 9) {
    if (remainder < 3) {
      ageRange = `${decade * 10}대 초반`;
    } else if (remainder < 6) {
      ageRange = `${decade * 10}대 중반`;
    } else {
      ageRange = `${decade * 10}대 후반`;
    }
  } else {
    ageRange = `${decade * 10}대`;
  }

  return ageRange;
}
