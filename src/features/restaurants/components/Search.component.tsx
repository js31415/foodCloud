import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import { useLocation } from "services/locations/locations.context";
import styled from "styled-components";

interface SearchProps {
  isFavoritesToggled: boolean;
  onFavoritesToggled: () => void;
}

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = (props: SearchProps) => {
  const { keyword, setKeyword } = useLocation();
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        icon={props.isFavoritesToggled ? "heart" : "heart-outline"}
        onIconPress={props.onFavoritesToggled}
        placeholder="Search for a location"
        value={searchKeyword}
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
