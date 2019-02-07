import styled from 'styled-components';

export const CardWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100%;
  list-style: none;
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .card__side {
    transition: all 0.8s ease;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    backface-visibility: hidden;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15);
    .card__side--front {
      background-color: #fff;
    }
  }
  .card__side--back {
    transform: rotateY(180deg);
  }

  :hover {
    .card__side--front {
      transform: rotateY(-180deg);
    }
    .card__side--back {
      transform: rotateY(0);
    }
  }
`;

export const CardImage = styled.img`
  height: 250px;
  width: 250px;
`;
