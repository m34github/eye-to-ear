import React from 'react';
import Tone from 'tone';
import { Chord } from 'tonal';

class Play extends React.Component {
  state = {
    pic: this.props.location.state.pic,
    result: this.props.location.state.result
  };

  sound = () => {
    const bass = new Tone.Player('./assets/audio/bass.mp3').toMaster();
    const cymbal = new Tone.Player('./assets/audio/cymbal.mp3').toMaster();
    const hihat = new Tone.Player('./assets/audio/hihat.mp3').toMaster();
    const tom = new Tone.Player('./assets/audio/tom.mp3').toMaster();
    let i = 0;

    const seq = new Tone.Sequence(
      (time, note) => {
        hihat.start();
        i % 2 === 0 ? tom.start() : null;
        i % 4 === 0 ? bass.start() : null;
        i % 32 === 0 ? cymbal.start() : null;
        i += 1;
      },
      [...Array(8).keys()].map(d => 'C4'),
      '16n'
    ).start(0);

    Tone.Transport.bpm.value = 140;
    Tone.Transport.start();
  };

  render() {
    return (
      <article onClick={this.sound}>
        <section
          style={{
            background: `url(${this.state.pic}) center / cover`,
            ...style.rootSection
          }}
        >
          <h1>Ear</h1>
          <h3>{this.state.result[0].name}</h3>
          <button
            onClick={() => {
              this.props.history.push('/upload');
            }}
          >
            Return
          </button>
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
  }
};

export default Play;
