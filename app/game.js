var poker = function(poker) {

    poker.play = function(black, white) {
        var bHand = new poker.Hand(black),
            wHand = new poker.Hand(white),
            rules = poker.rules.slice(0);

        var applyRules = function(output) {
            var rule;
            if (rules.length > 0 && (output === '' || output === poker.tie)) {
                rule = rules.shift();
                return applyRules(rule(bHand, wHand));
            }
            return output;
        };

        return applyRules('');
    };

    return poker;

}(poker || {});
