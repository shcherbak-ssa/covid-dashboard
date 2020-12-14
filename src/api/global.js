import { request } from './request';

export async function getGlobalCases() {
  const apiData = await request('all');
  console.log(apiData);
}
