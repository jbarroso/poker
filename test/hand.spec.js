describe('hand', function() {

    var hand = new poker.Hand('2H 3D 5S 9C KD');

    it('should be created', function() {
        expect(hand).to.be.an('object');
    });

    it('should has five cards', function() {
        var cards = hand.cards,
            i;
        expect(cards).to.have.length(5);
        for (i = 0, l = cards.length; i < l; i++) {
            var card = cards[i];
            expect(card).to.be.an('object');
        }
    });

    it('should get the highest card', function() {
        var highestCard = hand.getHighestCard();
        expect(highestCard.name).to.be.equals('KD');
    });

    it('should get the highest when it is unsorted', function() {
        var otherHand = new poker.Hand('2H 3D AS 9C KD');
        var highestCard = otherHand.getHighestCard();
        expect(highestCard.name).to.be.equals('AS');
    });

    it('should init frequency', function() {
        var hand = new poker.Hand('2H 2D 3S 3C KD');
        expect(hand.cards[0].numberFrequency).to.be.equals(1);
        expect(hand.cards[1].numberFrequency).to.be.equals(2);
        expect(hand.cards[2].numberFrequency).to.be.equals(2);
        expect(hand.cards[3].numberFrequency).to.be.equals(2);
        expect(hand.cards[4].numberFrequency).to.be.equals(2);
    });

    describe('categories', function() {

        describe('pair', function() {

            it('should get one pair', function() {
                var hand = new poker.Hand('2H 2D 3S 4C KD');
                var pair = hand.categories.pair().cards;
                expect(pair[0].name).to.be.equals('2H');
                expect(pair[1].name).to.be.equals('2D');
            });

            it('should match pair', function() {
                var hand = new poker.Hand('2H 2D 3S 4C KD');
                expect(hand.categories.pair().match).to.be.true;
            });
        });
        describe('two pairs', function() {

            it('should get two pairs', function() {
                var hand = new poker.Hand('2H 2D 3S 3C KD');
                var pairs = hand.categories.twoPairs().cards;
                expect(pairs[0].name).to.be.equals('3S');
                expect(pairs[1].name).to.be.equals('3C');
                expect(pairs[2].name).to.be.equals('2H');
                expect(pairs[3].name).to.be.equals('2D');
            });

            it('should match two pairs', function() {
                var hand = new poker.Hand('2H 2D 3S 3C KD');
                expect(hand.categories.twoPairs().match).to.be.true;
            });

        });
        describe('three of a kind', function() {

            it('should get three of a kind', function() {
                var hand = new poker.Hand('2H 2D 2S 3C KD');
                var toak = hand.categories.threeOfAKind().cards;
                expect(toak[0].name).to.be.equals('2H');
                expect(toak[1].name).to.be.equals('2D');
                expect(toak[2].name).to.be.equals('2S');
            });

            it('should match three of a kind', function() {
                var hand = new poker.Hand('2H 2D 2S 3C KD');
                expect(hand.categories.threeOfAKind().match).to.be.true;
            });

        });
        describe('straight', function() {


            describe('should match straight', function() {

                it('when it is sorted', function() {
                    var hand = new poker.Hand('2H 3D 4S 5C 6D');
                    expect(hand.categories.straight().match).to.be.true;
                });

                it('when it is unsorted', function() {
                    var hand = new poker.Hand('2H 6D 4S 5C 3D');
                    expect(hand.categories.straight().match).to.be.true;
                });

                it('when it starts with Ace', function() {
                    var hand = new poker.Hand('AH 2D 3S 4C 5D');
                    expect(hand.categories.straight().match).to.be.true;
                });

                it('when it ends with Ace', function() {
                    var hand = new poker.Hand('9H JD QS KC AD');
                    expect(hand.categories.straight().match).to.be.true;
                });

            });

            describe('should not match straight', function() {

                it('when has an Ace in the middle', function() {
                    var hand = new poker.Hand('JD QS KC AD 2D');
                    expect(hand.categories.straight().match).to.be.false;
                });

                it('when has a gap', function() {
                    var hand = new poker.Hand('2H 3D 5C 6D 7D');
                    expect(hand.categories.straight().match).to.be.false;
                });

            });

        });

        describe('flush', function() {

            it('should match flush', function() {
                var hand = new poker.Hand('2H 3H 6H 7H 9H');
                expect(hand.categories.flush().match).to.be.true;
            });

            it('should not match flush', function() {
                var hand = new poker.Hand('2H 3H 6H 7H 9D');
                expect(hand.categories.flush().match).to.be.false;
            });

        });

        describe('full house', function() {

            it('should match full house', function() {
                var hand = new poker.Hand('2H 2D 6H 6C 6S');
                expect(hand.categories.fullHouse().match).to.be.true;
            });

            it('should not match full house', function() {
                var hand = new poker.Hand('2H 4D 6H 6C 6S');
                expect(hand.categories.fullHouse().match).to.be.false;
            });

            it('should get cards', function() {
                var hand = new poker.Hand('2H 2D 6H 6C 6S');
                var cards = hand.categories.fullHouse().cards;
                expect(cards[0].name).to.be.equals('6H');
                expect(cards[1].name).to.be.equals('6C');
                expect(cards[2].name).to.be.equals('6S');
                expect(cards[3].name).to.be.equals('2H');
                expect(cards[4].name).to.be.equals('2D');
            });

        });

        describe('four of a kind', function() {

            it('should match four of a kind', function() {
                var hand = new poker.Hand('2H 2D 2A 2C 6S');
                expect(hand.categories.fourOfAKind().match).to.be.true;
            });

            it('should not match four of a kind', function() {
                var hand = new poker.Hand('2H 2D 2A AC 6S');
                expect(hand.categories.fourOfAKind().match).to.be.false;
            });

            it('should get cards', function() {
                var hand = new poker.Hand('2H 2D 2A 2C 6S');
                var cards = hand.categories.fourOfAKind().cards;
                expect(cards[0].name).to.be.equals('2H');
                expect(cards[1].name).to.be.equals('2D');
                expect(cards[2].name).to.be.equals('2A');
                expect(cards[3].name).to.be.equals('2C');
            });

        });

        describe('straight flush', function() {

            describe('should match straight flush', function() {

                it('when it is sorted', function() {
                    var hand = new poker.Hand('2H 3H 4H 5H 6H');
                    expect(hand.categories.straightFlush().match).to.be.true;
                });

                it('when it is unsorted', function() {
                    var hand = new poker.Hand('2H 6H 4H 5H 3H');
                    expect(hand.categories.straightFlush().match).to.be.true;
                });

                it('when it starts with Ace', function() {
                    var hand = new poker.Hand('AH 2H 3H 4H 5H');
                    expect(hand.categories.straightFlush().match).to.be.true;
                });

                it('when it ends with Ace', function() {
                    var hand = new poker.Hand('9H JH QH KH AH');
                    expect(hand.categories.straightFlush().match).to.be.true;
                });

            });

            describe('should not match straight', function() {

                it('when has an Ace in the middle', function() {
                    var hand = new poker.Hand('JH QH KH AH 2H');
                    expect(hand.categories.straightFlush().match).to.be.false;
                });

                it('when has a gap', function() {
                    var hand = new poker.Hand('2H 3H 5H 6H 7H');
                    expect(hand.categories.straightFlush().match).to.be.false;
                });

                it('when has one of another suite', function() {
                    var hand = new poker.Hand('2H 3C 4H 5H 6H');
                    expect(hand.categories.straightFlush().match).to.be.false;
                });


            });

        });



    });


});
