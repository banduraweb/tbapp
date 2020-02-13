import React, {useState, useCallback, useEffect, lazy, Suspense} from "react";
import {useHttp} from "./hooks/http.hook";
import {Preloader} from "./components/Preloader";
import {Route, NavLink, Switch, Redirect} from "react-router-dom";


const App = () => {

    const [tabs, setTabs] = useState([]);
    const {loading, request} = useHttp();

    const loadedTabsInfo = useCallback(async () => {
        try {
            const data = await request("http://localhost:8585/api/", "GET", null, {});
            setTabs(data);
        } catch (e) {
        }
    }, [request]);

    useEffect(() => {
        loadedTabsInfo();
    }, [loadedTabsInfo]);

    if (loading) {
        return <Preloader/>;
    }

    const sortedTabsByOrder =
        tabs.length > 0 ? [...tabs].sort((a, b) => a.order - b.order) : [];
    console.log(tabs);

    const dynamicComponent = (url) => {
        const DummyTable = lazy(() => import(`./components/${url}`));
        return (
            <Suspense fallback={<Preloader/>}>
                <DummyTable/>
            </Suspense>
        )

    };


    return (
        <div className="tabs">
            {sortedTabsByOrder.length > 0 && (
                <>
                    {sortedTabsByOrder.map(({_id, title, id_name, path}, idx, data) => (
                        <div key={_id}>

                            <NavLink to={`/${id_name}`} replace>
                                <div className="button-nav">
                                    {" "}
                                  {title}
                                    {" "}

                                </div>
                            </NavLink>
                            <div className="content">
                            <Switch>
                                <Route
                                    path={`/${id_name}`}
                                    component={() => dynamicComponent(path)}
                                />
                                <Route
                                    exact
                                    path="/"
                                    render={() => (
                                        <Redirect exact from="/*" to={`/${data[0].id_name}`}/>
                                    )}
                                />
                            </Switch>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default App;
