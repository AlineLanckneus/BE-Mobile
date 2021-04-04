import styled from "styled-components";
import {COLORS, FONT_WEIGHTS, SPACINGS} from "../styles/StyleConstants";

export const StyledMapContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const StyledSidebar = styled.div`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  padding: ${SPACINGS.xs};
  margin: ${SPACINGS.xs};
  background-color: #404040;
  color: ${COLORS.white};
  border-radius: 15px;
  z-index: 1 !important;
  font-weight: ${FONT_WEIGHTS.bold};
`;
