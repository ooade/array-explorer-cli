#!/usr/bin/env node

function merge(arr) {
	let a = []

	arr.forEach(item => {
		if (Array.isArray(item)) {
			item.forEach(i => a.push(i))
		} else {
			a.push(item)
		}
	})

	return a
}

const generateQuestions = {
	init: function init({ keys, obj = null, state, text }) {
		return keys.map(key => {
			// all except find
			if (Array.isArray(obj ? state[obj][key] : state[key])) {
				return {
					type: 'list',
					name: key,
					message: text[key][1],
					choices: (obj ? state[obj][key] : state[key]).map(
						choice => choice.shortDesc
					),
					when: answers => {
						if (obj) {
							return answers[obj] === text[key][0]
						}

						return answers.init === text[key][0]
					}
				}
			} else {
				// We have an object here
				return [
					{
						type: 'list',
						name: key,
						message: text[key][1],
						choices: Object.keys(state[key]).map(choice => text[choice][0]),
						when: answers => answers.init === text[key][0]
					}
				].concat(
					this.init({ keys: Object.keys(state[key]), obj: key, state, text })
				)
			}
		})
	}
}

module.exports = {
	merge,
	generateQuestions
}
