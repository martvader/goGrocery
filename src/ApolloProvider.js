import React from 'react';
import App from './App';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    split,
    ApolloLink,
    concat,
    Observable,
    createHttpLink
} from '@apollo/client';
import ApolloLinkTimeout from 'apollo-link-timeout'
import {createUploadLink} from 'apollo-upload-client';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions'
import {getMainDefinition} from '@apollo/client/utilities';


const uploadLink = createUploadLink({
    uri: 'http://localhost:3200/graphql'  
})

const request = async(operation) => {
    const token = localStorage.getItem('jwtToken');
    operation.setContext({
         headers:{
            Authorization: token ? `Bearer ${token}` : ''
        }
   })
}

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  uploadLink
);

const requestLink = new ApolloLink(
    (operation, forward) =>
       new Observable((observer) => {
        let handle;
        Promise.resolve(operation)
          .then(oper => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
            });
        })
        .catch(observer.error.bind(observer));

    return () => {
        if (handle) handle.unsubscribe();
    };
}));

const client = new ApolloClient({
    connectToDevTools:true,
    link: ApolloLink.from([
        requestLink,
        uploadLink
    ]),
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
