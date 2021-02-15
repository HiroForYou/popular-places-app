import React, { useRef } from 'react';
import './PlaceForm.scss';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Place } from '../../pages/Home/Home';

interface PlaceFormProps {
    createPlace: (place: Place) => void;
}


const PlaceForm: React.FC<PlaceFormProps> = (props) => {
    const inputName = useRef<HTMLInputElement>(null);
    const inputDescription = useRef<HTMLInputElement>(null);
    const inputImageUrl = useRef<HTMLInputElement>(null);

    const addPlace = () => {
        const title = inputName.current?.value as string;
        const description = inputDescription.current?.value;
        const imgUrl = inputImageUrl.current?.value as string;
        if (title && description && imgUrl) {
            // TODO: Replace this log with code for saving places in our database 
            const newPlace: Place = {
                id: Math.random().toString(),
                title,
                description,
                imgUrl
            }
            console.log('New place data to save: ', title);
            props.createPlace(newPlace);
        }
    };

    return (
        <div className='place-form'>
            <Typography variant='h5' className='form-title'>
                Complete the fields to add a new place
            </Typography>
            <form className="form-fields" noValidate autoComplete="off">
                <TextField inputRef={inputName} className="input-field" label='Place name' />
                <TextField inputRef={inputDescription} className="input-field" label='Place description' />
                <TextField inputRef={inputImageUrl} className="input-field" label='Image url' />
                <Button className="submit-button" variant='contained' color='primary' onClick={addPlace}>
                    Add place
                </Button>
            </form>
        </div>
    );
};

export default PlaceForm;
