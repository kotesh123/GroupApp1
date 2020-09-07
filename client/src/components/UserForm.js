import React, { useEffect, useState } from "react";
import { TextField, withStyles, Button, Select } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/user";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";
import MenuItem from "@material-ui/core/MenuItem";
const initialFieldValues = {
  group: "",
  user: "",
  color: "",
};

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  postBtn: {
    marginTop: "20px",
    width: "50%",
  },
});

const UserForm = ({ classes, ...props }) => {
  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.userList.find((x) => x._id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  const validate = () => {
    let temp = { ...errors };
    temp.group = values.group ? "" : "This field is required.";
    temp.user = values.user ? "" : "This field is required.";
    temp.color = values.user ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x == "");
  };

  var {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, props.setCurrentId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Color Manager"
            content="Submitted successfully"
            scheme={Cinnamon.Crisp.SCHEME_PURPLE}
            icon={<AssignmentTurnedIn />}
          />
        ),
      });
      resetForm();
    };
    if (validate()) {
      if (props.currentId == 0) props.createUser(values, onSuccess);
      else props.updateUser(props.currentId, values, onSuccess);
    }
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={`${classes.root} ${classes.form}`}
      onSubmit={handleSubmit}
    >
      <TextField
        name="group"
        variant="outlined"
        label="Group"
        fullWidth
        value={values.group}
        onChange={handleInputChange}
        {...(errors.title && { error: true, helperText: errors.title })}
      />
      <TextField
        name="user"
        variant="outlined"
        label="User"
        fullWidth
        value={values.user}
        onChange={handleInputChange}
        {...(errors.message && { error: true, helperText: errors.message })}
      />

      <Select
        name="color"
        variant="outlined"
        label="Color"
        fullWidth
        value={values.color}
        onChange={handleInputChange}
        {...(errors.message && { error: true, helperText: errors.message })}
      >
        <MenuItem value="Red">Red</MenuItem>
        <MenuItem value="Green">Green</MenuItem>
        <MenuItem value="Blue">Blue</MenuItem>
      </Select>

      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        className={classes.postBtn}
      >
        Submit
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  userList: state.user.list,
});

const mapActionToProps = {
  createUser: actions.create,
  updateUser: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(UserForm));
