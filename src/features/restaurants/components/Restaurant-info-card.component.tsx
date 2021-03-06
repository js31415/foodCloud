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
} from "./restaurant-info-card.styles";
import { RestaurantRequest } from "services/app-interfaces";
import { Favorite } from "components/favorites";

interface RestaurantInfoCardProps {
  restaurant: RestaurantRequest;
}

export const RestaurantInfoCard = (props: RestaurantInfoCardProps) => {
  const {
    name,
    icon,
    photos,
    address = "100 street random city",
    rating,
    isClosedTemporarily,
    isOpenNow,
  } = props.restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={5}>
      <Favorite restaurant={props.restaurant} />
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant={"label"}>{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((_, i) => (
              <SvgXml
                xml={star}
                key={`star-${i}-name`}
                width={20}
                height={20}
              />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && <Text variant={"error"}>CLOSED</Text>}
            <Spacer position="left" size="small">
              {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="small">
              <Icon source={{ uri: icon }} />
            </Spacer>
          </SectionEnd>
        </Section>
        <Text variant={"caption"}>{address}</Text>
      </Info>
    </RestaurantCard>
  );
};
