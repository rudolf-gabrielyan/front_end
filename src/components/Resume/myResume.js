import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    pdf: {
        color:"grey"
    }
}));

function InteractiveList({ user }) {
    const classes = useStyles();

    const[myRes,setMyRes] = useState({});

    useEffect(() => {
        axios.post('http://localhost:8000/api/getMyResumes',{user_id : user.data.id})
        .then( res => {
            setMyRes(res.data)
        })
    }, []);

    return (
      <div className={classes.root}>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                    <div className={classes.demo}>
                    <List>
                    {   Object.values(myRes).map( (item,index) => {
                            let href = 'http://localhost:8000/api/downloadPdf' + item.resume_path.substring(0,item.resume_path.indexOf('.pdf'))
                            return (
                                <a className={classes.pdf} href={href} download key={index}>
                                <ListItem >
                                    <ListItemIcon>
                                    <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                    primary={item.resume_path.substring(1)}
                                    />
                                </ListItem>
                                </a>
                            )
                        })
                    }
                    </List>

                    </div>
                </Grid>
            </Grid>
      </div>
    );
  }

const mapStateToProps = state => {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps)(InteractiveList);
