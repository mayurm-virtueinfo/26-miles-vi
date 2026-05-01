import { StaticColors } from "@/src/constants/Colors";
import { SVG } from "@/src/constants/svg";
import { Utility } from "@/src/constants/utility";
import { useHomeScreenStyles } from "@/src/styles/HomeScreen/HomeScreenStyles";
import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import { CustomText } from "../shared/CustomText";

const StatusBadge = ({ status }: { status: string }) => {
  let backgroundColor = "";
  let icon = null;
  let label = "";
  let borderColor = "";
  let textColor = "";
  const homeScreenStyles = useHomeScreenStyles();

  switch (status.toLowerCase()) {
    case "pending":
      backgroundColor =StaticColors.pending.background;
      borderColor = StaticColors.pending.border;
      icon = (
        <SvgXml
          xml={SVG.pending}
          height={Utility.SP_15}
          width={Utility.SP_15}
        />
      );
      label = "Pending";
      textColor = StaticColors.pending.text;
      break;
    case "sent":
      backgroundColor = StaticColors.sent.background;
      borderColor = StaticColors.sent.border;
      icon = (
        <SvgXml xml={SVG.sent} height={Utility.SP_15} width={Utility.SP_15} />
      );
      label = "Sent";
      textColor = StaticColors.sent.text;
      break;
    case "approved":
      backgroundColor =StaticColors.approved.background;
      borderColor = StaticColors.approved.border;
      icon = (
        <SvgXml
          xml={SVG.approved}
          height={Utility.SP_15}
          width={Utility.SP_15}
        />
      );
      label = "Approved";
      textColor =StaticColors.approved.text;
      break;
    case "delivered":
      backgroundColor = StaticColors.delivered.background;
      borderColor = StaticColors.delivered.border;
      icon = (
        <SvgXml
          xml={SVG.delivered}
          height={Utility.SP_15}
          width={Utility.SP_15}
        />
      );
      label = "Delivered";
      textColor = StaticColors.delivered.text;
      break;
    case "rejected":
      backgroundColor = StaticColors.rejected.background;
      borderColor = StaticColors.rejected.border;
      icon = (
        <SvgXml
          xml={SVG.rejected}
          height={Utility.SP_15}
          width={Utility.SP_15}
        />
      );
      label = "Rejected";
      textColor = StaticColors.rejected.text;
      break;
    case "cancelled":
      backgroundColor = StaticColors.cancelled.background;
      borderColor = StaticColors.cancelled.border;
      icon = (
        <SvgXml
          xml={SVG.cancelled}
          height={Utility.SP_15}
          width={Utility.SP_15}
        />
      );
      label = "Cancelled";
      textColor =StaticColors.cancelled.text;
      break;

    default:
      backgroundColor = StaticColors.default.background;
      borderColor =StaticColors.default.border;
      icon = null;
      label = status;
      textColor = StaticColors.default.text;
  }

  return (
    <View
      style={[
        homeScreenStyles.statusBadgeContainer,
        {
          borderColor,
          backgroundColor,
        },
      ]}
    >
      {icon && <View>{icon}</View>}
      <CustomText
        style={[homeScreenStyles.statusBadgeText,{
          color: textColor,
        }]}
      >
        {label}
      </CustomText>
    </View>
  );
};

export default StatusBadge;
