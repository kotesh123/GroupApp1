import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/user";
import { Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {
  Grid,
  Paper,
  withStyles,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import UserForm from "./UserForm";
import ButterToast, { Cinnamon } from "butter-toast";
import { DeleteSweep } from "@material-ui/icons";

const styles = (theme) => ({
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
});

const User = ({ classes, ...props }) => {
  //const {classes, ...props} = props
  const [currentId, setCurrentId] = useState(0);
  const [color, setColor] = useState("");
  const [userList, setUserList] = useState(props.userList);
  useEffect(() => {
    props.fetchAllUser();
  }, []); //DidMount

  const onDelete = (id) => {
    const onSuccess = () => {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Color Manager"
            content="Deleted successfully"
            scheme={Cinnamon.Crisp.SCHEME_PURPLE}
            icon={<DeleteSweep />}
          />
        ),
      });
    };
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteUser(id, onSuccess);
  };

  const filterData = (color) => {
    setColor(color.target.value);
    props.filterByColor(color.target.value);
  };

  return (
    <Grid container>
      <Grid item xs={5}>
        <Paper className={classes.paper}>
          <UserForm {...{ currentId, setCurrentId }} />
        </Paper>
      </Grid>
      <Grid item xs={7}>
        <Paper className={classes.paper}>
          <Typography variant="h6">Filter By Color Name</Typography>
          <Select
            name="color"
            label="Color"
            variant="outlined"
            fullWidth
            value={color}
            onChange={(value) => filterData(value)}
          >
            <MenuItem value="Red">Red</MenuItem>
            <MenuItem value="Green">Green</MenuItem>
            <MenuItem value="Blue">Blue</MenuItem>
          </Select>
          <List>
            {props.userList.map((record, index) => {
              return (
                <Fragment key={index}>
                  <ListItem>
                    <ListItemText>
                      <Typography variant="h5">{record.group}</Typography>
                      <div>{record.user}</div>
                      <div>{record.color}</div>
                      <div className={classes.actionDiv}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.smMargin}
                          onClick={() => setCurrentId(record._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          className={classes.smMargin}
                          onClick={() => onDelete(record._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </ListItemText>
                  </ListItem>
                  <Divider component="li" />
                </Fragment>
              );
            })}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  userList: state.user.list,
});

const mapActionToProps = {
  fetchAllUser: actions.fetchAll,
  deleteUser: actions.Delete,
  filterByColor: actions.filterByColor,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(User));
