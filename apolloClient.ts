import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
	uri: `${process.env.API_ENDPOINT || '/api'}/graphql`,
})

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
		},
	}
})

const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
})

export default apolloClient
