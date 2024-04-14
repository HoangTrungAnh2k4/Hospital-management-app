import React, { useState } from 'react'
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio, Grid, } from '@material-ui/core';
import { InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { Button as MuiButton, makeStyles } from "@material-ui/core";
import { TextField } from '@material-ui/core';
import DateFnsUtils from "@date-io/date-fns";
import { doc, updateDoc } from 'firebase/firestore';
import { database } from 'src/firebase'

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5),
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    },
    label: {
        textTransform: 'none'
    },
}))

function Button(props) {
    const { text, size, color, variant, onClick, ...other } = props
    const classes = useStyles();

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            classes={{ root: classes.root, label: classes.label }}>
            {text}
        </MuiButton>
    )
}

function DatePicker(props) {
    const { name, label, value, onChange } = props
    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                label={label}
                format="MM/dd/yyyy"
                name={name}
                value={value}
                onChange={date =>onChange(convertToDefEventPara(name,date))}

            />
        </MuiPickersUtilsProvider>
    )
}

function Input(props) {
    const { name, label, value,error=null, onChange, ...other } = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error})}
            
        />
    )
}

function RadioGroup(props) {
    const { name, label, value, onChange, items } = props;

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row
                name={name}
                value={value}
                onChange={onChange}>
                {
                    items.map(
                        item => (
                            <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
                        )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    )
}

function Select(props) {
    const { name, label, value,error=null, onChange, options } = props;

    return (
        <FormControl variant="outlined"
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export function useForm(initialFValues, validateOnChange = false, validate) {
    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}

function Form(props) {

    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

const GenderItems = [
    { id: 'Male', title: 'Male' },
    { id: 'Female', title: 'Female' },
    { id: 'Other', title: 'Other' },
]

const getDepartment = () => ([
    { id: 'Khoa ngoại', title: 'Khoa ngoại' },
    { id: 'Khoa nội', title: 'Khoa nội' },
    { id: 'Khoa sản', title: 'Khoa sản' },
    { id: 'Khoa nhi', title: 'Khoa nhi' },
    { id: 'Khoa truyền nhiễm', title: 'Khoa truyền nhiễm' },
])

const getStatus = () => ([
    { id: 'New patient', title: 'New patient' },
    { id: 'In treatment', title: 'In treatment' },
    { id: 'Recovered', title: 'Recovered' },
])


export default function EditForm({
    selectedPatient,
    getPatient,
    setOpenPopup,
    setNotify}) {

    const id = selectedPatient.id;
    console.log("ID: ", id); 
    
    const initialFValues = {
        ID: selectedPatient.ID,
        Name: selectedPatient.Name,
        Doctor: selectedPatient.Doctor,
        PhoneNumber: selectedPatient.PhoneNumber,
        CCCD: selectedPatient.CCCD,
        Address: selectedPatient.Address,
        City: selectedPatient.City,
        Gender: selectedPatient.Gender,
        Department: selectedPatient.Department,
        Status: selectedPatient.Status,
        Birthday: selectedPatient.Birthday.toDate(),
        RegistrationDate: selectedPatient.RegistrationDate.toDate(),
    };
   
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Name' in fieldValues)
            temp.Name = fieldValues.Name ? "" : "This field is required."
        if ('Doctor' in fieldValues)
            temp.Doctor = fieldValues.Doctor ? "" : "This field is required."
        if ('PhoneNumber' in fieldValues)
            temp.PhoneNumber = fieldValues.PhoneNumber.length > 9 ? "" : "Minimum 10 numbers required."
        if ('CCCD' in fieldValues)
            temp.CCCD = fieldValues.CCCD.length === 12 ? "" : "There is 12 numbers required."
        if ('Department' in fieldValues)
            temp.Department = fieldValues.Department.length !== 0 ? "" : "This field is required."
        if ('statusId' in fieldValues)
            temp.Status = fieldValues.Status.length !== 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        errors,
        values,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const docRef = doc(database, 'Patients', selectedPatient.id);
                await updateDoc(docRef, {
                    ...values,
                });

                getPatient();
                resetForm();
                setOpenPopup(false);
                setNotify({
                    isOpen: true,
                    message: 'Updated Successfully',
                    type: 'success'
                });
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        }
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    };
    
    

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Input
                        label="Full Name"
                        name="Name"
                        value={values.Name}
                        onChange={handleInputChange}
                        error={errors.Name}
                    />
                    <Input
                        label="Doctor Name"
                        name="Doctor"
                        value={values.Doctor}
                        onChange={handleInputChange}
                        error={errors.Doctor}
                    />
                    <Input
                        label="CCCD"
                        name="CCCD"
                        value={values.CCCD}
                        onChange={handleInputChange}
                        error={errors.CCCD}
                    />
                    <Input
                        label="PhoneNumber"
                        name="PhoneNumber"
                        value={values.PhoneNumber}
                        onChange={handleInputChange}
                        error={errors.PhoneNumber}
                    />
                    <Input
                        label="City"
                        name="City"
                        value={values.City}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Address"
                        name="Address"
                        value={values.Address}
                        onChange={handleInputChange}
                    />

                </Grid>
                <Grid item xs={6}>
                    <RadioGroup
                        name="Gender"
                        label="Gender"
                        value={values.Gender}
                        onChange={handleInputChange}
                        items={GenderItems}
                    />
                    <DatePicker
                        name="Birthday"
                        label="Birthday"
                        value={values.Birthday}
                        onChange={handleInputChange}
                    />
                    {<Select
                        name="Department"
                        label="Department"
                        value={values.Department}
                        onChange={handleInputChange}
                        options={getDepartment()}
                        error={errors.Department}
                    />}
                    {<Select
                        name="Status"
                        label="Status"
                        value={values.Status}
                        onChange={handleInputChange}
                        options={getStatus()}
                        error={errors.Status}
                    />}
                    <DatePicker
                        name="RegistrationDate"
                        label="Registration Date"
                        value={values.RegistrationDate}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Button
                            type="submit"
                            text="Submit" 
                        />
                        <Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}