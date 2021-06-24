import { Button, Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import cssClasses from "../cssClasses";
import { Link } from "react-router-dom";
import { UserContext } from "../../providers/userContext";

const ManageUser = props => {

    const userService = useContext(UserContext);
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const baseClasses = cssClasses();

    const fetchUsers = () => {
        userService.getAll()
            .then(data => {
                console.log(data);
                setUserList(data);
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    const deleteUser = (id) => {
        userService.deleteUser(id)
            .then(res => {
                console.log(res);
                fetchUsers();
            })
    }

    const displayUsers = () => {
        return userList.map((user, index) => {
            if (!loading) {
                return (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{user.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                            <div className="row">
                                <div className="col-4">
                                    <p>Description</p>
                                </div>
                                <div className="col-8">
                                    <p>{user.description}</p>
                                </div>
                            </div>
                            <br />

                            <div className="row">
                                <div className="col-4">
                                    <p>Features</p>
                                </div>
                                <div className="col-8">
                                    <p>{user.features}</p>
                                </div>
                            </div>
                            <br />

                            <div className="row">
                                <div className="col-4">
                                    <p>Price</p>
                                </div>
                                <div className="col-8">
                                    <p>{user.price}</p>
                                </div>
                            </div>

                            <Button varaint="outline">Update</Button>
                            <Button
                                varaint="outline"
                                color="secondary"
                                onClick={(e) => deleteUser(user._id)}
                            >
                                Delete
                            </Button>
                        </AccordionDetails>
                    </Accordion>
                );
            } else {
                return;
            }
        });
    };

    return <div style={{ marginTop: "5rem" }}>{displayUsers()}</div>;
}

export default ManageUser;