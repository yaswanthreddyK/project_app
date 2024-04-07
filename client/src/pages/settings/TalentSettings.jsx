import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  Autocomplete,
  Snackbar,
  Alert,
  Grid
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import UserContext from "../../context/Usercontext.js";

const StyledprofileImageButton = styled(Button)({
  backgroundColor: "#24ae81",
  color: "white",
  "&:hover": {
    backgroundColor: "#24ae81",
  },
});

const StyledFileInput = styled("input")({
  display: "none",
});

const useStyles = makeStyles({
  root: {
    padding: "16px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  chip: {
    margin: "0.5px",
  },
});

const TalentSettings = () => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const profile = user
  const [formData, setFormData] = useState(profile);
  const [selectedTags, setSelectedTags] = useState(profile.skills);
  const [formEntries, setFormEntries] = useState(profile.workExperience);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState({
    message: "",
    severity: "",
  });
  const [projects, setProjects] = useState(profile.projects);

  const handleTagSelect = (event, value) => {
    setSelectedTags(value);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleprofileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        isUploading: true,
      }));

      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevFormData) => {
          return {
            ...prevFormData,
            profileImage: reader.result,
            isUploading: false,
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelUpload = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      profileImage: '',
      isUploading: false,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFieldInputChange = (index, event) => {
    const { name, value } = event.target;

    const newFormEntries = [...formEntries];
    newFormEntries[index] = {
      ...newFormEntries[index],
      [name]: value,
    };
    setFormEntries(newFormEntries);
  };

  const handleAddField = () => {
    setFormEntries([
      ...formEntries,
      { title: "", description: "", startDate: "", endDate: "" },
    ]);
  };

  const handleRemoveField = (index) => {
    const newFormEntries = [...formEntries];
    newFormEntries.splice(index, 1);
    setFormEntries(newFormEntries);
  };

  const handleAddProject = () => {
    setProjects([...projects, { title: "", description: "", link: "" }]);
  };

  const handleRemoveProject = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  const handleProjectInputChange = (index, event) => {
    const { name, value } = event.target;
    const correctName = name.split("project_")[1]
    const newProjects = [...projects];
    newProjects[index][correctName] = value;
    setProjects(newProjects);
  };

  function removeUnnecessaryFields(formData) {
    const length = formEntries.length;
    const projectsLength = projects.length
    for (let i = 0; i < length; i++) {
      formData.delete("title");
      formData.delete("description");
      formData.delete("startDate");
      formData.delete("endDate");
    }

    for(let i = 0; i < projectsLength; i++){
      formData.delete("project_title");
      formData.delete("project_description");
      formData.delete("project_link");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);

    formData.append("workExperience", JSON.stringify(formEntries));
    formData.append("projects", JSON.stringify(projects));
    formData.append('skills',JSON.stringify(selectedTags))
    removeUnnecessaryFields(formData);
    try {
      fetch("http://localhost:8800/api/users/editUser", {
        method: "PATCH",
        headers: {},
        body: formData,
        credentials: "include",
      })
        .then((res) => res.json())
        .then((response) => {
          setIsSubmitting(false);
          setOpenSnackbar(true);
          if (response.success) {
            setSnackbarMessage({
              message: response.message,
              severity: "success",
            });
            setUser(response.data);
          } else {
            setSnackbarMessage({
              message: response.message,
              severity: "error",
            });
          }
        });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={classes.root + " settings-container"}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Edit Profile
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <TextField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          <FormLabel>Which name best describes your job role?</FormLabel>
          <TextField

            name="jobRole"
            placeholder="Ex: Web developer"
            value={formData.jobRole}
            onChange={handleChange}
          />
          <FormControl>
            <FormLabel sx={{ marginBottom: "0.5em" }}>Profile</FormLabel>
            {formData.profileImage && (
              <div>
                <img
                  src={formData.profileImage}
                  alt="profileImage Preview"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
                <IconButton onClick={handleCancelUpload}>
                  <CancelIcon />
                </IconButton>
              </div>
            )}
            {!formData.profileImage && (
              <label
                htmlFor="profileImage-input"
                className="profileImage-upload-btn"
              >
                <StyledprofileImageButton
                  component="span"
                  disabled={formData.isUploading}
                >
                  {formData.isUploading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    <span>Upload Image</span>
                  )}
                </StyledprofileImageButton>
              </label>
            )}
            <StyledFileInput
              id="profileImage-input"
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleprofileImageChange}
              disabled={formData.isUploading}
            />
          </FormControl>
          <TextField
            label="Portfolio Website"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            multiline
            rows={3}
          />

          <TextField
            label="Location"
            name="location"
            value={formData.location}
            placeholder="City, Country"
            onChange={handleChange}
          />
          <div>
            <Autocomplete
              multiple
              id="skills"
              name="skills"
              options={[
                "HTML",
                "CSS",
                "JavaScript",
                "Python",
                "Java",
                "MongoDB",
                "React",
                "Flask",
                "Django",
                "NodeJS",
                "ExpressJS",
              ]}
              value={selectedTags}
              onChange={handleTagSelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Skills"
                />
              )}
            />
          </div>
          <div>
            <h3>Projects</h3>
            <div className="projects-entity">
              {projects.map((project, index) => (
                <div key={index}>
                  <label className="entry">Project {index + 1}</label>
               
                  <TextField
                    name="project_title"
                    label="Project Title"
                    value={project.title}
                    onChange={(event) => handleProjectInputChange(index, event)}
                    fullWidth
                    sx={{ maxWidth: "500px", margin: "0.5em 1em auto 0" }}
                  />
                  <TextField
                    name="project_link"
                    label="Project Link"
                    value={project.link}
                    onChange={(event) => handleProjectInputChange(index, event)}
                    fullWidth
                    sx={{ maxWidth: "500px", margin: "0.5em 0.5em auto 0" }}
                  />
                  <TextField
                    name="project_description"
                    label="Project Description"
                    value={project.description}
                    onChange={(event) => handleProjectInputChange(index, event)}
                    fullWidth
                    sx={{ margin: "0.5em 0" }}
                  />
                    {index > 0 && (
                    <Button onClick={() => handleRemoveProject(index)}
                    sx={{display: "block",fontSize: "0.8rem",backgroundColor: "red !important",color: "white", margin: "1em", border: "0px", "&:hover": {border: "0px"}}}
                    >
                      Remove Project
                    </Button>
                  )}
                </div>
              ))}
              <Grid container justifyContent="flex-end">
              <Button onClick={handleAddProject} sx={{color: "white"}}>Add Project</Button>
              </Grid>
            </div>
          </div>

          <div>
            <h3>Work Experience</h3>
            {formEntries.map((data, index) => (
              <div key={index} className="activity-details">
                <div>
                  <label className="entry">Entry {index + 1}</label>
                
                </div>
                <TextField
                  name="title"
                  label="Company"
                  value={data.title}
                  onChange={(e) => handleFieldInputChange(index, e)}
                  fullWidth
                />
                <TextField
                  name="description"
                  label="Description"
                  placeholder="ex: Worked as a senior analyst."
                  value={data.description}
                  onChange={(e) => handleFieldInputChange(index, e)}
                  fullWidth
                  multiline
                  rows={1}
                  
                />
                <TextField
                  name="startDate"
                  label="Start Date"
                  type="date"
                  value={data.startDate?.split('T')[0] || ""}
                  onChange={(e) => handleFieldInputChange(index, e)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ maxWidth: "200px" }}
                />
                <TextField
                  name="endDate"
                  label="End Date"
                  type="date"
                  value={data.endDate?.split('T')[0] || ""}
                  onChange={(e) => handleFieldInputChange(index, e)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ maxWidth: "200px" }}
                />
                  {index > 0 && (
                    <Button
                      onClick={() => handleRemoveField(index)}
                      variant="outlined"
                      color="secondary"
                      sx={{
                        fontSize: "0.8rem",
                        backgroundColor: "red !important",
                        color: "white",
                        margin: "1em",
                        border: "0px",
                        "&:hover": { border: "0px" },
                      }}
                    >
                      Remove Field
                    </Button>
                  )}
              </div>
            ))}
            <Grid container justifyContent={"flex-end"}>
            <Button
              onClick={handleAddField}
              variant="contained"
              color="primary"
              sx={{ margin: "1em 0" }}
              >
              Add more fields
            </Button>
              </Grid>
          </div>

          <div className={classes.buttonContainer}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#24ae81",
                "&:hover": { backgroundColor: "#24ae81" },
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackbar}
            severity={snackbarMessage.severity}
          >
            {snackbarMessage.message}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default TalentSettings;
