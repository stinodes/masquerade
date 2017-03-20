import masque from './masque'

const Channel = (call) => masque({
  _subscribers: [],

  add(object) {
    object.call = call
    this._subscribers.push(object)
  },
  remove(object) {
    this._subscribers
      .splice(
        this._subscribers.findIndex(
            o => o === object
        ),
        1
      )
  },

  call(hook, args) {
    new Promise(
      (resolve, reject) => {
        resolve(
          this._subscribers
            .map(
              o =>
                o[hook] && o[hook](...args)
            )
            .filter(
              v => v !== null && v !== undefined && v !== false
            )
        )
      }
    )
  },

  getSubscribers() {
    return [...this._subscribers]
  },
  getSubscriberCount() {
    return this._subscribers.length
  }

})

export default Channel
