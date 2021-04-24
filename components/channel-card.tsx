import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Backdrop, Button, Fade, Modal } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const ChannelCard = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <>
            <Card className="channel-card">
                <CardHeader className="channel-card-header"
                    action={
                        <IconButton aria-label="settings">
                            <MoreHorizIcon />
                        </IconButton>
                    }
                    title="Conditions meteo"
                    subheader="loremipsum.identification"
                />
                <CardMedia
                    image="/static/images/cards/paella.jpg"
                    title="Paella dish"
                />
                <CardContent className="channel-card-content">
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at nibh bibendum, bibendum purus eu, ultricies velit.
                    </Typography>
                </CardContent>
                <CardContent className="channel-card-content2">
                    Contrat
                    <Button className="float-right text-case-none default-color" style={{ marginTop: "-10px", }} onClick={handleOpen}><u><b>+ Ajouter</b></u></Button>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ clear: "both", }}>
                        <div className="form-inline card-body-inline">
                            <label htmlFor="">Quotidien - Auto update</label>
                            <Button className="float-right default-color" variant="contained" color="default" size="small">A JOUR</Button>
                        </div>
                        <div className="form-inline card-body-inline mt-1">
                            <label htmlFor="">Quotidien - Manual ...</label>
                            <Button className="float-right default-color" variant="contained" color="default" size="small">A JOUR</Button>
                        </div>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button className="channel-card-more-btn default-color" onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more" >
                        <u>Voir tous les contrats (+1)</u>
                    </Button>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent className="channel-card-content default-color">
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                            minutes.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Transition modal</h2>
                        <p id="transition-modal-description">react-transition-group animates me.</p>
                    </div>
                </Fade>
            </Modal>
        </>
    );
};

export default ChannelCard;
