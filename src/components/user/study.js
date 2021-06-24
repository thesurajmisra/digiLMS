import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import app_config from "../../config";
import { CourseContext } from "../../providers/courseContext";

const Study = () => {

    const [video, setVideo] = useState("");
    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(true);
    const courseService = useContext(CourseContext);
    const url = app_config.api_url + '/';

    const { id } = useParams();

    useEffect(() => {
        courseService.getById(id)
            .then(data => {
                console.log(data);
                setCourse(data);
                setLoading(false);
            })
    }, [])

    const renderVideo = () => {
        if (video) {
            return (
                <video src={url + video} controls></video>
            )
        }
    }

    return (
        <div>
            <h1>Study Room</h1>
            <hr />

            <div className="row">
                <div className="col-md-8">
                    {renderVideo()}
                </div>
                <div className="col-md-4">

                </div>
            </div>
        </div>
    )
}

export default Study;