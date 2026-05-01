import SelectGift from "@/src/components/gifts/select-gift";
import SubmitModal from "@/src/components/gifts/SubmitModal";
import SubmittingOverlay from "@/src/components/shared/SubmittingOverlay";
import Routes from "@/src/constants/routes";
import { ImageUrls } from "@/src/constants/urls";
import useCallApiWhenRequired from "@/src/hooks/useCallApiWhenRequired";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import usePostApi from "@/src/services/ApiHooks/postApis";
import { showSuccess } from "@/src/shared/utils/helper";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { router, useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";

const GiftScreen = () => {
  const { vehicleData } = useLocalSearchParams();
  const { submitVehicleApi } = usePostApi();
  const [showModal, setShowModal] = useState(false);
  const [giftID, setGiftID] = useState<string>();
  const globalStyles = useGlobalStyles();
  const [showConfetti, setShowConfetti] = useState(false);
  const TextList = useTextListOnFocus();
  const { loading: vehicleSubmitLoading, callApi: callVehicleSubmittingApi } =
    useCallApiWhenRequired(submitVehicleApi, (response) => {
      setShowConfetti(true);
      showSuccess({
        text1: TextList.congratulations,
        text2: response?.message,
      }); 
    });

  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => {
        setShowConfetti(false);
        router.navigate(`/${Routes.TABS}`);
      }, 500); // or actual duration of confetti in ms
    }
  }, [showConfetti]);
  return (
    <>
      <SelectGift
        onSelectGift={(id: any) => {
          setGiftID(id);
          setShowModal(true);
        }}
      />
      <SubmitModal
        visible={showModal}
        onSubmit={() => {
          setShowModal(false)
          //@ts-ignore
          const data = JSON.parse(vehicleData);
          const formData = new FormData(); //@ts-ignore
          formData.append("gift_id", giftID);
          formData.append("vehicle_license_plate", data.licensePlate);
          formData.append("vehicle_make", data.vehicleMake);
          formData.append("vehicle_color", data.vehicleColor); //@ts-ignore
          formData.append("state", data.state?.name);
          // If you want to send image
          // formData.append("image", "ImageObject");
          callVehicleSubmittingApi(formData);
        }}
        onCancel={() => {
          setShowModal(false);
        }}
      />
      <SubmittingOverlay visible={vehicleSubmitLoading} />

      {showConfetti && (
        <LottieView
          source={ImageUrls.confetti}
          autoPlay
          loop={false}
          onAnimationFinish={() => {
            setShowConfetti(false); // stop showing confetti
          }}
          style={globalStyles.fullScreenCover}
        />
      )}
    </>
  );
};

export default GiftScreen;
