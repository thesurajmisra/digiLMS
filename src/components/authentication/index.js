import { Route, Switch, useRouteMatch } from "react-router";
import Checkout from "../checkout";
import Header from "../header";
import ListCourses from "../listCourses";
import Home from "./home";
import Login from "./login";
import Register from "./register";

const Main = props => {

    let { path, url } = useRouteMatch();

    return (
        <div>
            <Header open={false} drawerWidth={0} handleDrawerOpen={() => { }} drawer={true} />

            <div>
                <Switch>
                    <Route path={`${path}/login`} component={Login} />
                    <Route path={`${path}/register`} component={Register} />
                    <Route path={`${path}/list`} component={ListCourses} />
                    <Route path={`${path}/checkout`} component={Checkout} />
                    <Route path={`${path}/home`} component={Home} />
                </Switch>

            </div>
        </div>
    )
}

export default Main;