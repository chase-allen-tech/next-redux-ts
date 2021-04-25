import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React from 'react';
import Link from 'next/link';
import { BookOutlined, BusinessCenter, BusinessCenterOutlined, Dashboard, DashboardOutlined, Group, GroupOutlined, InsertDriveFile, InsertDriveFileOutlined } from '@material-ui/icons';

const Sidebar = (props) => {
    return (
        <List component="nav" aria-labelledby="nested-lsit-subheader" className="h-100 sidebar-layout">
            <Link href="/">
                <ListItem button>
                    <ListItemIcon><DashboardOutlined className="sidebar-icon sidebar-icon-channel" /></ListItemIcon>
                    <ListItemText primary="Channel" />
                </ListItem>
            </Link>
            <Link href="/entity">
                <ListItem button>
                    <ListItemIcon><BusinessCenterOutlined className="sidebar-icon sidebar-icon-entity" /></ListItemIcon>
                    <ListItemText primary="Entites" />
                </ListItem>
            </Link>

            <Link href="/contact">
                <ListItem button>
                    <ListItemIcon><BookOutlined className="sidebar-icon sidebar-icon-contact" /></ListItemIcon>
                    <ListItemText primary="Contracts" />
                </ListItem>
            </Link>
            <Link href="/group">
                <ListItem button>
                    <ListItemIcon><GroupOutlined className="sidebar-icon sidebar-icon-group" /></ListItemIcon>
                    <ListItemText primary="Groupes" />
                </ListItem>
            </Link>
            <CardHeader className="sidebar-avatar w-100"
                avatar={
                    <Avatar aria-label="recipe">
                        J
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <KeyboardArrowUpIcon />
                    </IconButton>
                }
                title="Bienveue,"
                subheader="John Doe"
            />
        </List>
    );
};

export default Sidebar;
