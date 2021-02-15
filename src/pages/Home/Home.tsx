import React, { useState, useEffect } from 'react';
import './Home.scss';
import PlaceList from '../../components/PlacesList/PlaceList';
import PlaceForm from '../../components/PlaceForm/PlaceForm';

import { API, graphqlOperation} from 'aws-amplify';
import { listPlaces } from '../../graphql/queries';
import { createPlace } from '../../graphql/mutations';


export interface Place {
    id: string;
    imgUrl: string;
    title: string;
    description: string;
}

const Home: React.FC = () => {

    const [places, setPlaces] = useState<Array<Place>>([]);

    useEffect(() => {
        fetchPlaces();
    }, []);

    const fetchPlaces = async () => {
        try{
            const placesData = await API.graphql(graphqlOperation(listPlaces)) as any;
            const placesList = placesData.data.listPlaces.items as Place[];
            setPlaces(placesList);
        } catch (err) { console.log("Error fetching places: ", err) }



        // TODO: Set places in local memory, this will be replaced with our database data
        /* setPlaces([
            {
                id: '1',
                imgUrl: 'https://images.pexels.com/photos/3254729/pexels-photo-3254729.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                title: 'Madrid',
                description: 'Very sunny and beautiful city'
            },
            {
                id: '2',
                imgUrl: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                title: 'Paris',
                description: 'The City of Lights'
            },
            {
                id: '3',
                imgUrl: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                title: 'London',
                description: 'Rainy and nice place'
            },
            {
                id: '4',
                imgUrl: 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                title: 'Rome',
                description: 'Lots of history in its streets!'
            },
            {
                id: '5',
                imgUrl: 'https://images.pexels.com/photos/164336/pexels-photo-164336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                title: 'Greece',
                description: 'Perfect beach destination'
            }
        ]); */

    };

    const addPlace = async (place: Place) => {
        try {
            const placeData = await API.graphql(graphqlOperation(createPlace, {input: place})) as any;
            const addPlace = placeData.data.createPlace as Place;
            setPlaces(currentPlaces => ([...currentPlaces, addPlace]));   
        } catch (err) { console.log("Error creating place : ", err) }
    };

    return (
        <div className="home">
            <div className="places-list">
                <PlaceList places={places}/>
            </div>
            <div className="places-form">
                <PlaceForm createPlace={addPlace}/>
            </div>
        </div>
    );
};

export default Home;