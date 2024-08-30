export function stringifyValueByName(name: string, value: string) {
  try {
    const json = JSON.stringify({ [name]: value });
    return json;
  } catch (error) {
    console.error('JSON Stringify');
    return null;
  }
}

export function formatDate(time: string) {
  const formatLength = 5; // 00:00

  const date = new Date(time);
  return date.toTimeString().split(' ')[0]?.slice(0, formatLength);
}
