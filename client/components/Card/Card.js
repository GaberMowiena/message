import React, { PureComponent } from "react";
import CardStyled from "./CardStyled";

class Card extends PureComponent {
  render() {
    const { children, ...props } = this.props;
    return <CardStyled {...props} />;
  }
}

export default Card;
