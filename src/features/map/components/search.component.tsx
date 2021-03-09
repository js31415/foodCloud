import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import { useLocation } from "services/locations/locations.context";
import styled from "styled-components";

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  z-index: 999;
  margin-top: 40px;
  width: 100%;
`;

export const Search = () => {
  const { setKeyword, keyword } = useLocation();
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a location"
        value={searchKeyword}
        icon="map"
        onSubmitEditing={() => {
          setKeyword(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
