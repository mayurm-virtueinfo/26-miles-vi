import StatusBadge from "@/src/components/home/StatusBadge";
import CustomShimmer from "@/src/components/shared/CustomShimmer";
import { CustomText } from "@/src/components/shared/CustomText";
import useCallApiOnLoad from "@/src/hooks/useCallApiOnload";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import useGetApi from "@/src/services/ApiHooks/getApis";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { useHomeScreenStyles } from "@/src/styles/HomeScreen/HomeScreenStyles";
import moment from "moment";
import React, { useState } from "react";
import { FlatList, View } from "react-native";

const MyWinnings = () => {
  const [filter, setFilter] = useState<any>();
  const TextList = useTextListOnFocus();
  const globalStyles = useGlobalStyles();
  const { getMyWinningsApi } = useGetApi();
  const homeScreenStyles = useHomeScreenStyles();

  const getFilteredData = () => {
    //@ts-ignore
    if (!winningsData?.data?.vehicle_registrations) return [];

    const now = moment(); //@ts-ignore
    let filtered = winningsData.data.vehicle_registrations;
    if (filter === "1d") {
      filtered = filtered.filter((item: any) =>
        moment(item.updated_at).isAfter(now.clone().subtract(1, "days"))
      );
    } else if (filter === "7d") {
      filtered = filtered.filter((item: any) =>
        moment(item.updated_at).isAfter(now.clone().subtract(7, "days"))
      );
    } else if (filter === "1m") {
      filtered = filtered.filter((item: any) =>
        moment(item.updated_at).isAfter(now.clone().subtract(1, "months"))
      );
    } else if (filter === "3m") {
      filtered = filtered.filter((item: any) =>
        moment(item.updated_at).isAfter(now.clone().subtract(3, "months"))
      );
    }

    return filtered;
  };
  const { data: winningsData, loading } = useCallApiOnLoad(getMyWinningsApi);

  const renderItem = ({ item }: any) => (
    <View style={homeScreenStyles.card}>
      <View style={homeScreenStyles.row}>
        <View style={homeScreenStyles.column}>
          <CustomText style={homeScreenStyles.label}>
            {TextList.vehicleLicensePlate}
          </CustomText>
          <CustomText style={homeScreenStyles.value}>
            {item?.vehicle_license_plate}
          </CustomText>

          <CustomText style={homeScreenStyles.label}>
            {TextList.vehicleColor}
          </CustomText>
          <CustomText style={homeScreenStyles.value}>
            {item?.vehicle_color}
          </CustomText>

          <CustomText style={[homeScreenStyles.label, homeScreenStyles.mt23]}>
            {moment(item.updated_at).format("DD MMM YYYY, hh:mm A") ||
              TextList.no_date}
          </CustomText>
        </View>
        <View style={homeScreenStyles.column}>
          <CustomText style={homeScreenStyles.label}>
            {TextList.vehicleMake}
          </CustomText>
          <CustomText style={homeScreenStyles.value}>
            {item?.vehicle_make}
          </CustomText>

          <CustomText style={homeScreenStyles.label}>
            {TextList.vehicleState}
          </CustomText>
          <CustomText style={homeScreenStyles.value}>{item?.state}</CustomText>

          <StatusBadge status={item?.status} />
        </View>
      </View>
    </View>
  );

  return (
    <>
      <View style={homeScreenStyles.MyWinningsHeading}>
        <View style={globalStyles.verticalAlignment}>
          <CustomText style={homeScreenStyles.heading}>
            {TextList.myWinnings}
          </CustomText>
        </View>
      </View>
      {loading ? (
        <CustomShimmer count={2} style={homeScreenStyles.myWinningsShimmer} />
      ) : (
        <FlatList
          data={getFilteredData()}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={homeScreenStyles.listContent}
          ListEmptyComponent={(index) => [
            <View key={index} style={homeScreenStyles.loaderContainer}>
              <CustomText>{TextList.noWinningsFound}</CustomText>
            </View>,
          ]}
        />
      )}
    </>
  );
};

export default MyWinnings;
