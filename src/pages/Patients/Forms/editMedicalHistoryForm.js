import React, { useState, useEffect } from 'react';
import {  Grid } from '@material-ui/core';
import { Button as MuiButton, makeStyles } from "@material-ui/core";
import { TextField } from '@material-ui/core';
import { doc, deleteDoc, addDoc, collection } from 'firebase/firestore';
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
    input: {
        fontSize: "14px",
        width: "300px", 
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
            {...other}
            {...(error && {error:true,helperText:error})}
            
        />
    )
}

export function useForm(initialFValues, validateOnChange = false, validate) {
    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
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

export default function EditMedicalHistory({
    subcollectionMedicalHistory,
    patient,
    setOpenPopup,
    setNotify,
    getSubcollections
}) {

    const [dynamicInputs, setDynamicInputs] = useState([]);
    const [existingDocs, setExistingDocs] = useState([]);

    useEffect(() => {
        if (subcollectionMedicalHistory && subcollectionMedicalHistory.length > 0) {
            const medicalDataArray = subcollectionMedicalHistory.map(item => item.Describe);
            const medicalIdArray = subcollectionMedicalHistory.map(item => item.id);
            setDynamicInputs(medicalDataArray);
            setExistingDocs(medicalIdArray);
        } else {
            setDynamicInputs([]);
            setExistingDocs([]);
        }
    }, []);
    
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('Describe' in fieldValues) {
            temp.Describe = fieldValues.Describe ? "" : "Không được bỏ trống.";
        }
        setErrors({ ...temp });

        return Object.values(temp).every(x => x === "");
    };

    const {
        errors,
        values,
        setErrors,
        resetForm
    } = useForm(dynamicInputs, true, validate);

    const handleAddInput = () => {
        setDynamicInputs(prevInputs => [...prevInputs, ""]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const medicalHistoryRef = collection(database, "Patients", patient.id, "MedicalHistory");

                for (let index = 0; index < existingDocs.length; index++) {
                    const docRef = doc(medicalHistoryRef, existingDocs[index]);
                    await deleteDoc(docRef);
                }

                for (let index = 0; index < dynamicInputs.length; index++) {
                    const data = { Describe: dynamicInputs[index] };
                    try {
                        await addDoc(medicalHistoryRef, data);
                    } catch (error) {
                        console.error("Error adding document: ", error);
                    }
                }

                setNotify({
                    isOpen: true,
                    message: 'Cập nhật thành công',
                    type: 'success'
                });
                
                getSubcollections();
                setOpenPopup(false);
                resetForm();
            } catch (error) {
                console.error('Error updating medical history:', error);
                setNotify({
                    isOpen: true,
                    message: 'Đã xảy ra lỗi khi cập nhật dữ liệu',
                    type: 'error'
                });
            }
        }
    };

    const handleRemoveInput = (indexToRemove) => {
        setDynamicInputs(prevInputs => prevInputs.filter((_, index) => index !== indexToRemove));
    };
    
    return (
        <>
        <Form onSubmit={handleSubmit}>
            {dynamicInputs.map((input, index) => {
                return(
                    <Grid container key={index}>
                        <Grid item xs={12}>
                            <Input
                                label="Miêu tả"
                                value={input}
                                onChange={(e) => {
                                    const newInputs = [...dynamicInputs];
                                    newInputs[index] = e.target.value;
                                    setDynamicInputs(newInputs);
                                }}
                                error={errors.Describe}
                            />
                            <div>
                                <Button
                                    text="Xóa"
                                    color="secondary"
                                    onClick={() => handleRemoveInput(index)}
                                />
                            </div>
                        </Grid>
                    </Grid> 
                )
            })}
             <div>
                <Button
                    type="submit"
                    text="Gửi"
                />
                <Button
                    type="button"
                    text="Thêm Ô Input"
                    onClick={handleAddInput}
                />
            </div>
           
        </Form>
        </>
        
    );
}