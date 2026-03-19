import type { InjectionKey, ComputedRef } from 'vue';

export const CTX_KEY: InjectionKey<{
	width: ComputedRef<number>,
}> = Symbol('CTX_KEY');
