import { mock } from './mock'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { setupCache } from 'axios-cache-adapter'

export type ExtendedAxiosRequestConfig = AxiosRequestConfig & {
	ignoreError?: boolean
}

const cache = setupCache({
	maxAge: 0,
})

export const getInstance = (config?: { jwt?: string }) => {
	const _instance: AxiosInstance = axios.create({
		adapter: cache.adapter,
		baseURL: process.env.API_ENDPOINT || '/api',
		timeout: 30000,
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (config?.jwt) {
		_instance.defaults.headers.common['Authorization'] = `Bearer ${config.jwt}`
	}

	if (process.env.NEXT_PUBLIC_USE_MOCK) {
		mock(_instance)
	}

	const apis = {
		rawRequest: <T = unknown>(
			config: ExtendedAxiosRequestConfig
		): Promise<AxiosResponse<T>> => {
			return _instance.request<T>(config)
		},
		request: <T = unknown>(config: ExtendedAxiosRequestConfig): Promise<T> => {
			return _instance.request<T>(config).then((res) => res.data)
		},
		get: async <T = unknown>(
			url: string,
			config?: ExtendedAxiosRequestConfig
		): Promise<T> => {
			return _instance.get<T>(url, config).then((res) => res.data)
		},
		delete: async <T = unknown>(
			url: string,
			config?: ExtendedAxiosRequestConfig
		): Promise<T> => {
			return _instance.delete<T>(url, config).then((res) => res.data)
		},
		head: async <T = unknown>(
			url: string,
			config?: ExtendedAxiosRequestConfig
		): Promise<T> => {
			return _instance.head<T>(url, config).then((res) => res.data)
		},
		options: async <T = unknown>(
			url: string,
			config?: ExtendedAxiosRequestConfig
		): Promise<T> => {
			return _instance.options<T>(url, config).then((res) => res.data)
		},
		post: async <T = unknown>(
			url: string,
			data?: Record<string, unknown>,
			config?: ExtendedAxiosRequestConfig
		): Promise<T> => {
			return _instance.post<T>(url, data, config).then((res) => res.data)
		},
		put: async <T = unknown>(
			url: string,
			data?: Record<string, unknown>,
			config?: ExtendedAxiosRequestConfig
		): Promise<T> => {
			return _instance.put<T>(url, data, config).then((res) => res.data)
		},
		patch: async <T = unknown>(
			url: string,
			data?: Record<string, unknown>,
			config?: ExtendedAxiosRequestConfig
		): Promise<T> => {
			return _instance.patch<T>(url, data, config).then((res) => res.data)
		},
	}

	return {
		..._instance,
		...apis,
	}
}

const api = getInstance()
export default api

export type { Method as AxiosMethod } from 'axios'
