var poker = function(poker) {

    poker.Card = function(name) {

        var scoreCard = '23456789JQKA',
            readableNumber = {
                A: 'Ace',
                J: 'Joker',
                Q: 'Queen',
                K: 'King'
            };

        var number = name[0],
            suite = name[1],
            value = parseInt(scoreCard.indexOf(number));

        return {
            name: name,
            number: number,
            suite: suite,
            getValue: function() {
                return value;
            },
            getReadableNumber: function() {
                var readable = readableNumber[number];
                return (readable) ? readable : number;
            },
            greaterThan: function(other) {
                return value > other.getValue();
            },
            lessThan: function(other) {
                return value < other.getValue();
            },
            equals: function(other) {
                return value == other.getValue();
            },
            toString: function() {
                return name;
            }
        };
    };

    return poker;

}(poker || {});
