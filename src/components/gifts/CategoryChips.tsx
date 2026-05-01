import { Utility } from "@/src/constants/utility";
import { capitalizeFirstLetter } from "@/src/shared/utils/helper";
import { useGiftStyles } from "@/src/styles/GiftsScreen/GiftsScreenStyles";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import CustomShimmer from "../shared/CustomShimmer";
import { CustomText } from "../shared/CustomText";
interface CategoryChipsProps {
  categories: string[];
  onPress?: (selectedCategory: string) => void;
  loading?: boolean;
}

const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  onPress,
  loading = false,
}) => {
  const giftStyles = useGiftStyles();
  const globalStyles = useGlobalStyles();
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const handlePress = (item: string) => {
    if (item == "All") {
      setSelectedCategory(item);
      onPress?.("");
    } else {
      setSelectedCategory(item);
      onPress?.(item);
    }
  };

  const renderItem = ({ item }: { item: string }) => {
    const isSelected = item === selectedCategory;

    return (
      <TouchableOpacity
        onPress={() => handlePress(item)}
        disabled={isSelected}
        style={[giftStyles.chip]}
      >
        <CustomText style={giftStyles.chipText}>
          {capitalizeFirstLetter(item)}
        </CustomText>

        {isSelected && (
          <View style={giftStyles.selectedType}>
            <AntDesign name="check" size={Utility.SP_10} />
          </View>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={giftStyles.CategoryChipscontainer}>
      {loading ? (
        <View style={[globalStyles.rowWithGap10, globalStyles.ml20]}>
          {[...Array(7)].map((_, index) => (
            <CustomShimmer
              key={index}
              count={1}
              style={[giftStyles.chip, globalStyles.w100px]}
            />
          ))}
        </View>
      ) : (
        <FlatList
          data={["All", ...categories]}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={globalStyles.w12} />}
          contentContainerStyle={giftStyles.CategoryChipslistContent}
        />
      )}
    </View>
  );
};

export default CategoryChips;
