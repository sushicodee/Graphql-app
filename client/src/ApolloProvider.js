import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';
import {setContext} from 'apollo-link-context';
import App from './App';

const httpLink = createHttpLink({uri:'http://localhost:9090'})
const authLink = setContext(() => {
    const token = localStorage.getItem('accessToken');
    return {
        headers:{
            Authorization:token ? token :''
        }
    }
}) 

const client = new ApolloClient({
    link:authLink.concat(httpLink),
    cache:new InMemoryCache()
})

export default (
    <ApolloProvider client = {client}>
        <App/>
    </ApolloProvider>
)


