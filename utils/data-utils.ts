type LunarData = {};

export async function getLunarData() {
  const fetchResponse = await fetch("https://lunar-api.pages.dev/today");
  return await fetchResponse.json();
}
