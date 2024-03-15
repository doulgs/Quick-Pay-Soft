import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { createText, createBox } from "@shopify/restyle";
import { THEME, ThemeProps } from "@/theme";

const Text = createText<ThemeProps>();
const Box = createBox<ThemeProps>();

interface Props extends TextInputProps {
  editavel?: boolean;
}

const Input: React.FC<Props> = ({ editavel = true, ...rest }) => {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      borderRadius={8}
      borderWidth={1}
      backgroundColor="white"
    >
      {editavel ? (
        <TextInput style={styles.input} {...rest} />
      ) : (
        <Text style={styles.input} />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export { Input };
