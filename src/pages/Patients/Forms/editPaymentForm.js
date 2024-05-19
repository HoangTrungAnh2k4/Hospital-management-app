import React, { useState, useEffect } from 'react';
import {  Grid } from '@material-ui/core';
import { Button as MuiButton, makeStyles } from "@material-ui/core";
import { TextField } from '@material-ui/core';
import { doc, deleteDoc, addDoc, getDoc, updateDoc, collection } from 'firebase/firestore';
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
        fontSize: "1.3rem",
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
            InputLabelProps={{ style: { fontSize: '1.3rem' } }}
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

export default function EditForm({
    subcollectionPayment,
    patient,
    setOpenPopup,
    setNotify,
    getSubcollections
}) {

    const [dynamicInputs, setDynamicInputs] = useState([]);
    const [existingDocs, setExistingDocs] = useState([]);

    useEffect(() => {
        if (subcollectionPayment && subcollectionPayment.length > 0) {
            const paymentArray = subcollectionPayment.map(item => ({
                Transaction: item.Transaction,
                Price: item.Price
            }));
            const paymentIdArray = subcollectionPayment.map(item => item.id);
            setDynamicInputs(paymentArray);
            setExistingDocs(paymentIdArray);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const PaymentRef = collection(database, "Patients", patient.id, "Payment");

                for (let index = 0; index < existingDocs.length; index++) {
                    const docRef = doc(PaymentRef, existingDocs[index]);
                    await deleteDoc(docRef);
                }

                // Update the total payment with the new total
                // Add new payment documents
                let newTotalPayment = 0;
                for (let index = 0; index < dynamicInputs.length; index++) {
                    const data = { Transaction: dynamicInputs[index].Transaction, Price: Number(dynamicInputs[index].Price) };
                    try {
                        await addDoc(PaymentRef, data);
                        newTotalPayment += data.Price;
                    } catch (error) {
                        console.error("Error adding document: ", error);
                    }
                }

                // Retrieve the current total payment
                const totalPaymentDocRef = doc(database, "Patients", patient.id, "Amount", "TotalPayment");
                const totalPaymentDoc = await getDoc(totalPaymentDocRef);
                let currentTotalPayment = 0;
                if (totalPaymentDoc.exists()) {
                    currentTotalPayment = Number(totalPaymentDoc.data().total);
                }

                const updatedTotalPayment = currentTotalPayment + newTotalPayment;
                await updateDoc(totalPaymentDocRef, { total: updatedTotalPayment });


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

    const handleAddInput = () => {
        setDynamicInputs(prevInputs => [
            ...prevInputs,
            { description: "", Transaction: "", Price: "" }
        ]);
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
                        <Grid item xs={4}>
                            <Input
                                label="Tên Khoản Thu"
                                value={input.Transaction}
                                onChange={(e) => {
                                    const newInputs = [...dynamicInputs];
                                    newInputs[index] = { ...newInputs[index], Transaction: e.target.value };
                                    setDynamicInputs(newInputs);
                                }}
                                error={errors.Describe}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Input
                                label="Giá Tiền"
                                value={input.Price}
                                onChange={(e) => {
                                    const newInputs = [...dynamicInputs];
                                    newInputs[index] = { ...newInputs[index], Price: e.target.value };
                                    setDynamicInputs(newInputs);
                                }}
                                error={errors.Describe}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                text="Xóa"
                                color="secondary"
                                onClick={() => handleRemoveInput(index)}
                            />
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