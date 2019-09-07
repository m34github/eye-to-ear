import React from 'react';
import { Redirect } from 'react-router-dom';

class Upload extends React.Component {
  state = {
    isUploaded: false,
    pic: null
  };

  load = file => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.setState({
        isUploaded: true,
        pic: reader.result
      });
    });
    reader.readAsDataURL(file);
  };

  render() {
    if (this.state.isUploaded) {
      return (
        <Redirect
          to={{
            pathname: '/convert',
            state: {
              pic: this.state.pic
            }
          }}
        />
      );
    }

    return (
      <article>
        <section style={style.rootSection}>
          <h1>Eye</h1>
          <input
            id="foo"
            type="file"
            style={style.uploadInput}
            onChange={e => {
              this.load(e.target.files[0]);
            }}
          />
          <label htmlFor="foo" className="button button-primary">
            Upload
          </label>
        </section>
      </article>
    );
  }
}

const style = {
  rootSection: {
    width: '100vw',
    height: '100vh',
    background: '#112',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadInput: {
    display: 'none'
  }
};

export default Upload;
