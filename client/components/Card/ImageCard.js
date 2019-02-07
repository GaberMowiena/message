import React, { PureComponent } from 'react';
import { CardWrapper, CardImage } from './styles/CardStyles';

const ImageCardStyled = ({
  text,
  text1,
  text2,
  text3,
  backtext,
  backtext1,
  backtext2,
  backtext3,
  img
}) => {
  return (
    <CardWrapper>
      <div className="card__side card__side--front">
        <h4 className="card__heading">
          <span className="card__heading-span card__heading-span--1">
            {text}
          </span>
        </h4>
        <CardImage src={img} alt="profile" />

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

class ImageCard extends PureComponent {
  render() {
    const { children, ...props } = this.props;
    return <ImageCardStyled {...props} />;
  }
}

export default ImageCard;
