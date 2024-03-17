import React, { ReactNode } from "react";
import { Base64Default } from "@/constants/Base64Default";
import { ImageBackground, ImageBackgroundProps } from "react-native";

interface Base64ImageProps extends ImageBackgroundProps {
  base64Image: string | null;
  children?: ReactNode;
}

const Base64Image: React.FC<Base64ImageProps> = ({
  base64Image,
  children,
  ...rest
}) => {
  return (
    <ImageBackground
      source={{
        uri: `data:image/jpeg;base64,${
          base64Image ? base64Image : Base64Default
        }`,
      }}
      style={{ flex: 1 }}
      resizeMode="cover"
      {...rest}
    >
      {children}
    </ImageBackground>
  );
};

export { Base64Image };
