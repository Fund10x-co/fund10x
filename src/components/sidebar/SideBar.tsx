"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBar = () => {
  const pathName = usePathname();

  // console.log(pathName);
  return (
    <div>
      <div className={`site_sidebar  `}>
        <div className="dashboard_logo">
          <a href="cee">
            <Image
              src={require("../../assets/img/logo.png")}
              alt="fasta logo"
              property={"1"}
            />
          </a>
        </div>
        <div className="site_sidebar-scroll">
          <ul className="metismenu" id="menu">
            <li>
              <Link
                href="/admin/investors"
                className={`has-arrow  ${
                  ["/admin/investors/add", "/admin/investors"].includes(
                    pathName
                  ) && "active"
                }`}
              >
                <div>
                  <Image
                    property={"2"}
                    src={require("../../assets/img/vectors/patient.png")}
                    alt=" 4"
                  />
                </div>

                <span className="nav-text">Investors</span>
              </Link>
            </li>

            <li>
              <Link
                href="/admin/business"
                className={`has-arrow  ${
                  [
                    "/admin/business/add",
                    "/admin/business",
                    "/admin/business/edit",
                  ].includes(pathName) && "active"
                }`}
              >
                <div>
                  <Image
                    property={"3"}
                    src={require("../../assets/img/vectors/briefcase.png")}
                    alt=" 4"
                  />
                </div>
                <span className="nav-text">Business</span>
              </Link>
            </li>
            {/* <li>
              <Link
                href="/admin/startUps"
                className={`has-arrow  ${
                  pathName === "/admin/startUps" && "active"
                }`}
              >
                <div>
                  <Image
                    property={"3"}
                    src={require("../../assets/img/vectors/briefcase.png")}
                    alt=" 4"
                  />
                </div>
                <span className="nav-text">Startups</span>
              </Link>
            </li> */}

            <li>
              <Link
                href="/admin/admins"
                className={`has-arrow  ${
                  ["/admin/admins/add", "/admin/admins"].includes(pathName) &&
                  "active"
                }`}
              >
                <div>
                  <Image
                    property={"2"}
                    src={require("../../assets/img/vectors/admin-with-cogwheels.png")}
                    alt=" 4"
                  />
                </div>

                <span className="nav-text">Admins</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/newsletter"
                className={`has-arrow  ${
                  [
                    "/admin/newsletter/add",
                    "/admin/newsletter/view",
                    "/admin/newsletter",
                  ].includes(pathName) && "active"
                }`}
              >
                <div>
                  <Image
                    property={"4"}
                    src={require("../../assets/img/vectors/add.png")}
                    alt=" 4"
                  />
                </div>
                <span className="nav-text">News letter</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
