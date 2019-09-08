import React from 'react';
import Tone from 'tone';
import { Chord } from 'tonal';

class Play extends React.Component {
  state = {
    pic: this.props.location.state.pic,
    results: this.props.location.state.results,
    isPlaying: false
  };

  playSound = () => {
    const base = new Tone.Player('./assets/audio/base7.mp3').toMaster();
    const bass = new Tone.Player('./assets/audio/bass.mp3').toMaster();
    const bass2 = new Tone.Player('./assets/audio/bass2.mp3').toMaster();
    const cymbal = new Tone.Player('./assets/audio/cymbal.mp3').toMaster();
    const cymbal2 = new Tone.Player('./assets/audio/cymbal2.mp3').toMaster();
    const zipper = new Tone.Player('./assets/audio/zipper.mp3').toMaster();
    const hihat = new Tone.Player('./assets/audio/hihat.mp3').toMaster();
    const hihat2 = new Tone.Player('./assets/audio/hihat2.mp3').toMaster();
    const snare = new Tone.Player('./assets/audio/snare.mp3').toMaster();
    const tom = new Tone.Player('./assets/audio/tom.mp3').toMaster();
    const tom2 = new Tone.Player('./assets/audio/tom2.mp3').toMaster();
    const tom3 = new Tone.Player('./assets/audio/tom3.mp3').toMaster();
    const gyoza = new Tone.Player('./assets/audio/gyoza.mp3').toMaster();
    const gyoza2 = new Tone.Player('./assets/audio/gyoza2.mp3').toMaster();

    const bases = [base, bass, bass2];
    const cymbals = [cymbal, cymbal2, zipper];
    const hats = [hihat, hihat2, snare];
    const toms = [tom, tom2, tom3];

    const result = this.state.results[0].name;
    const r = result.toUpperCase().charCodeAt(0) - 65;
    const hat_i = Math.floor(r / 9);
    const tom_i = Math.floor((r % 9) / 3);
    const cymbal_i = Math.floor((r % 9) % 3);

    let i = 0;

    const seq = new Tone.Sequence(
      (time, note) => {
        hats[hat_i].start();
        i % 2 === 0 ? toms[tom_i].start() : null;
        i % 4 === 0 ? bases[(r % 2) + 1].start() : null;
        i % 32 === 0 ? cymbals[cymbal_i].start() : null;

        if (result.toLowerCase() === 'gyoza') {
          i % 8 === 0 ? gyoza.start() : null;
          i % 16 === 0 ? gyoza2.start() : null;
        } else if (r === 6) {
          i % 16 === 0 ? gyoza2.start() : null;
        }

        i += 1;
      },
      [...Array(8).keys()].map(d => 'C4'),
      '16n'
    ).start(0);

    Tone.Transport.bpm.value = 140;
    Tone.Transport.start();
  };

  stopSound = () => {
    Tone.Transport.stop();
  };

  toggleSound = () => {
    if (this.state.isPlaying) {
      this.stopSound();
      this.setState({
        isPlaying: false
      });
    } else {
      this.playSound();
      this.setState({
        isPlaying: true
      });
    }
  };

  render() {
    return (
      <article>
        <section
          style={{
            background: `url(${this.state.pic}) center / cover`,
            ...style.rootSection
          }}
        >
          <h1>Ear</h1>
          <h3>{this.state.results[0].name}</h3>
          <button className="button-primary" onClick={this.toggleSound}>
            {this.state.isPlaying ? 'Stop' : 'Play'}
          </button>
          <button
            style={style.backButton}
            onClick={() => {
              this.stopSound();
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
  },
  backButton: {
    background: '#fff'
  }
};

export default Play;
