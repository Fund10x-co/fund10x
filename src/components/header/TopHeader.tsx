import { setPageLoading } from "@/store/alertSlice/alertSlice";
import { AppDispatch, RootState } from "@/store/store";
import { axiosAuth } from "@/utils/config/axios";
import { LOGOUT_URL } from "@/utils/config/urlConfigs";
import { deleteCookies } from "@/utils/helpers/customFunctions";
import Image from "next/image";
import React from "react";
import { BiShow, BiPowerOff, BiMenu } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const TopHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.oauth);

  const handleLogout = async () => {
    dispatch(
      setPageLoading({
        status: true,
        message: "Logging out...",
      })
    );

    try {
      const response = await axiosAuth.post(LOGOUT_URL);

      deleteCookies();
    } catch (error: any) {
      deleteCookies();
    }

    dispatch(
      setPageLoading({
        status: false,
        message: "",
      })
    );
  };

  return (
    <div className="top_header">
      <div className="top_header_grid">
        <div className="top_header_left hideOnMobile"></div>
        <div className="top_header_right">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "40px",
              marginRight: 30,
            }}
          >
            <div className="header-logout-icon">
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleLogout();
                }}
              >
                <BiPowerOff size={27} />
              </div>
            </div>
          </div>
          <div className="header_user_top">
            <Image
              src={require("../../assets/img/default.png")}
              alt="user"
              property={"1"}
            />
            <p className="hideOnMobile">{user?.firstName}</p>
            {/* <img src={require("../../assets/img/default.png")} alt="" /> */}
            <div
              style={{ marginLeft: 20 }}
              className="header-logout-icon hideOnLarge"
            >
              {/* <i className="bx bx-menu"></i> */}
              <BiMenu size={27} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
