export default function handleOneDigitNumber(number) {
  return parseInt(number) < 10 ? `0${number}` : number;
}
