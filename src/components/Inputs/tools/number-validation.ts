export default function validation(event: React.ChangeEvent<HTMLInputElement>) {
  const newValue = event.target.value;
  // eslint-disable-next-line no-restricted-globals
  if (!(!isNaN(Number(newValue)) || newValue === '')) {
    return false;
  }
  return true;
}
