const test = require('tape')
const { merge } = require('./src/utils')

test('loose merge', t => {
	t.plan(1)

	let actual = merge([1, 2, 4, [5, 6, 7]])
	let expected = [1, 2, 4, 5, 6, 7]

	t.deepEqual(actual, expected)
})
