export async function request(type) {
  const response = await fetch(`https://disease.sh/v3/covid-19/${type}`, {
    method: 'GET',
    headers: {},
  });

  return await response.json();
}
