import Channel from '../../src/core/channel'

test('should return a new channel', () => {
  const channel = Channel(() => {})

  expect(channel)
    .toHaveProperty('call')
  expect(channel)
    .toHaveProperty('add')
  expect(channel)
    .toHaveProperty('remove')
})
