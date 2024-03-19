import { SvgXml } from "react-native-svg";
import { IconProps } from "./_IconProps";

export function IconSignOut({
  type = "normal",
  color = "#000000",
  size = 32,
}: IconProps) {
  const markup =
    type === "normal"
      ? `<svg xmlns="http://www.w3.org/2000/svg" width=${size} height=${size} fill=${color} viewBox="0 0 256 256"><path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40A8,8,0,0,0,168,88v32H104a8,8,0,0,0,0,16h64v32a8,8,0,0,0,13.66,5.66l40-40A8,8,0,0,0,221.66,122.34Z"></path></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width=${size} height=${size} fill=${color} viewBox="0 0 256 256"><path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40A8,8,0,0,0,168,88v32H104a8,8,0,0,0,0,16h64v32a8,8,0,0,0,13.66,5.66l40-40A8,8,0,0,0,221.66,122.34Z"></path></svg>`;

  return <SvgXml xml={markup} />;
}
