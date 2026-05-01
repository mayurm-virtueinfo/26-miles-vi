import CustomImage from "@/src/components/shared/CustomImage";
import { CustomText } from "@/src/components/shared/CustomText";
import { Screen } from "@/src/components/shared/Screen";
import { StaticColors } from "@/src/constants/Colors";
import { Utility } from "@/src/constants/utility";
import { useTheme } from "@/src/context/ThemeContext";
import useCallApiOnLoad from "@/src/hooks/useCallApiOnload";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import useGetApi from "@/src/services/ApiHooks/getApis";
import { devLog } from "@/src/shared/utils/helper";
import { useGiftStyles } from "@/src/styles/GiftsScreen/GiftsScreenStyles";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import CustomShimmer from "../shared/CustomShimmer";
import CategoryChips from "./CategoryChips";
const SelectGift = ({
  onSelectGift,
}: {
  onSelectGift: (id: string) => void;
}) => {
  const { colors } = useTheme();
  const { getAllGiftsApi, getGiftsTypesApi } = useGetApi();
  const giftStyles = useGiftStyles();
  const TextList = useTextListOnFocus();
  const [selectedID, setSelectedID] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: giftsData, loading } = useCallApiOnLoad(getAllGiftsApi, {
    type: selectedCategory,
  });
  const { data: giftsTypes, loading: giftTypesLoading } =
    useCallApiOnLoad(getGiftsTypesApi);
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={giftStyles.card}
      activeOpacity={1}
      onPress={() => {
        setSelectedID(item?.id);
        onSelectGift(item?.id);
      }}
    >
      <CustomImage
        imageUri={item?.image}
        style={giftStyles.image}
        contentFit="cover"
      />
      <LinearGradient
        colors={["transparent", colors.black]}
        style={giftStyles.gradientOverlay}
      />
      <View
        style={[
          giftStyles.checkBoxConatainer,
          { display: selectedID == item.id ? "flex" : "none" },
        ]}
      >
        <AntDesign name="check" size={Utility.SP_14} color={colors.black} />
      </View>
      <CustomText style={giftStyles.label} numberOfLines={1}>
        {item.name}
      </CustomText>
    </TouchableOpacity>
  );
  return (
    <Screen withSafeArea={false} withScrollView={false}>
      <View style={giftStyles.mainConatiner}>
        <CustomText style={giftStyles.title}>
          {TextList.selectYourDreamGift}
        </CustomText>
        <CustomText style={giftStyles.subTitle}>
          {TextList.giftSubtitle}
        </CustomText>
        <CategoryChips
          categories={giftsTypes?.data?.types}
          loading={giftTypesLoading}
          onPress={(key) => {
            devLog(key), setSelectedCategory(key);
          }}
        />
        <View style={giftStyles.flatListContainer}>
          {loading ? (
            <View
              style={[
                giftStyles.flatlistContainerInside,
                giftStyles.shimmerContainer,
              ]}
            >
              {[...Array(6)].map((_, index) => (
                <CustomShimmer
                  key={index}
                  shimmerColors={[
                    StaticColors.lightShimmer1,
                    StaticColors.lightShimmer2,
                    StaticColors.lightShimmer1,
                  ]}
                  count={1}
                  style={giftStyles.giftsShimmer}
                />
              ))}
            </View>
          ) : (
            <FlatList
              data={giftsData?.data?.gifts}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
              bounces={false}
              columnWrapperStyle={giftStyles.collumWraper}
              contentContainerStyle={giftStyles.flatlistContainerInside}
            />
          )}
        </View>
      </View>
    </Screen>
  );
};

export default SelectGift;
