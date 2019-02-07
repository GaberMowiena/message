import React, { Component } from 'react';
import styled from 'styled-components';

import ImageCard from '../Card/ImageCard';

const PairStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: calc(15% - 50px);
  grid-gap: 60px;
  width: 100%;
  height: calc(100% - 50px);
  align-items: center;
`;

class Pair extends Component {
  render() {
    return (
      <PairStyle>
        <ImageCard
          text="Hubert"
          img="https://avatars3.githubusercontent.com/u/40252247?s=460&v=4"
          backtext="Info"
          backtext1="Github: @hubelin"
          backtext2="Linkedin: @hubelin_"
          backtext3="Bio: I have been coding x months, looking to learn more"
        />

        <ImageCard
          text="Serhii"
          img="https://avatars0.githubusercontent.com/u/35103391?s=460&v=4"
          backtext="Info"
          backtext1="Github: @SKaistrenki"
          backtext2="Linkedin: @SKaistrenki"
          backtext3="Bio: Associate's degree in computer science."
        />
      </PairStyle>
    );
  }
}

export default Pair;
