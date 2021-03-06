import { default as Router } from 'next/router'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { SessionUser, User } from 'types/User.type'

import apis from 'helpers/api/api.helper'

export const useSessionUser = ({
	redirectTo = undefined,
	redirectIfLogined = false,
}: {
	redirectTo?: string
	redirectIfLogined?: boolean
} = {}) => {
	const [sessionUser, setSessionUser] = useState<SessionUser | undefined>()
	const [isLogining, setIsLogining] = useState<boolean>(false)

	const handler = useCallback(
		(user: SessionUser | undefined) => {
			setSessionUser(user)
			if (
				(redirectIfLogined && user?.isLogined) ||
				(!redirectIfLogined && !user?.isLogined)
			) {
				redirectTo && Router.push(redirectTo)
			}
		},
		[redirectTo, redirectIfLogined, setSessionUser]
	)

	useEffect(() => {
		// if no redirect needed, just return (example: already on /dashboard)
		// if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
		if (!redirectTo || isLogining) {
			return
		}

		if (redirectTo) {
			if (!sessionUser?.isLogined) {
				setIsLogining(true)

				apis
					.getMe()
					.then((_sessionUser) => {
						handler(_sessionUser as unknown as SessionUser)
					})
					.catch(() => {
						handler(undefined)
					})
					.finally(() => {
						setIsLogining(false)
					})
			} else {
				handler(sessionUser)
			}
		}
	}, [
		redirectTo,
		redirectIfLogined,
		sessionUser,
		handler,
		setIsLogining,
		isLogining,
	])

	return {
		sessionUser,
		setSessionUser,
		isLogining,
		isRedirecting:
			redirectTo &&
			// If redirectTo is set, redirect if the user was not found.
			((redirectIfLogined && sessionUser?.isLogined) ||
				(!redirectIfLogined && !sessionUser?.isLogined)),
	}
}

export const useSessionUserForPublicPages = () =>
	useSessionUser({
		redirectTo: '/',
		redirectIfLogined: true,
	})

export const useSessionUserForProtectedPages = () =>
	useSessionUser({
		redirectTo: '/auth/login',
	})
