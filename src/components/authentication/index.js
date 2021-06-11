import { Route, Switch, useRouteMatch } from "react-router";
import Checkout from "../checkout";
import Header from "../header";
import ListCourses from "../listCourses";
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
                </Switch>

            </div>
        </div>
    )
}

export default Main;