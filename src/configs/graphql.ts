import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
    // WIP:
    // const token = localStorage.getItem('token')
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZXhwIjoxNjk3NjM3ODcyLCJpZCI6IjEifQ.kNDSTorOvYr1iB3xggfWgsZ6oNFuiJvgYmq0kmTPWgs'

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