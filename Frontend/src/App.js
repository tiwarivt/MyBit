import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import { AdminLoginForm } from "./components/admin/AdminLoginForm";
import { AdminDonationAssign } from "./components/admin/AdminDonationAssign";
import { AdminDonationAlreadyAssign } from "./components/admin/AdminDonationAlreadyAssign";
import { AdminRecipientVerification } from "./components/admin/AdminRecipientVerification";
import { AdminRecipientDetails } from "./components/admin/AdminRecipientDetails";

import { VolunteerDonationDetails } from "./components/volunteer/VolunteerDonationDetails";
import { VolunteerRegistrationForm } from "./components/volunteer/VolunteerRegistrationForm";
// import { VolunteerLoginForm } from "./components/volunteer/VolunteerLoginForm";
import { VolunteerHome } from "./components/volunteer/VolunteerHome";
import { VolunteerProfile } from "./components/volunteer/VolunteerProfile";
import { VolunteerEditProfile } from "./components/volunteer/VolunteerEditProfile";
import { VolunteerDonationToBeCollected } from "./components/volunteer/VolunteerDonationToBeCollected";
import { VolunteerDonationIsCollected } from "./components/volunteer/VolunteerDonationIsCollected";

import { DonationLandingPage } from "./components/donor/DonationLandingPage";

import { DonorDonationDetails } from "./components/donor/DonorDonationDetails";
import { DonorRegistrationForm } from "./components/donor/DonorRegistrationForm";
// import { DonorLoginForm } from "./components/donor/DonorLoginForm";
import { DonorHome } from "./components/donor/DonorHome";
import { DonorProfile } from "./components/donor/DonorProfile";
import { DonorEditProfile } from "./components/donor/DonorEditProfile";

import { RecipientRegistrationForm } from "./components/recipient/RecipientRegistrationForm";
import { RecipientHome } from "./components/recipient/RecipientHome";
import { RecipientProfile } from "./components/recipient/RecipientProfile";
import { RecipientRequestLandingPage } from "./components/recipient/RecipientRequestLandingPage";
import { RecipientRequestDetails } from "./components/recipient/RecipientRequestDetails";
import { RecipientEditProfile } from "./components/recipient/RecipientEditProfile";
//import { RecipientLoginForm } from "./components/recipient/RecipientLoginForm";
import { ForgotPassword } from "./components/ForgotPassword";
import { UserLoginForm } from "./components/UserLoginForm";

import { MainHome } from "./components/MainHome";
import { Contact } from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainHome></MainHome>}></Route>
          <Route
            path="/login"
            element={<UserLoginForm></UserLoginForm>}
          ></Route>
          <Route
            path="/forgotPassword"
            element={<ForgotPassword></ForgotPassword>}
          ></Route>
          {/* donor paths below */}
          <Route
            path="/donorRegistrationForm"
            element={<DonorRegistrationForm></DonorRegistrationForm>}
          ></Route>
          {/* <Route path='/donorlogin' element={<DonorLoginForm></DonorLoginForm>}></Route> */}
          <Route path="/donorHome" element={<DonorHome></DonorHome>}></Route>
          <Route
            path="/donorProfile"
            element={<DonorProfile></DonorProfile>}
          ></Route>
          <Route
            path="/donorEditProfile"
            element={<DonorEditProfile></DonorEditProfile>}
          ></Route>
          <Route
            path="/donationForm"
            element={<DonationLandingPage></DonationLandingPage>}
          ></Route>
          <Route
            path="/donordonationdetails"
            element={<DonorDonationDetails></DonorDonationDetails>}
          ></Route>

          {/* admin paths below */}
          {/* <Route path='/adminLogin' element={<AdminLoginForm></AdminLoginForm>}></Route> */}
          <Route
            path="/adminDonationAssign"
            element={<AdminDonationAssign></AdminDonationAssign>}
          ></Route>
          <Route
            path="/adminDonationAlreadyAssign"
            element={<AdminDonationAlreadyAssign></AdminDonationAlreadyAssign>}
          ></Route>
          <Route
            path="/adminRecipientVerification"
            element={<AdminRecipientVerification></AdminRecipientVerification>}
          ></Route>
          <Route
            path="/adminRecipientsList"
            element={<AdminRecipientDetails></AdminRecipientDetails>}
          ></Route>

          {/* volunteer paths below */}
          <Route
            path="/volunteerRegistrationForm"
            element={<VolunteerRegistrationForm></VolunteerRegistrationForm>}
          ></Route>
          {/* <Route path="/volunteerLoginForm" element={<VolunteerLoginForm></VolunteerLoginForm>}></Route> */}
          <Route
            path="/volunteerHome"
            element={<VolunteerHome></VolunteerHome>}
          ></Route>
          <Route
            path="/volunteerProfile"
            element={<VolunteerProfile></VolunteerProfile>}
          ></Route>
          <Route
            path="/volunteerEditProfile"
            element={<VolunteerEditProfile></VolunteerEditProfile>}
          ></Route>
          <Route
            path="/volunteerDonationAssign"
            element={<VolunteerDonationDetails></VolunteerDonationDetails>}
          ></Route>
          <Route
            path="/volunteerDonationToBeCollected"
            element={
              <VolunteerDonationToBeCollected></VolunteerDonationToBeCollected>
            }
          ></Route>
          <Route
            path="/volunteerDonationIsCollected"
            element={
              <VolunteerDonationIsCollected></VolunteerDonationIsCollected>
            }
          ></Route>

          {/* recipient paths below */}
          <Route
            path="/recipientRegistrationForm"
            element={<RecipientRegistrationForm></RecipientRegistrationForm>}
          ></Route>
          {/* <Route path='/recipientLoginForm' element={<RecipientLoginForm></RecipientLoginForm>}></Route> */}
          <Route
            path="/recipientHome"
            element={<RecipientHome></RecipientHome>}
          ></Route>
          <Route
            path="/recipientProfile"
            element={<RecipientProfile></RecipientProfile>}
          ></Route>
          {/* <Route path='/recipientEditProfile' element={<RecipientProfile></RecipientProfile>}></Route> */}
          <Route
            path="/recipientRequestForm"
            element={
              <RecipientRequestLandingPage></RecipientRequestLandingPage>
            }
          ></Route>
          <Route
            path="/recipientViewRequestDetails"
            element={<RecipientRequestDetails></RecipientRequestDetails>}
          ></Route>
          <Route
            path="/recipientEditProfile"
            element={<RecipientEditProfile></RecipientEditProfile>}
          ></Route>

          {/* Adding colors to it */}

          <Route path="/ContactUs" element={<Contact></Contact>}></Route>
          <Route path="/AboutUs" element={<AboutUs></AboutUs>}></Route>

{/* below code jsut form testinng */}
         

        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
