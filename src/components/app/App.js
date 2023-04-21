import { lazy, Suspense } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicLayout = lazy(() => import("../pages/singleComicLayout/SingleComicLayout"));
const SingleCharacterLayout = lazy(() =>
  import("../pages/singleCharacterLayout/SingleCharacterLayout")
);
const SinglePage = lazy(() => import("../pages/SinglePage"));

const App = () => {
  let location = useLocation();

  return (
    <div className="app">
      <SwitchTransition>
        <CSSTransition
          key={location.key}
          classNames={"fade-header"}
          timeout={400}
          mountOnEnter
          unmountOnExit
        >
          <AppHeader />
        </CSSTransition>
      </SwitchTransition>
      <main>
        <Suspense fallback={<Spinner />}>
          <SwitchTransition>
            <CSSTransition
              key={location.key}
              classNames={"fade"}
              timeout={300}
              mountOnEnter
              unmountOnExit
            >
              <Switch>
                <Route exact path="/">
                  <MainPage />
                </Route>
                <Route exact path="/comics">
                  <ComicsPage />
                </Route>
                <Route exact path="/comics/:id">
                  <SinglePage Component={SingleComicLayout} dataType="comic" />
                </Route>
                <Route exact path="/characters/:id">
                  <SinglePage Component={SingleCharacterLayout} dataType="character" />
                </Route>
                <Route path="*">
                  <Page404 />
                </Route>
              </Switch>
            </CSSTransition>
          </SwitchTransition>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
