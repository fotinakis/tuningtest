import Ember from 'ember';

export default Ember.Component.extend({
  frequency: 440,

  _start() {
    var context = new AudioContext;
    this.set('context', context);

    var oscillator = context.createOscillator();
    this.set('oscillator', oscillator);
    oscillator.frequency.value = this.get('frequency');
    oscillator.connect(context.destination);
    oscillator.start(0);
  },
  _stop() {
    var oscillator = this.get('oscillator');
    oscillator && oscillator.stop(0);
  },
  actions: {
    on() {
      this._start();
    },
    off() {
      this._stop();
    },
    addStep() {
      this._stop();
      this.set('frequency', this.get('frequency') * Math.pow(2, 7/12));
    },
    addHalfOctave() {
      this.set('frequency', this.get('frequency') * 1.5);
    },
  },
});