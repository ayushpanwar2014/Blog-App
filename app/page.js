'use client'
import BlogList from "@/Components/BlogList";
import Header from "../Components/Header";
import Footer from "@/Components/Footer";
import { cssTransition, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// ✅ Custom fade transition
const Fade = cssTransition({
  enter: "fadeIn",
  exit: "fadeOut",
  duration: [400, 300], // enter, exit
});

export default function Home() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Fade}   // ✅ custom fade transition
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body" />
      <Header />
      <BlogList />
      <Footer />
    </>
  );
}
