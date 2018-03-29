#!/usr/bin/env node
const locale = require('./locale')

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

function singleOption(type, name, message, choices, when) {
	return {
		type,
		name,
		message,
		choices,
		when
	}
}

function generateOptions(lang) {
	let localeLang = locale[lang]

	const state = require('./store')[lang].state

	// This has the localMethods names
	const localeMethods = Object.keys(state).slice(1)

	// The first option that is shown to users
	const firstOption = [
		{
			type: 'list',
			name: 'init',
			message: localeLang.firstMethod,
			choices: localeLang.primaryOptions
		}
	]

	// Picks the methodVerbs
	const methodVerbs = {
		adding: localeLang.methodTypes.add,
		removing: localeLang.methodTypes.remove,
		string: '',
		ordering: '',
		other: '',
		iterate: localeLang.methodTypes['iterate by'],
		find: localeLang.findMethod
	}

	const options = localeMethods.map(method => {
		const methodIndex = mapMethodToIndex[method]
		const methodVerb = methodVerbs[method]

		let methodOptions = localeLang.methodOptions
		let choices

		if (method === 'find') {
			choices = [localeLang.singleItem, localeLang.manyItems]
			methodOptions = localeLang.findMethod
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
			answers => answers.init === localeLang.primaryOptions[methodIndex]
		)
	})

	return firstOption.concat(
		options.concat(
			Object.keys(state.find).map(method => {
				const mapFindOptions = {
					single: localeLang.singleItem,
					many: localeLang.manyItems
				}

				return singleOption(
					'list',
					method.trim(),
					(localeLang.methodOptions + ' ' + localeLang.methodTypes.find).trim(),
					state.find[method].map(s => s.shortDesc),
					answers => answers.find === mapFindOptions[method]
				)
			})
		)
	)
}

module.exports = generateOptions
