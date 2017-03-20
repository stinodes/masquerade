import masque from './masque'
import Channel from './channel'

const mediator = {
  _channels: {},

  subscribe(channel, object) {
    if (!this._channels[channel])
      this._channels[channel] = Channel(this.call.bind(this))

    this._channels[channel].add(object)
  },
  unsubscribe(channel, object) {
    this._channels[channel].remove(object)
  },

  call(channel, hook, args) {
    return this._channels[channel].call(hook, args)
  },
}

export default masque(mediator)
