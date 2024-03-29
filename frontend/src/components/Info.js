import React, { useState } from "react";
import "../extras/style.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/auth/authAction";
import { storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";

//Custom Style
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

//Custom Style
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

//Custom Style
const customStylePreview = {
  height: 300,
  width: 400,
};

const Info = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["user"]);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  // console.log(cookies.UserId);
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    name: "",
    age: "",
    gender_identity: "",
    sport_interest: "",
    about: "",
    matches: [],
    img: null,
  });
  // console.log(formData.user_id);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { img, user_id } = formData; //destructuring form data
      if (!img) {
        setError("No image selected.");
        return;
      }

      const photo_id = user_id; // or cookies.UserId or formData.user_id
      const uploadTask = storage.ref(`ProfilePic/${photo_id}`).put(img);
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          // progress handling if needed
          console.log("Error", error);
        },

        async () => {
          try {
            const url = await storage
              .ref("ProfilePic")
              .child(photo_id)
              .getDownloadURL();
            // console.log("Image uploaded and URL stored:", url);

            //update formData.img with the url that was made
            formData.img = url;
            // console.log(formData.img);

            dispatch(updateUser({ formData }));
          } catch (error) {
            console.error("Error retrieving image URL:", error);
          }
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
    navigate("/home");
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "img") {
      setFormData({
        ...formData,
        [name]: files[0],
        url: URL.createObjectURL(files[0]),
      });
      setError(null);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className="details pt-4">
      <h1 className="text-3xl font-bold flex justify-center">Enter Details</h1>
      <form onSubmit={handleSubmit} className="">
        <div className="flex justify-center md:flex-row flex-col">
          <section className="flex flex-col p-5 md:w-1/3 ">
            <TextField
              id="name"
              name="name"
              value={formData.name}
              InputLabelProps={{ required: false }}
              required
              type="text"
              label="Name"
              variant="outlined"
              onChange={handleChange}
            />

            <div className="flex flex-row pt-5">
              <TextField
                id="age"
                name="age"
                InputLabelProps={{ required: false }}
                required
                type="number"
                label="Age"
                value={formData.age}
                variant="outlined"
                onChange={handleChange}
                InputProps={{
                  inputProps: { min: 1 },
                }}
              />
            </div>
            <label className="mt-3 mx-0 ">Gender</label>
            <div className="flex flex-row">
              <input
                id="man-gender"
                type="radio"
                name="gender_identity"
                value="man"
                onChange={handleChange}
                checked={formData.gender_identity === "man"}
                className="py-2 px-8 my-3 text-sm border-2 border-slate-500 rounded-md mr-3 hidden"
              ></input>
              <label
                htmlFor="man-gender"
                className="p-2 border border-slate-500 rounded-md transition duration-300 mr-3 mt-3 mx-0  cursor-pointer"
              >
                Man
              </label>
              <input
                id="woman-gender"
                type="radio"
                name="gender_identity"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_identity === "woman"}
                className="py-2 px-8 my-3 text-sm border-2 border-slate-500 rounded-md mr-3 hidden"
              ></input>
              <label
                htmlFor="woman-gender"
                className="p-2 border border-slate-500 rounded-md transition duration-300 mr-3 mt-3 mx-0  cursor-pointer"
              >
                Woman
              </label>
              <input
                id="more-gender"
                type="radio"
                name="gender_identity"
                value="more"
                onChange={handleChange}
                checked={formData.gender_identity === "more"}
                className="py-2 px-8 my-3 text-sm border-2 border-slate-500 rounded-md mr-3 hidden"
              ></input>
              <label
                htmlFor="more-gender"
                className="p-2 border border-slate-500 rounded-md transition duration-300 mr-3 mt-3 mx-0  cursor-pointer"
              >
                More
              </label>
            </div>

            <label className="mt-3 mx-0 ">Activities interested in</label>
            <div className="flex flex-row ">
              <input
                id="cycling-interest"
                type="radio"
                name="sport_interest"
                value="cycling"
                onChange={handleChange}
                checked={formData.sport_interest === "cycling"}
                className="py-2 px-8 my-3 text-sm border-2 border-slate-500 rounded-md mr-3 hidden"
              ></input>
              <label
                htmlFor="cycling-interest"
                className="p-2 border border-slate-500 rounded-md transition duration-300 mr-3 mt-3 mx-0  cursor-pointer"
              >
                Cycling
              </label>
              <input
                id="gym-interest"
                type="radio"
                name="sport_interest"
                value="gym"
                onChange={handleChange}
                checked={formData.sport_interest === "gym"}
                className="py-2 px-8 my-3 text-sm border-2 border-slate-500 rounded-md mr-3 hidden"
              ></input>
              <label
                htmlFor="gym-interest"
                className="p-2 border border-slate-500 rounded-md transition duration-300 mr-3 mt-3 mx-0  cursor-pointer"
              >
                Gym
              </label>
              <input
                id="running-interest"
                type="radio"
                name="sport_interest"
                value="running"
                onChange={handleChange}
                checked={formData.sport_interest === "running"}
                className="py-2 px-8 my-3 text-sm border-2 border-slate-500 rounded-md mr-3 hidden"
              ></input>
              <label
                htmlFor="running-interest"
                className="p-2 border border-slate-500 rounded-md transition duration-300 mr-3 mt-3 mx-0  cursor-pointer"
              >
                Running
              </label>
              <input
                id="all-sports-interest"
                type="radio"
                name="sport_interest"
                value="allsports"
                onChange={handleChange}
                checked={formData.sport_interest === "allsports"}
                className="py-2 px-8 my-3 text-sm border-2 border-slate-500 rounded-md mr-3 hidden"
              ></input>
              <label
                htmlFor="all-sports-interest"
                className="p-2 border border-slate-500 rounded-md transition duration-300 mr-3 mt-3 mx-0  cursor-pointer"
              >
                All
              </label>
            </div>

            <div className="py-5">
              <TextField
                id="about"
                name="about"
                InputLabelProps={{ required: false }}
                required
                type="text"
                label="A short info about yourself"
                variant="outlined"
                value={formData.about}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </section>
          <section className="flex flex-col p-5 md:w-1/3 ">
            <div className="justify-center flex">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                onChange={handleChange}
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                className="w-2/3"
                required
              >
                <span className="capitalize">Upload Profile Picture</span>
                <VisuallyHiddenInput
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                />
              </Button>
            </div>
            <div className="flex justify-center pb-10">
              <div className="relative mt-2">
                {error && (
                  <Alert
                    severity="error"
                    variant="filled"
                    className="top-0 left-0 right-0 justify-center"
                  >
                    <p className=" font-bold">{error}</p>
                  </Alert>
                )}
              </div>
              {formData.url && (
                <BootstrapTooltip
                  title="Your Profile Picture Preview"
                  placement="bottom"
                >
                  <img
                    src={formData.url}
                    alt="Profile Pic"
                    className="rounded-md mt-5"
                    style={customStylePreview}
                  ></img>
                </BootstrapTooltip>
              )}
            </div>
          </section>
        </div>
        <div className="flex justify-center pb-10">
          <button className="hover:bg-sky-600 hover:text-white rounded-md  border border-black text-xl p-2 bg-slate-400 text-white w-48">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Info;
