import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Button } from '@material-ui/core';

const ChannelCard = (props) => {
    const {channel} = props;
    const [expanded, setExpanded] = React.useState(false);

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
                    title={channel.name}
                    subheader={channel.identifier}
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
                    <Button className="float-right text-case-none fg-color-primary" style={{ marginTop: "-10px", }} ><u><b>+ Ajouter</b></u></Button>
                    <Typography variant="body2" color="textSecondary" component="div" style={{ clear: "both", }}>
                        <div className="form-inline card-body-inline">
                            <label htmlFor="" className="f-11">Quotidien - Auto update</label>
                            <Button className="float-right fg-color-primary bk-color-secondary shadow-none" variant="contained" size="small">A JOUR</Button>
                        </div>
                        <div className="form-inline card-body-inline mt-1">
                            <label htmlFor="" className="f-11">Quotidien - Manual ...</label>
                            <Button className="float-right fg-color-primary bk-color-secondary shadow-none" variant="contained" size="small">A JOUR</Button>
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
            
        </>
    );
};

export default ChannelCard;
