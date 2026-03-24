import { encode, decode } from 'js-base64';

import type { openAISetting } from './types';

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

export function throttle<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let lastCallTime = 0;
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCallTime >= delay) {
      fn.apply(this, args);
      lastCallTime = now;
    }
  };
}

/**
 * 浅拷贝对象
 * @param obj
 * @returns
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T;
  }

  const clone = Object.assign({}, obj);
  for (const key in clone) {
    if (Object.prototype.hasOwnProperty.call(clone, key)) {
      clone[key] = deepClone(clone[key]);
    }
  }
  return clone;
}

/**
 * 简单浅拷贝对象
 * @param obj
 * @returns
 */
export function simpleDeepClone<T>(obj: T): T {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (error) {
    console.error('simpleDeepClone failed:', error);
    return obj;
  }
}

// 以base64的格式存在数据库中
export function stringifyOpenAISetting(setting: openAISetting) {
  try {
    return encode(JSON.stringify(setting))
  } catch (error) {
    console.error('stringifyOpenAISetting failed:', error);
    return '';
  }
}

export function parseOpenAISetting(setting: string): openAISetting {
  try {
    return JSON.parse(decode(setting))
  } catch (error) {
    console.error('parseOpenAISetting failed:', error);
    return {} as openAISetting;
  }
}
