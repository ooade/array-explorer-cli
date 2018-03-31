const test = require('tape')
const options = require('./src/options')

const isObject = prop =>
	!Array.isArray(prop) && prop !== null && typeof prop === 'object'

test('en:', t => {
	let lang = 'en'

	let state = require('./src/store')[lang].state
	let questions = options(lang)

	const findQuestion = name => questions.find(obj => obj.name === name)
	const getOptions = name => state[name].map(s => s.shortDesc)

	test('initial', t => {
		t.plan(3)

		let question = findQuestion('init')

		t.deepEqual(question.name, 'init', 'name should be init ')

		t.deepEqual(
			question.message,
			'I have an array, I would like to',
			'displays appropriate message'
		)

		t.deepEqual(
			question.choices,
			[
				'add items or other arrays',
				'remove items',
				'find items',
				'walk over items',
				'return a string',
				'order an array',
				'something else'
			],
			'displays the right choices'
		)
	})

	test('adding', t => {
		t.plan(3)

		let name = 'adding'

		let question = findQuestion(name)

		t.deepEqual(question.name, name, 'name should be ' + name)

		t.deepEqual(
			question.message,
			'I need to add',
			'displays appropriate message'
		)

		t.deepEqual(
			question.choices,
			getOptions(name),
			'displays the right choices'
		)
	})

	test('removing', t => {
		t.plan(3)

		let name = 'removing'

		let question = findQuestion(name)

		t.deepEqual(question.name, name, 'name should be ' + name)

		t.deepEqual(
			question.message,
			'I need to remove',
			'displays appropriate message'
		)

		t.deepEqual(
			question.choices,
			getOptions(name),
			'displays the right choices'
		)
	})

	test('string', t => {
		t.plan(3)

		let name = 'string'

		let question = findQuestion(name)

		t.deepEqual(question.name, name, 'name should be ' + name)

		t.deepEqual(question.message, 'I need to', 'displays appropriate message')

		t.deepEqual(
			question.choices,
			getOptions(name),
			'displays the right choices'
		)
	})

	test('ordering', t => {
		t.plan(3)

		let name = 'ordering'

		let question = findQuestion(name)

		t.deepEqual(question.name, name, 'name should be ' + name)

		t.deepEqual(question.message, 'I need to', 'displays appropriate message')

		t.deepEqual(
			question.choices,
			getOptions(name),
			'displays the right choices'
		)
	})

	test('other', t => {
		t.plan(3)

		let name = 'other'

		let question = findQuestion(name)

		t.deepEqual(question.name, name, 'name should be ' + name)

		t.deepEqual(question.message, 'I need to', 'displays appropriate message')

		t.deepEqual(
			question.choices,
			getOptions(name),
			'displays the right choices'
		)
	})

	test('iterate', t => {
		t.plan(3)

		let name = 'iterate'

		let question = findQuestion(name)

		t.deepEqual(question.name, name, 'name should be ' + name)

		t.deepEqual(
			question.message,
			'I need to iterate by',
			'displays appropriate message'
		)

		t.deepEqual(
			question.choices,
			getOptions(name),
			'displays the right choices'
		)
	})

	test('find', t => {
		t.plan(3)

		let name = 'find'

		let question = findQuestion(name)

		t.deepEqual(question.name, name, 'name should be ' + name)

		t.deepEqual(
			question.message,
			"I'm trying to find",
			'displays appropriate message'
		)

		t.deepEqual(
			question.choices,
			['one item', 'one or many items'],
			'displays the right choices'
		)
	})

	t.end()
})

test('others:', t => {
	Object.keys(require('./src/locale')).map(lang => {
		test(lang + ' works', t => {
			t.plan(2)

			let state = require('./src/store')[lang].state
			let questions = options(lang)

			t.equal(isObject(state), true)
			t.equal(Array.isArray(questions), true)
		})
	})
	t.end()
})
