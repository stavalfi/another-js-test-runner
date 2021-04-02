module.exports = {
  'packages/**/*.{js,ts,json,d.ts}': files => {
    const match = files.filter(file => !file.includes('.js') && !file.includes('.json'))
    return [`eslint --max-warnings 0 --fix ${match.join(' ')}`, `git add ${match.join(' ')}`]
  },
}
