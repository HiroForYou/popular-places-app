import React from 'react';
import './PlacesList.scss';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Place } from '../../pages/Home/Home';

interface PlacesListProps {
    places: Array<Place>;
}

const PlaceList: React.FC<PlacesListProps> = (props) => {

    return (
        <div className="places-list">
            <Typography variant="h5" className="list-title">
                List of popular places
            </Typography>
            <GridList className="grid-list" cols={2.5}>
                {props.places.map((place) => (
                    <GridListTile key={place.id}>
                        <img src={place.imgUrl} alt={place.title} />
                        <GridListTileBar
                            title={place.title}
                            subtitle={place.description}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
};

export default PlaceList;
