import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { mock } from './mock'

export type ExtendedAxiosRequestConfig = AxiosRequestConfig & {
	ignoreError?: boolean
}

const instance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT || '/api',
	timeout: 30000,
	headers: {
		'Content-Type': 'application/json',
	},
})

if (process.env.NEXT_PUBLIC_USE_MOCK) {
	mock(instance)
}

const apis = {
	rawRequest: <T = unknown>(
		config: ExtendedAxiosRequestConfig
	): Promise<AxiosResponse<T>> => {
		return instance.request<T>(config)
	},
	request: <T = unknown>(config: ExtendedAxiosRequestConfig): Promise<T> => {
		return instance.request<T>(config).then((res) => res.data)
	},
	get: async <T = unknown>(
		url: string,
		config?: ExtendedAxiosRequestConfig
	): Promise<T> => {
		return instance.get<T>(url, config).then((res) => res.data)
	},
	delete: async <T = unknown>(
		url: string,
		config?: ExtendedAxiosRequestConfig
	): Promise<T> => {
		return instance.delete<T>(url, config).then((res) => res.data)
	},
	head: async <T = unknown>(
		url: string,
		config?: ExtendedAxiosRequestConfig
	): Promise<T> => {
		return instance.head<T>(url, config).then((res) => res.data)
	},
	options: async <T = unknown>(
		url: string,
		config?: ExtendedAxiosRequestConfig
	): Promise<T> => {
		return instance.options<T>(url, config).then((res) => res.data)
	},
	post: async <T = unknown>(
		url: string,
		data?: Record<string, unknown>,
		config?: ExtendedAxiosRequestConfig
	): Promise<T> => {
		return instance.post<T>(url, data, config).then((res) => res.data)
	},
	put: async <T = unknown>(
		url: string,
		data?: Record<string, unknown>,
		config?: ExtendedAxiosRequestConfig
	): Promise<T> => {
		return instance.put<T>(url, data, config).then((res) => res.data)
	},
	patch: async <T = unknown>(
		url: string,
		data?: Record<string, unknown>,
		config?: ExtendedAxiosRequestConfig
	): Promise<T> => {
		return instance.patch<T>(url, data, config).then((res) => res.data)
	},
}

const obj = {
	...instance,
	...apis,
}

export default obj

export const request = apis.request
export type { Method as AxiosMethod } from 'axios'
