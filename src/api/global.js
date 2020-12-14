import { request } from './request';
import { transfromForGlobal } from './transform';

export async function getGlobalCases() {
  const apiGlobalData = await request('all');
  return transfromForGlobal(apiGlobalData);
}
