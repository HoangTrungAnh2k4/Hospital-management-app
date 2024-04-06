import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import DefaultLayout from './components/Layout';
import { Fragment } from 'react';
import { database } from './firebase';
import { get, child, ref, set } from 'firebase/database';

function App() {
    // const dbRef = ref(database);

    // get database
    // get(child(dbRef, `accounts/admin`))
    //     .then((snapshot) => {
    //         if (snapshot.exists()) {
    //             console.log(snapshot.val());
    //         } else {
    //             console.log('No data available');
    //         }
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });

    // set database
    // set(child(dbRef, `accounts/user`), {
    //     user3: 12345,
    // });

    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Pages = route.component;
                        const Layout = route.layout === null ? Fragment : DefaultLayout;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Pages />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
