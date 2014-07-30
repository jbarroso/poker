var poker = function(poker) {

    poker.tie = 'Tie.';

    var blackWinsWith = 'Black wins. - with';
    var whiteWinsWith = 'White wins. - with';

    poker.output = function() {
        var out = '';
        return {
            blackWins: function() {
                out = blackWinsWith;
                return this;
            },
            whiteWins: function() {
                out = whiteWinsWith;
                return this;
            },
            highCard: function(card) {
                out += ' high card: ' + card.getReadableNumber();
                return out;
            },
            pair: function() {
                out += ' pair';
                return out;
            },
            twoPairs: function() {
                out += ' two pairs';
                return out;
            },
            threeOfAKind: function() {
                out += ' three of a kind';
                return out;
            },
            straight: function() {
                out += ' straight';
                return out;
            },
            flush: function() {
                out += ' flush';
                return out;
            },
            fullHouse: function() {
                out += ' full house';
                return out;
            },
            fourOfAKind: function() {
                out += ' four of a kind';
                return out;
            },
            straightFlush: function() {
                out += ' straight flush';
                return out;
            },
            toString: function() {
                return out;
            }
        };
    };

    return poker;

}(poker || {});
