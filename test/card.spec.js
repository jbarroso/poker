describe('card', function() {

    var twoHearts = new poker.Card('2H'),
        aceOfSpaces = new poker.Card('AS');

    it('should be created', function() {
        expect(twoHearts).to.be.an('object');
    });

    it('should be created with his name', function() {
        expect(twoHearts.name).to.be.equals('2H');
    });

    it('should be created with his number', function() {
        expect(twoHearts.number).to.be.equals('2');
    });

    it('should get his readable number when is A', function() {
        expect(aceOfSpaces.getReadableNumber()).to.be.equals('Ace');
    });

    it('should get his readable number when is 2', function() {
        expect(twoHearts.getReadableNumber()).to.be.equals('2');
    });

    it('should be created with his suite', function() {
        expect(twoHearts.suite).to.be.equals('H');
    });

    it('should be greater than another', function() {
        aceOfHearts = new poker.Card('AH');
        expect(aceOfHearts.greaterThan(twoHearts)).to.be.true;
    });

    it('should be less than another', function() {
        aceOfHearts = new poker.Card('AH');
        expect(twoHearts.lessThan(aceOfHearts)).to.be.true;
    });

    it('should be equals to another', function() {
        twoDiamonds = new poker.Card('2D');
        expect(twoHearts.equals(twoDiamonds)).to.be.true;
    });

});
