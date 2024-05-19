import React, { useState } from "react"
import { FaBars, FaTimes, FaHome, FaDiscord } from "react-icons/fa"
import { SiGoogledocs } from "react-icons/si"
import "./Navbar.css"
import icon from "../assets/boticon.jpg"
import { slide as Menu } from "react-burger-menu"

const Navbar = () => {
  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)

  return (
    <div className="header">
      <div className="container">
        <div className="logo-container">
          <img src={icon} alt="bot" className="logo" />

          <div className="logo-text-container">
            <h5
              style={{
                color: "white",
              }}
            >
              LoFi Bot
            </h5>
          </div>
        </div>

        <ul
          className={click ? "nav-menu active" : "nav-menu"}
          style={{
            alignItems: "center",
          }}
        >
          <li>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  display: "flex",
                  marginRight: 10,
                }}
              >
                <SiGoogledocs color="white" size={20} />
              </div>
              <a href="/">Documentation</a>
            </div>
          </li>
          <li>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  display: "flex",
                  marginRight: 10,
                }}
              >
                <FaDiscord color="white" size={20} />
              </div>
              <a href="/feature">Support</a>
            </div>
          </li>
          <li
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="btn-group" style={{}}>
              <button className="btn">
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      display: "flex",
                      marginRight: 10,
                    }}
                  >
                    <FaDiscord color="white" size={20} />
                  </div>
                  <a href="/feature">Add to Discord</a>
                </div>
              </button>
            </div>
          </li>
        </ul>

        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaTimes size={20} color={"white"} />
          ) : (
            <FaBars size={20} color={"white"} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
