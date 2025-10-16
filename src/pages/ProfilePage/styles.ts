import { styled } from "@linaria/react";
import FlexBox from "~/components/FlexBox";
import { COLORS } from "~/styles/constants";

export const Card = styled(FlexBox)`
  border-radius: 0.75rem;
  background: ${COLORS.vdsGray95};
  width: 384px;
  min-height: 222px;
  padding: 1.25rem;
`