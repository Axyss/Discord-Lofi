import "./Promo.css"
import React from "react"
import { IoCogOutline } from "react-icons/io5"
import { IoMdRadio } from "react-icons/io"
import { SiGnuprivacyguard } from "react-icons/si"
import { IoIosArrowForward } from "react-icons/io"

import { RiSlashCommands2 } from "react-icons/ri"

export default function Promo() {
  return (
    <div
      style={{
        float: "initial",
      }}
    >
      <section className="section promo" aria-label="promo">
        <div className="container" id="service">
          <h2 className="h2 section-title text-center">What Bot Offers?</h2>

          <p className="section-text text-center">
            It was made under Discord TOS & this bot follows all the policies of
            Discord
          </p>

          <ul className="grid-list">
            <li>
              <div className="promo-card bg-gray">
                <div className="card-icon">
                  <RiSlashCommands2 size={25} />
                </div>

                <h3 className="h3 card-title">Slash Command</h3>

                <p className="card-text">
                  Recently we have moved to slash command. / is used in very
                  command of this bot
                </p>

                <a
                  href="https://discord.com/blog/slash-commands-are-here"
                  className="btn-link"
                >
                  <span className="span">Explore More</span>

                  <IoIosArrowForward />
                </a>
              </div>
            </li>

            <li>
              <div className="promo-card bg-gray">
                <div className="card-icon">
                  <IoMdRadio size={25} />
                </div>

                <h3 className="h3 card-title">Various Stations</h3>

                <p className="card-text">
                  To make bot more reliable we have added radio stations. Better
                  for users to choose what to play depending on their mood.
                </p>

                <a
                  href="https://discordjs.guide/interactions/buttons.html#building-and-sending-buttons"
                  className="btn-link"
                >
                  <span className="span">Explore More</span>

                  <IoIosArrowForward />
                </a>
              </div>
            </li>

            <li>
              <div className="promo-card bg-gray">
                <div className="card-icon">
                  <SiGnuprivacyguard size={25} />
                </div>

                <h3 className="h3 card-title">Trusted Security</h3>

                <p className="card-text">
                  All the data of the user are kept in safe place. In case to
                  remove the data you can contact as any time
                </p>

                <a href="https://www.mongodb.com/" className="btn-link">
                  <span className="span">Explore More</span>
                  <IoIosArrowForward />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
