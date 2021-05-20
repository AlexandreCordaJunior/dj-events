import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />;
        </AuthProvider>
    );
}

export default MyApp;
