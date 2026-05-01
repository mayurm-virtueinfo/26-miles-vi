import { splashIconSvg } from "@/assets/svgs/AuthSvgs";
import { approvedSvg, cancelledSvg, deliveredSvg, pendingSvg, rejectedSvg, sentSvg } from "@/assets/svgs/MyWinningsSvgs";
import { cameraSvg, cardSvg, checkSvg, darkModeSvg, deleteSvg, gallerySvg, languageSvg, logOutSvg, premiumSvg } from "@/assets/svgs/SettingsSvgs";
import { getHomeSvg, getProfileSvg, getSettingsSvg } from "@/assets/svgs/TabBarSvgs";
import { ThemeColors } from "../shared/interface/themeColors.interface";

export const SVG = {
  splashIcon: splashIconSvg,
  camera:cameraSvg,
  gallery:gallerySvg,
  premium:premiumSvg,
  circularTick:checkSvg,
  pending:pendingSvg,
  sent:sentSvg,
  approved:approvedSvg,
  delivered:deliveredSvg,
  rejected:rejectedSvg,
  cancelled:cancelledSvg,
};

export const colorSvgs = (colors: ThemeColors) => {
  return {
    activeHome: getHomeSvg(colors.tabBarIconActive),
    inActiveHome: getHomeSvg(colors.tabBarIconInactive),
    activeProfile: getProfileSvg(colors.tabBarIconActive),
    inActiveProfile: getProfileSvg(colors.tabBarIconInactive),
    activeSettings: getSettingsSvg(colors.text),
    inActiveSettings: getSettingsSvg(colors.text),
    card: cardSvg(colors.settingTabsIcons),
    languages: languageSvg(colors.settingTabsIcons),
    deleteAccount: deleteSvg(colors.settingTabsIcons),
    darkMode: darkModeSvg(colors.settingTabsIcons),
    logOutSvg: logOutSvg(colors.settingTabsIcons),
  };
};