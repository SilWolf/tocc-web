import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useSessionUser } from './hooks/auth.hook'

const httpLink = createHttpLink({
	uri: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/graphql`,
})

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const { sessionUser } = useSessionUser()

	if (!sessionUser) {
		return { headers }
	}
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: sessionUser.jwt ? `Bearer ${sessionUser.jwt}` : '',
		},
	}
})

const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
})

export default apolloClient
