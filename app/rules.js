var poker = function(poker) {

    var output = poker.output;
    var tie = poker.tie;
    var blackWins = function() {
        return output().blackWins();
    };
    var whiteWins = function() {
        return output().whiteWins();
    };

    var highestCardRule = function(bHand, wHand) {
        return highestCardOutputRule(bHand.cards, wHand.cards, 'highCard');
    };

    var highestCardOutputRule = function(bHandCardsOriginal, wHandCardsOriginal, outputRule) {
        var bHandCards = bHandCardsOriginal.slice(0),
            wHandCards = wHandCardsOriginal.slice(0);

        var highestCard = function() {
            var bHiCard, wHiCard;
            if (bHandCards.length > 0) {
                bHiCard = bHandCards.shift();
                wHiCard = wHandCards.shift();
                if (wHiCard.greaterThan(bHiCard)) {
                    return whiteWins()[outputRule](wHiCard);
                }
                if (wHiCard.lessThan(bHiCard)) {
                    return blackWins()[outputRule](bHiCard);
                }
                return highestCard();
            }

            return tie;
        };

        return highestCard();
    };

    var cardHigher = function(bCard, wCard, outputRule) {
        if (bCard.greaterThan(wCard)) {
            return blackWins()[outputRule]();
        }
        if (wCard.greaterThan(bCard)) {
            return whiteWins()[outputRule]();
        }
        return tie;
    };

    var categoryRule = function(bHand, wHand, category, tieRule) {
        var bCat = bHand.categories[category](),
            wCat = wHand.categories[category]();
        if (bCat.match && !wCat.match) {
            return blackWins()[category]();
        }
        if (!bCat.match && wCat.match) {
            return whiteWins()[category]();
        }
        if (bCat.match && wCat.match) {
            return tieRule(bCat.cards, wCat.cards);
        }
        return '';
    };

    var categoryRuleWithHighestCard = function(bHand, wHand, category) {
        var tieFunction = function(bCards, wCards) {
            return highestCardOutputRule(bHand.cards, wHand.cards, category);
        };
        return categoryRule(bHand, wHand, category, tieFunction);
    };

    var pairCardHigher = function(bPairs, wPairs, outputRule) {
        var bCard = bPairs[0],
            wCard = wPairs[0];
        return cardHigher(bCard, wCard, outputRule);
    };

    var pairCardRule = function(bHand, wHand) {
        var category = 'pair',
            tieFunction = function(bCards, wCards) {
                return pairCardHigher(bCards, wCards, category);
            };
        return categoryRule(bHand, wHand, category, tieFunction);
    };

    var twoPairsCardHigher = function(bPairs, wPairs, outputRule) {
        var cloneBPairs = bPairs.slice(0),
            cloneWPairs = wPairs.slice(0),
            getNextPairHigher = function() {
                return pairCardHigher(
                    cloneBPairs.splice(0, 2),
                    cloneWPairs.splice(0, 2),
                    outputRule);
            },
            pairHigher1 = getNextPairHigher();
        return (pairHigher1 === tie) ? getNextPairHigher() : pairHigher1;
    };

    var twoPairsCardRule = function(bHand, wHand) {
        var category = 'twoPairs',
            tieFunction = function(bCards, wCards) {
                return twoPairsCardHigher(bCards, wCards, category);
            };
        return categoryRule(bHand, wHand, category, tieFunction);
    };

    var threeOfAKindRule = function(bHand, wHand) {
        return categoryRuleWithHighestCard(bHand, wHand, 'threeOfAKind');
    };

    var straightRule = function(bHand, wHand) {
        return categoryRuleWithHighestCard(bHand, wHand, 'straight');
    };

    var flushRule = function(bHand, wHand) {
        return categoryRuleWithHighestCard(bHand, wHand, 'flush');
    };

    var fullHouseRule = function(bHand, wHand) {
        var category = 'fullHouse',
            tieFunction = function(bCards, wCards) {
                return cardHigher(bCards[0], wCards[0], category);
            };
        return categoryRule(bHand, wHand, category, tieFunction);
    };

    var fourOfAKindRule = function(bHand, wHand) {
        return categoryRuleWithHighestCard(bHand, wHand, 'fourOfAKind');
    };

    var straightFlushRule = function(bHand, wHand) {
        return categoryRuleWithHighestCard(bHand, wHand, 'straightFlush');
    };

    poker.rules = [
        straightFlushRule,
        fourOfAKindRule,
        fullHouseRule,
        flushRule,
        straightRule,
        threeOfAKindRule,
        twoPairsCardRule,
        pairCardRule,
        highestCardRule
    ];

    return poker;

}(poker || {});
