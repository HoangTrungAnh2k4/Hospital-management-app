import React, { useState, useEffect, useMemo } from 'react'
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio, Grid, } from '@material-ui/core';
import { InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { Button as MuiButton, makeStyles } from "@material-ui/core";
import { TextField } from '@material-ui/core';
import DateFnsUtils from "@date-io/date-fns";
import { query, getDocs, setDoc, collection, addDoc, doc, where, QuerySnapshot } from 'firebase/firestore';
import { database } from 'src/firebase'


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5),
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        },
        '& .MuiInputBase-root': {
            fontSize: '1.3rem', 
        },
        '& .MuiFormLabel-root': {
            fontSize: '1.3rem',
        },
    },
    label: {
        textTransform: 'none'
    },
    input: {
        fontSize: "1.3rem",
    }
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
    const classes = useStyles();

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
                className={classes.root}
            />
        </MuiPickersUtilsProvider>
    )
}

function Input(props) {
    const { name, label, value,error=null, onChange, ...other } = props;
    const classes = useStyles();

    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            InputProps={{ classes: { input: classes.input } }}
            InputLabelProps={{ style: { fontSize: '1.3rem' } }}
            {...other}
            {...(error && {error:true,helperText:error})}
            
        />
    )
}

function RadioGroup(props) {
    const { name, label, value, onChange, items } = props;

    return (
        <FormControl>
            <FormLabel style={{ fontSize: '1.3rem' }}>{label}</FormLabel>
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
            <InputLabel  style={{ fontSize: '1.3rem' }}>{label}</InputLabel>
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

export function useForm(initialFValues, validateOnChange = false, validate, setDoctorOptions) {
    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        if (name === 'Department') {
            setValues({
                ...values,
                [name]: value,
                Doctor: '', 
            });

            const doctorsRef = collection(database, 'Doctors');
            const q = query(doctorsRef, where('faculty', '==', value));
            const querySnapshot = await getDocs(q);

            const doctorOptions = querySnapshot.docs.map(doc => ({
                id: doc.data().id ,
                title: `${doc.data().fullName} - ${doc.data().id}`
            }));

            setDoctorOptions(doctorOptions);
        } else {
            setValues({
                ...values,
                [name]: value
            });
        }

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
    { id: 'Nam', title: 'Nam' },
    { id: 'Nữ', title: 'Nữ' },
    { id: 'Khác', title: 'Khác' },
]

const getDepartment = () => ([
    { id: 'Khoa ngoại', title: 'Khoa ngoại' },
    { id: 'Khoa nội', title: 'Khoa nội' },
    { id: 'Khoa sản', title: 'Khoa sản' },
    { id: 'Khoa nhi', title: 'Khoa nhi' },
    { id: 'Khoa truyền nhiễm', title: 'Khoa truyền nhiễm' },
])

const getStatus = () => ([
    { id: 'Bệnh nhân mới', title: 'Bệnh nhân mới' },
    { id: 'Đang điều trị', title: 'Đang điều trị' },
    { id: 'Đã phục hồi', title: 'Đã phục hồi' },
])

export default function AddForm({ setOpenPopup, setNotify, getPatient}) {
    const initialFValues = useMemo(() => ({
        ID: 0,
        Name: '',
        Doctor: '',
        PhoneNumber: '',
        CCCD: '',
        Address: '',
        City: '',
        Gender: 'Nam',
        Department: '',
        Status: '',
        Birthday: new Date(),
        RegistrationDate: new Date(),
    }), []);

    const [doctorOptions, setDoctorOptions] = useState([]);
    useEffect(() => {
        const fetchInitialValues = async () => {
            try {
                const q = query(collection(database, 'Patients'));
                const querySnapshot = await getDocs(q);
                let highestId = 0;
                querySnapshot.forEach(doc => {
                    const docData = doc.data();
                    const docId = docData.ID;
                    if (docId > highestId) {
                        highestId = docId;
                    }
                });
                initialFValues.ID = highestId + 1;
            } catch (error) {
                console.error("Error fetching initial values: ", error);
            }
        };
        fetchInitialValues();
    }, []);
   
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Name' in fieldValues)
            temp.Name = fieldValues.Name ? "" : "Không được bỏ trống."
        if ('Doctor' in fieldValues)
            temp.Doctor = fieldValues.Doctor ? "" : "Không được bỏ trống."
        if ('PhoneNumber' in fieldValues)
            temp.PhoneNumber = fieldValues.PhoneNumber.length > 9 ? "" : "Yêu cầu tối thiểu 10 số."
        if ('CCCD' in fieldValues)
            temp.CCCD = fieldValues.CCCD.length === 12 ? "" : "Yêu cầu 12 số."
        if ('Department' in fieldValues)
            temp.Department = fieldValues.Department.length !== 0 ? "" : "Không được bỏ trống."
        if ('statusId' in fieldValues)
            temp.Status = fieldValues.Status.length !== 0 ? "" : "Không được bỏ trống."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate, setDoctorOptions);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate()) {
            try {

                const newData = {
                    ...values,
                    Doctor: values.Doctor.doctorName,
                    DoctorID: values.Doctor.doctorId,
                };
    
                const docRef = await addDoc(collection(database, "Patients"), newData);

                const amountData = {
                    "TotalPayment": {total: 0},
                    "AppointmentCount": {Past: 0 , Upcoming: 0},
                };

                for (const [name, data] of Object.entries(amountData)) {
                    await setDoc(doc(database, "Patients", docRef.id, "Amount", name), data);
                }

                getPatient();
                resetForm();
                setOpenPopup(false);

            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
        setNotify({
            isOpen: true,
            message: 'Nhập thành công',
            type: 'success'
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Input
                        label="Tên đầy đủ"
                        name="Name"
                        value={values.Name}
                        onChange={handleInputChange}
                        error={errors.Name}
                    />
                    <DatePicker
                        name="Birthday"
                        label="Ngày sinh"
                        value={values.Birthday}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="CCCD"
                        name="CCCD"
                        value={values.CCCD}
                        onChange={handleInputChange}
                        error={errors.CCCD}
                    />
                    <Input
                        label="Số điện thoại"
                        name="PhoneNumber"
                        value={values.PhoneNumber}
                        onChange={handleInputChange}
                        error={errors.PhoneNumber}
                    />
                    <Input
                        label="Thành phố"
                        name="City"
                        value={values.City}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Địa chỉ"
                        name="Address"
                        value={values.Address}
                        onChange={handleInputChange}
                    />

                </Grid>
                <Grid item xs={6}>
                    <RadioGroup
                        name="Gender"
                        label="Giới tính"
                        value={values.Gender}
                        onChange={handleInputChange}
                        items={GenderItems}
                    />
                    {<Select
                        name="Department"
                        label="Khoa"
                        value={values.Department}
                        onChange={handleInputChange}
                        options={getDepartment()}
                        error={errors.Department}
                    />}
                    {<Select
                        name="Doctor"
                        label="Tên bác sĩ"
                        value={values.Doctor}
                        onChange={handleInputChange}
                        options={doctorOptions}
                        error={errors.Doctor}
                    />}
                    {<Select
                        name="Status"
                        label="Trạng thái"
                        value={values.Status}
                        onChange={handleInputChange}
                        options={getStatus()}
                        error={errors.Status}
                    />}
                    <DatePicker
                        name="RegistrationDate"
                        label="Ngày đăng kí"
                        value={values.RegistrationDate}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Button
                            type="submit"
                            text="Gửi" 
                        />
                        <Button
                            text="Đăt lại"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}