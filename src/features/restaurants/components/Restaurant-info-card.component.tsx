import React from "react";
import { SvgXml } from "react-native-svg";
import star from "assets/star";
import open from "assets/open";
import { Spacer } from "components/spacer";
import { Text } from "components/typography";
import {
  Info,
  Rating,
  Section,
  SectionEnd,
  RestaurantCard,
  RestaurantCardCover,
  Icon,
} from "./Restaurant-info-card.styles";

interface RestaurantInfoCardProps {
  restaurant: {
    name: string;
    icon: string;
    photos: string[];
    address: string;
    isOpenNow: boolean;
    rating: number;
    isClosedTemporarily?: boolean;
  };
}

export const RestaurantInfoCard = (props: RestaurantInfoCardProps) => {
  const {
    name,
    icon,
    photos,
    address,
    rating,
    isClosedTemporarily,
    isOpenNow,
  } = props.restaurant;
  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={5}>
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant={"label"}>{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((_, i) => (
              <SvgXml xml={star} key={i} width={20} height={20} />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant={"error"}>CLOSED TEMPORARILY</Text>
            )}
            <Spacer position="left" size="large">
              {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="large">
              <Icon source={{ uri: icon }} />
            </Spacer>
          </SectionEnd>
        </Section>
        <Text variant={"caption"}>{address}</Text>
      </Info>
    </RestaurantCard>
  );
};
