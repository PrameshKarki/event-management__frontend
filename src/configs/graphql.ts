import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'universal-cookie';

const authLink = setContext((_, { headers }) => {
    const cookies = new Cookies(null, { path: '/' });
    const token = cookies.get("token")
    console.log("🚀 ~ file: graphql.ts:8 ~ authLink ~ token:", token)
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPH_URL,

});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;