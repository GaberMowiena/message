import React, { PureComponent, Fragment } from 'react';
import { CardWrapper } from './styles/CardStyles';

const CardStyled = ({
  text,
  text1,
  text2,
  text3,
  backtext,
  backtext1,
  backtext2,
  backtext3
}) => {
  return (
    <CardWrapper>
      <div className="card__side card__side--front">
        <h4 className="card__heading">
          <span className="card__heading-span card__heading-span--1">
            {text}
          </span>
        </h4>

        <li>{text1}</li>
        <li>{text2}</li>
        <li>{text3}</li>
      </div>
      <div className="card__side card__side--back card__side--back-1">
        <h4 className="card__heading">
          <span className="card__heading-span card__heading-span--1">
            {backtext}
          </span>
        </h4>

        <li>{backtext1}</li>
        <li>{backtext2}</li>
        <li>{backtext3}</li>
      </div>
    </CardWrapper>
  );
};

class Card extends PureComponent {
  render() {
    const { children, ...props } = this.props;
    return <CardStyled {...props} />;
  }
}

export default Card;
