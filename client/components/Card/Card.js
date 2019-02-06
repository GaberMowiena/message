import React, { PureComponent, Fragment } from 'react';
import { CardWrapper, CardList } from './styles/CardStyles';

const CardStyled = () => {
  return (
    <CardWrapper>
      <div class="card__side card__side--front">
        <h4 class="card__heading">
          <span class="card__heading-span card__heading-span--1">Heading</span>
        </h4>

        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
      </div>
      <div class="card__side card__side--back card__side--back-1">
        <h4 class="card__heading">
          <span class="card__heading-span card__heading-span--1">
            Back Heading
          </span>
        </h4>

        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
      </div>
    </CardWrapper>
  );
};

class Card extends PureComponent {
  render() {
    // const { children, ...props } = this.props;
    return <CardStyled />;
  }
}

export default Card;
