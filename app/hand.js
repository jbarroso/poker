var poker = function(poker) {

    poker.Hand = function(name) {

        var cards = name.split(' ').map(function(name) {
            return new poker.Card(name);
        });

        var sortCards = function() {
            cards = cards.sort(function(a, b) {
                return b.getValue() - a.getValue();
            });
        };

        var isStraight = function(numbers) {
            var straightRangeNumbers = 'AKQJ98765432';
            var straightRangeNumbersAce = 'A5432';
            return (straightRangeNumbers.indexOf(numbers) !== -1 ||
                straightRangeNumbersAce.indexOf(numbers) !== -1);
        };

        var isFlush = function() {
            var differentSuites = cards.reduce(function(acc, card) {
                return (card.suite != acc) ? acc + card.suite : card.suite;
            }, cards[0].suite);
            return (differentSuites.length == 1);
        };

        var getNumbers = function() {
            return cards.reduce(function(acc, card) {
                return acc + card.number;
            }, '');
        };

        var getNumberFrequency = function() {
            return cards.reduce(function(acc, card) {
                acc[card.number] = acc[card.number] || 0;
                acc[card.number]++;
                return acc;
            }, {});
        };

        var initNumberFrequency = function() {
            var frequency = getNumberFrequency();
            cards.map(function(card) {
                card.numberFrequency = frequency[card.number];
            });
        };

        var findCardsByFrequency = function(freq) {
            return cards.filter(function(card) {
                return card.numberFrequency === freq;
            });
        };

        var frequencyCategory = function(freq, lengthCondition) {
            var freqCards = findCardsByFrequency(freq);
            return {
                match: lengthCondition(freqCards.length),
                cards: freqCards
            };
        };

        var pairCategory = function() {
            return frequencyCategory(2, function(length) {
                return length > 1;
            });
        };

        var twoPairsCategory = function() {
            return frequencyCategory(2, function(length) {
                return length == 4;
            });
        };

        var threeOfAKindCategory = function() {
            return frequencyCategory(3, function(length) {
                return length == 3;
            });
        };

        var straightCategory = function() {
            return {
                match: isStraight(getNumbers()),
                cards: cards
            };
        };

        var flushCategory = function() {
            return {
                match: isFlush(),
                cards: cards
            };
        };

        var fullHouseCategory = function() {
            var pair = pairCategory(),
                three = threeOfAKindCategory();
            return {
                match: pair.match && three.match,
                cards: three.cards.concat(pair.cards)
            };
        };

        var fourOfAKindCategory = function() {
            return frequencyCategory(4, function(length) {
                return length == 4;
            });
        };

        var straightFlushCategory = function() {
            return {
                match: isStraight(getNumbers()) && isFlush(),
                cards: cards
            };
        };

        // init
        (function() { 
            sortCards();
            initNumberFrequency();
        }());

        return {
            cards: cards,
            getHighestCard: function() {
                return cards[0];
            },
            categories: {
                pair: pairCategory,
                twoPairs: twoPairsCategory,
                threeOfAKind: threeOfAKindCategory,
                straight: straightCategory,
                flush: flushCategory,
                fullHouse: fullHouseCategory,
                fourOfAKind: fourOfAKindCategory,
                straightFlush: straightFlushCategory
            }
        };
    };

    return poker;

}(poker || {});
