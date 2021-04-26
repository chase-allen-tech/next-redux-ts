import { NextPageContext } from 'next';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import store, { Store } from '../store';
import Head from 'next/head';
import { Grid } from '@material-ui/core'
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

// Getting date from store
interface AppContext extends NextPageContext {
    store: Store;
}

class MyApp extends App<AppContext> {

    render() {
        // const errorLink = onError(({ graphQLErrors, networkError }) => {
        //     if (graphQLErrors) {
        //         console.log('graphQLErrors', graphQLErrors);
        //     }
        //     if (networkError) {
        //         console.log('networkError', networkError);
        //     }
        // });

        // const link = ApolloLink.from([errorLink]);

        const client = new ApolloClient({
            uri: 'https://preprod.smart4.digital/admin',
            cache: new InMemoryCache(),
        });
        const { store, Component, ...props } = this.props;
        return (
            <>
                <Head>
                    <link rel="stylesheet" href="/static/css/main.css" />
                    <link rel="stylesheet" href="/static/css/bootstrap.min.css" />
                </Head>
                <ApolloProvider client={client}>
                    <Provider store={store}>
                        <Navbar />
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={2}>
                                <Sidebar></Sidebar>
                            </Grid>
                            <Grid item xs={12} sm={12} md={10} className="bk-color-secondary">
                                <Component {...props} />
                            </Grid>
                        </Grid>
                    </Provider>
                </ApolloProvider>
            </>
        );
    }
}

export default withRedux(store)(MyApp);
