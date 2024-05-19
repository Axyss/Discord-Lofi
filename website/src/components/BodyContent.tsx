import React from "react"
import { FaBars, FaTimes, FaHome, FaDiscord } from "react-icons/fa"
import "./BodyContent.css"
import { CiCoffeeCup } from "react-icons/ci"
import LofiIcon from "../assets/lofi.png"
export default function BodyContent() {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginBottom: -200,

          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              color: "white",
            }}
          >
            Listen the best LoFi music
          </h1>
          <h2
            style={{
              color: "white",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            on <h2 style={{ color: "#4365e0", marginLeft: 10 }}>Discord.</h2>
          </h2>
        </div>
        <div
          style={{
            marginTop: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h3 className="headingtext">
            Bring Relaxing LoFi Beats to Your Discord Server for Studying,
            Working, or Chilling
          </h3>
          <h3
            className="headingtext"
            style={{
              marginTop: 5,
            }}
          >
            in a Voice Channel
          </h3>
        </div>

        <div
          className="btn-group"
          style={{
            marginTop: 60,
            display: "flex",
            flexDirection: "row",
            margin: 20,
          }}
        >
          <button style={{}} className="btn">
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
              <a
                style={{
                  color: "white",
                }}
              >
                Add to Discord
              </a>
            </div>
          </button>

          <button className="buyButton">
            <img
              className="coffeeImage"
              src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
              alt="Buy me a coffee"
            />
            <span className="coffeeButtonText">Buy me a coffee</span>
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
    </React.Fragment>
  )
}
