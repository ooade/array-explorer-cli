#!/usr/bin/env node
const locale = require('./locale')
const state = require('./store').state

// The first option that is shown to users
const firstOption = [
	{
		type: 'list',
		name: 'init',
		message: locale['en'].firstMethod,
		choices: locale['en'].primaryOptions
	}
]

// This has the localMethods names
const localeMethods = Object.keys(state).slice(1)

// Picks the methodVerbs
const methodVerbs = {
	adding: locale['en'].methodTypes.add,
	removing: locale['en'].methodTypes.remove,
	string: '',
	ordering: '',
	other: '',
	iterate: locale['en'].methodTypes['iterate by'],
	find: locale['en'].findMethod
}

// Maps method to primary option index
const mapMethodToIndex = {
	adding: 0,
	removing: 1,
	string: 4,
	ordering: 5,
	other: 6,
	iterate: 3,
	find: 2
}

function generateOptions() {
	let lang = locale['en']

	function singleOption(type, name, message, choices, when) {
		return {
			type,
			name,
			message,
			choices,
			when
		}
	}

	const options = localeMethods.map(method => {
		const methodIndex = mapMethodToIndex[method]
		const methodVerb = methodVerbs[method]

		let methodOptions = lang.methodOptions
		let choices

		if (method === 'find') {
			choices = [lang.singleItem, lang.manyItems]
			methodOptions = lang.findMethod
		} else {
			choices = state[method].map(s => s.shortDesc)
		}

		return singleOption(
			'list',
			method.trim(),
			(method === 'find'
				? methodVerb
				: methodOptions + ' ' + methodVerb
			).trim(),
			choices,
			answers => answers.init === lang.primaryOptions[methodIndex]
		)
	})

	return options.concat(
		Object.keys(state.find).map(method => {
			const mapFindOptions = {
				single: lang.singleItem,
				many: lang.manyItems
			}

			return singleOption(
				'list',
				method.trim(),
				(lang.methodOptions + ' find').trim(), // change this
				state.find[method].map(s => s.shortDesc),
				answers => answers.find === mapFindOptions[method]
			)
		})
	)
}

module.exports = () => firstOption.concat(...generateOptions())
