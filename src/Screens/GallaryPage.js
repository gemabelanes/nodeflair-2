import React from 'react';
import { DATA } from "../Data/data";

import {
    makeStyles,
    ImageList,
    ImageListItem,
    Button,
    useTheme,
    useMediaQuery,
    Box,
} from "@material-ui/core";
import PhotoModal from '../Components/PhotoModal';

const useStyles = makeStyles((theme) => ({
    root: {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
        overflow: 'hidden',
        padding : 15,

    },
    headerContainer: {
        display: "flex",
        flexDirection : "row",
        padding: 15,
        justifyContent : 'center',
        alignItems : 'center',
    },
    headerButtons : {
        margin : 5,
        backgroundColor : '#333333',
        color : 'white',
    },
    imageList : {
        width : '100%',
        height : '100%',
        transform : 'translateZ(0)',
        maxWidth : 1200,
    },
}));

function srcset(image, size, rows = 1, cols = 1) {
    return `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format 1x,
    ${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`;
  }

export default function GallaryPage() {

    const styles = useStyles();
    const theme = useTheme();

    const[selected, setSelected] = React.useState(Object.keys(DATA)[0]);
    const[showPhotoModal, setShowPhotoModal] = React.useState(false);
    const[photoModalUrl, setPhotoModalUrl] = React.useState('');
    

    const isNotSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const isNotMediumScreen = useMediaQuery(theme.breakpoints.up("md"));


    function handleChangeSelected(val) {
        setSelected(val);
    }

    function handlePhotoModal(url) {
        setPhotoModalUrl(url)
        setShowPhotoModal(true);
    }

    React.useEffect(() => {
        if(!showPhotoModal) {
            setPhotoModalUrl('');
        }
    },[showPhotoModal])


    return (
        <div className = {styles.root}>
            <div className = {styles.headerContainer}>
                {Object.keys(DATA).map((key) => (
                    <Button 
                        variant="contained" 
                        className = {styles.headerButtons}
                        onClick = {() => handleChangeSelected(key)}
                    >
                        {key}
                    </Button>
                ))}
                
            </div>
            {selected.length > 0 ? 
            <ImageList 
                variant = "masonry"
                cols={isNotMediumScreen ? 4 : isNotSmallScreen ? 3 : 2}
                gap = {12} 
                className = {styles.imageList}
            >
                {Array.from(new Set(DATA[selected])).map((item) => (
                    <ImageListItem key={item.imageUrl}>
                        <img 
                            src = {item.imageUrl}
                            onClick={() => handlePhotoModal(item.imageUrl)}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
                
            </ImageList>
            :
            null}
            <PhotoModal 
                show = {showPhotoModal} 
                handleClose = {() => setShowPhotoModal(false)} 
                url = {photoModalUrl}
            />
        </div>
        
    )
}