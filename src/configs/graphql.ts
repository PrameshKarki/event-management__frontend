import { ApolloClient, InMemoryCache } from '@apollo/client';

console.log(process.env.NEXT_PUBLIC_GRAPH_URL);
const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPH_URL, // Replace with your GraphQL server URL
    cache: new InMemoryCache(),
});

export default client;