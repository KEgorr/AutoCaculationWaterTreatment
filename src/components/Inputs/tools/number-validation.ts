export default function validation(event: React.ChangeEvent<HTMLInputElement>) {
  const newValue = event.target.value;
  if (!(Number(newValue) || newValue === '')) {
    return false;
  }
  return true;
}
