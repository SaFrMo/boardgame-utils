function BuildDeck({
    low = 1,
    high = 13,
    suits = ['hearts', 'diamonds', 'clubs', 'spades']
} = {}) {
    const output = suits.map(suit => {
        const o = []
        for (let i = low; i <= high; i++) {
            o.push({ suit, rank: i })
        }
        return o
    })

    return [].concat(...output)
}

const deck = BuildDeck()

export { BuildDeck }
export { deck }
