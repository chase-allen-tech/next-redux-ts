import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Backdrop, Button, Fab, Fade, Modal } from '@material-ui/core';



const ContactCard = (props) => {
    const { ctitle } = props;
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    ///////////////////////////// Modal /////////////////////////////
    function createData(name, calories, fat) {
        return { name, calories, fat };
    }

    const rows = [
        createData('Cupcake', 305, 3.7),
        createData('Donut', 452, 25.0),
        createData('Eclair', 262, 16.0),
        createData('Frozen yoghurt', 159, 6.0),
        createData('Gingerbread', 356, 16.0),
        createData('Honeycomb', 408, 3.2),
        createData('Ice cream sandwich', 237, 9.0),
        createData('Jelly Bean', 375, 0.0),
        createData('KitKat', 518, 26.0),
        createData('Lollipop', 392, 0.2),
        createData('Marshmallow', 318, 0),
        createData('Nougat', 360, 19.0),
        createData('Oreo', 437, 18.0),
    ].sort((a, b) => (a.calories < b.calories ? -1 : 1));
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleOpen = () => {
        console.log('ENTER');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    ////////////////////////// End Modal /////////////////////////////////
    return (
        <>
            <Card className="contact-card">
                <CardHeader className="channel-card-header"
                    action={
                        <IconButton aria-label="settings">
                            <MoreHorizIcon />
                        </IconButton>
                    }
                    title={ctitle}
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
                    <div className="d-flex">
                        <div>
                            <p className="mb-0">Mode</p>
                            <p className="font-weight-normal">Frequence: Tous</p>
                        </div>
                        <Button className="float-right fg-color-primary ml-auto" size="small">UPDATE</Button>
                    </div>
                    <div className="d-flex">
                        <div>
                            <p className="mb-0">Channel associe</p>
                        </div>
                        <Button className="float-right fg-color-primary text-case-none ml-auto" size="small" style={{ marginTop: "-3px" }} onClick={handleOpen}><b><u>+ Ajouter</u></b></Button>
                    </div>

                    <Typography variant="body2" color="textSecondary" component="div" style={{ clear: "both", }}>
                        <div className="form-inline card-body-inline">
                            <label htmlFor="">Cnditions meteo</label>
                            <a href="#" className="float-right fg-color-primary"><u>Voir</u></a>
                        </div>
                        <div className="form-inline card-body-inline mt-1">
                            <label htmlFor="">Quotidien - Auto update</label>
                            <a href="#" className="float-right fg-color-primary"><u>Voir</u></a>
                        </div>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button className="channel-card-more-btn fg-color-primary" onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more" >
                        <u>Voir tous les contrats (+1)</u>
                    </Button>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent className="channel-card-content fg-color-primary">
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                            minutes.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>

            {/* ********************************** Modal ********************************* */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="channel-modal-layout"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className="channel-modal-content overflow-y-auto overflow-y-auto">
                        <h6 className="fg-color-primary mb-4">Ajouter un channel</h6>
                        <div className="d-flex">
                            <div>
                                <p className="mb-0"><b>Channel associe</b></p>
                            </div>
                            <Button className="float-right fg-color-primary text-case-none ml-auto" size="small" style={{ marginTop: "-3px" }} onClick={handleOpen}><b><u>+ Ajouter</u></b></Button>
                        </div>
                        <div className="modal-content-scroll">


                            {rows.map((row) =>
                            (<Typography variant="body2" key={row.name} component="p" style={{ clear: "both", }} className="mb-3">
                                <div className="form-inline card-body-inline">
                                    <label htmlFor="">Cnditions meteo</label>
                                    <a href="#" className="float-right text-secondary"><u>Voir</u></a>
                                </div>
                            </Typography>)
                            )}

                        </div>
                        <Fab variant="extended" size="medium" className="bk-color-primary f-11 fab-outlined mt-3"><span className="ml-4 mr-4 fg-color-primary">Valider</span></Fab>
                    </div>
                </Fade>
            </Modal>
        </>
    );
};

export default ContactCard;
