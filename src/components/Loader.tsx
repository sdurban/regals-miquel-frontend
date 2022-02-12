/** @jsxImportSource @emotion/react */
import {keyframes, css} from '@emotion/react';
import {BackgroundDrop, CenterInScreen} from "../GlobalCss";

const Animation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = () => <BackgroundDrop>
    <CenterInScreen>
        <div css={css`
                  border-top: 10px solid #3498db;
                  border-radius: 50%;
                  width: 80px;
                  height: 80px;
                  animation: ${Animation} 1s linear infinite;
                  `} />
        <br />
        <p css={css`color: white;`}>Carregant...</p>
    </CenterInScreen>
</BackgroundDrop>;

export default Loader;