const test = require('tape')
const options = require('./src/options')
const locale = require('./src/locale')

const questions = options()

test('initial', t => {
	t.plan(2)

	t.deepEqual(
		questions[0].name,
		'init',
		'Should display the right initial name'
	)

	t.deepEqual(
		questions[0].choices,
		locale.en.primaryOptions,
		'Should display the right initial options'
	)
})

test('adding', t => {
	t.plan(1)

	t.deepEqual(question[1].name, 'adding')
})

test('removing', t => {
	t.plan(1)

	t.deepEqual(question[2].name, 'removing')
})
