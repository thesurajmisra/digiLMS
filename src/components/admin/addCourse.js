import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import update from 'immutability-helper';

import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Card, CardContent, Chip, FormControl, InputBase, InputLabel, makeStyles, MenuItem, Paper, Select, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import React from 'react';

import { Ballot } from '@material-ui/icons';
import { CourseContext } from '../../providers/courseContext';
import { Autocomplete } from '@material-ui/lab';
import { Formik } from 'formik';

const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: '100%',
    },
    tabPanel: {
        padding: '2rem'
    },
    input: {
        width: '100%'
    },
    formControl: {
        width: '100%'
    }
}));

const AddCourse = () => {

    const prerequisites = ['HTML', 'CSS', 'JavaScript Basics', 'Python Basics', 'Flexbox'];
    const courseService = React.useContext(CourseContext);
    let tempForm = {};

    const classes = styles();
    const [value, setValue] = React.useState(0);
    const [curriculum, setCurriculum] = React.useState({
        sections: [
            {
                name: "Introduction",
                description: "Section 1 Description",
                lectures: [
                    {
                        name: "Lecture 1",
                        description: "",
                        content: "",
                        resources: []

                    }
                ]
            }
        ]
    });
    const [dataReady, setDataReady] = React.useState(false);

    const courseForm = {
        title: "",
        description: "",
        category: "",
        prerequisites: [],
        avatar: "",
        target: "",
        data: {},
        reviews: Array
    }

    const onFormSubmit = (formdata) => {
        console.log('click on button to submit form');
        tempForm = formdata;
        console.log(tempForm);
    }

    const courseSubmit = () => {
        tempForm['data'] = curriculum;
        console.log(tempForm);
    }

    const addNewSection = () => {
        const newSection = {
            name: "Untitled Section",
            description: "Section Description",
            lectures: [
                {
                    name: "Lecture 1",
                    description: "Lecture 1 Description",
                    content: "",
                    resources: []

                }
            ]
        }

        const newData = update(curriculum, {
            sections: {
                $push: [newSection]
            }
        });

        // console.log(newData);

        setCurriculum(newData);

    }

    const addNewLecture = (sect_index) => {
        const newLecture = {
            name: "Untitled Lecture",
            description: "Lecture Description",
            content: "",
            resources: []
        }

        const sections = {};
        sections[sect_index] = { lectures: { $push: [newLecture] } };

        const newData = update(curriculum, {
            sections: sections
        });

        setCurriculum(newData);
        // console.log(newData);
    }


    const handleRename = (prop, val, sect_i, lect_i) => {

        const sections = {}
        const lectures = {}
        if (prop == 'lect_name') {
            lectures[lect_i] = { name: { $set: val } };
            sections[sect_i] = { lectures: lectures };
        }
        else if (prop == 'lect_desc') {
            lectures[lect_i] = { description: { $set: val } };
            sections[sect_i] = { lectures: lectures };
        }
        else if (prop == 'sect_name') {
            sections[sect_i] = { name: { $set: val } };
        }
        else if (prop == 'sect_desc') {
            sections[sect_i] = { description: { $set: val } };
        }

        const newData = update(curriculum, {
            sections: sections
        });
        setCurriculum(newData);
    }

    const handleFileUpload = (prop, file, sect_i, lect_i) => {

        const formData = new FormData()
        formData.append('file', file)

        courseService.uploadFile(formData)
            .then(res => console.log(res));

        console.log(prop);

    }


    const addCourse = () => {
        console.log(curriculum);
        courseService.addCourse()
    }

    React.useEffect(() => {
        console.log(curriculum);
        setDataReady(true);
        console.log(dataReady);
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const renderCourse = () => {
        return (
            <div>
                {
                    curriculum.sections.map((section, sect_i) =>
                    (
                        <div style={{ padding: '2rem', border: '1px solid gray', background: 'grey', marginTop: '1rem' }} key={sect_i}>
                            <h3>Section {`${sect_i + 1}: `}<InputBase value={section.name} onChange={e => handleRename('sect_name', e.target.value, sect_i, 0)}></InputBase></h3>
                            <InputBase value={section.description} onChange={e => handleRename('sect_desc', e.target.value, sect_i, 0)}></InputBase>
                            {
                                section.lectures.map((lecture, lect_i) =>
                                (
                                    <Accordion key={lect_i}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <h4>Lecture {`${lect_i + 1}: `}<InputBase value={lecture.name} onChange={e => handleRename('lect_name', e.target.value, sect_i, lect_i)}></InputBase></h4>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <InputBase value={lecture.description} onChange={e => handleRename('lect_desc', e.target.value, sect_i, lect_i)}></InputBase>
                                            <label>Lecture Content</label>
                                            <input type="file" onChange={e => handleFileUpload('content', e.target.files[0], sect_i, lect_i)} />
                                        </AccordionDetails>

                                        <AccordionActions>

                                        </AccordionActions>
                                    </Accordion>

                                )
                                )
                            }
                            <Button onClick={e => addNewLecture(sect_i)}>Add New Lecture</Button>
                        </div>
                    ))
                }
                <Button onClick={addNewSection}>Add New Section</Button>

                <Button className="w-100 mt-5">Create Course</Button>

            </div>
        )
    }

    return (
        <div className="col-md-8 mx-auto mt-5">
            <Paper square className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="icon label tabs example"
                >
                    <Tab icon={<AssignmentIcon />} label="Course Details" />
                    <Tab icon={<Ballot />} label="Curriculum" />
                    <Tab icon={<PersonPinIcon />} label="Additional" />
                </Tabs>
            </Paper>

            <TabPanel value={value} index={0}>
                <h3>Course Title</h3>

                <Formik
                    initialValues={courseForm}
                    onSubmit={onFormSubmit}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit}>


                            <InputBase id="title" value={values.title} onChange={handleChange} className={classes.input} placeholder={'Placeholder'} />

                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel>Course Category</InputLabel>
                                <Select id="category" value={values.category} onChange={handleChange}
                                    value={20}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'web dev'}>Web Development</MenuItem>
                                    <MenuItem value={'data analytics'}>Data Analytics</MenuItem>
                                    <MenuItem value={'data science'}>Data Science</MenuItem>
                                </Select>
                            </FormControl>

                            <Autocomplete className="mt-5"
                                multiple
                                id="prerequisites"
                                options={prerequisites.map((topic) => topic)}
                                freeSolo
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField id="prerequisites" value={values.prerequisites} onChange={handleChange} {...params} variant="filled" label="Select Prerequisites for this course" placeholder="HTML, CSS etc." />
                                )}
                            />

                            <h3 className="mt-5">What will Students Learn?</h3>
                            <InputBase id="description" value={values.description} onChange={handleChange} className={classes.input} placeholder={'Full Stack Development'} />

                            <h3 className="mt-5">Target Students</h3>
                            <InputBase id="target" value={values.target} onChange={handleChange} className={classes.input} placeholder={'BCA, B.Tech etc.'} />

                        </form>
                    )}
                </Formik>
            </TabPanel>

            <TabPanel value={value} index={1}>{renderCourse()}</TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>

        </div>
    );
}

function TabPanel(props) {

    const classes = styles();
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Paper square className={classes.tabPanel}>
                    {children}
                </Paper>
            )}
        </div>
    );
}

export default AddCourse;