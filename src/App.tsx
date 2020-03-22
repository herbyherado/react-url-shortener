import React from 'react';
import styled from 'styled-components';

// components
import ShortenUrlForm from './components/ShortenerForm';
import ShortenUrlRecord from './components/ShortenUrlRecord';

const App = () => {
  return (
    <div>
      <Container>
        <div className="navigation-container">
          <div className="title">Shorten.</div>
          <div className="navigation-wrapper">
            <div className="subtitle">
              Create and track your shortened link.
              <pre />
              Links created will appear on the right panel.
            </div>
            <ShortenUrlForm />
          </div>
        </div>
        <div className="main-container">
          <div className="title">Links.</div>
          <ShortenUrlRecord />
        </div>
      </Container>
    </div>
  );
};

export default App;

const Container = styled.main`
  display: flex;
  flex: 1 auto;
  flex-direction: row;
  background-color: #f2f0f2;

  width: 100%;
  min-width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  overflow: auto;

  .navigation-container {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    padding: 50px;
    border-right: 1px solid #ccc;
    max-width: 420px;
    overflow-y: auto;

    > .title {
      font-size: 30px;
      font-weight: 800;
      letter-spacing: 1px;

      margin-bottom: 50px;
    }

    .subtitle {
      line-height: 21px;
      font-size: 14px;
      font-weight: 500;
      color: #828387;

      margin-bottom: 50px;
    }

    .navigation-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 100%;
    }
  }

  .main-container {
    margin: 0 24px;
    padding: 50px 0;

    > .title {
      font-size: 30px;
      font-weight: 800;
      letter-spacing: 1px;

      margin-bottom: 50px;
    }
  }
`;
