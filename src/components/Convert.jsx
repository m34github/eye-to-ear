import React from 'react';
import Clarifai from 'clarifai';
import { Redirect } from 'react-router-dom';

class Convert extends React.Component {
  state = {
    pic: this.props.location.state.pic,
    isConverted: false,
    result: null
  };

  api = () => {
    const app = new Clarifai.App({
      apiKey: '456a787b189848ddaaa9647625d55f14'
    });

    app.models
      .predict(
        Clarifai.FOOD_MODEL,
        { base64: this.state.pic.split(',')[1] },
        { language: 'en' }
      )
      .then(res => {
        this.setState({
          isConverted: true,
          result: res.outputs[0].data.concepts
        });
      });
  };

  componentDidMount() {
    this.api();
  }

  render() {
    if (this.state.isConverted) {
      return (
        <Redirect
          to={{
            pathname: '/play',
            state: {
              pic: this.state.pic,
              results: this.state.result
            }
          }}
        />
      );
    }

    return (
      <article>
        <section
          style={{
            background: `url(${this.state.pic}) center / cover`,
            ...style.rootSection
          }}
        >
          <h1>To</h1>
        </section>
      </article>
    );
  }
}

const style = {
  rootSection: {
    width: '100vw',
    height: '100vh',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
};

export default Convert;
