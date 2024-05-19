import React from "react"
import Navbar from "./components/Navbar.tsx"
import BodyContent from "./components/BodyContent.tsx"
import Footer from "rc-footer"
import { FaBars, FaTimes, FaHome, FaDiscord } from "react-icons/fa"
import { SiGoogledocs } from "react-icons/si"
import "rc-footer/assets/index.css"

export default function App() {
  return (
    <React.Fragment>
      <Navbar />
      <BodyContent />
      <Footer
        columnLayout="space-around"
        columns={[
          {
            title: "Documentation",
            icon: <SiGoogledocs color="white" size={20} />,
            items: [],
          },

          {
            title: "Discord Support",
            icon: <FaDiscord color="white" size={20} />,
          },

          {
            title: "Add to Discord",
            icon: <FaDiscord color="white" size={20} />,
          },
        ]}
        bottom="Made with ❤️ by rit3zh"
      />
    </React.Fragment>
  )
}
